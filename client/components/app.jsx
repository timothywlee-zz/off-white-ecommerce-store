import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import Footer from './footer';
import MailingList from './mailing-list';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.calculateCartTotalCost = this.calculateCartTotalCost.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
    fetch('/api/health-check')
      .then(response => response.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  getCartItems() {
    fetch('/api/cart', {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          cart: data
        });
      })
      .catch(err => console.error(err));
  }

  addToCart(product) {
    fetch('api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(response => response.json())
      .then(data => {
        const arrayDeepCopy = this.state.cart.map(item => Object.assign({}, item));
        arrayDeepCopy.push(data);
        this.setState({
          cart: arrayDeepCopy
        });
      })
      .catch(err => console.error(err));
  }

  deleteFromCart(cartItemId) {
    fetch(`/api/cart/${cartItemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        const undeletedItems = this.state.cart.filter(item => item.cartItemId !== cartItemId);
        this.setState({
          cart: undeletedItems
        });
      })
      .catch(err => console.error(err));
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  placeOrder(userInformation) {
    fetch('api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInformation)
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          cart: [],
          view: {
            name: 'catalog',
            params: {}
          }
        });
      });
  }

  calculateCartTotalCost() {
    const { cart } = this.state;
    const arrayOfTotalAmount = cart.map(item => item.price);
    const totalSum = arrayOfTotalAmount.reduce((a, b) => { return a + b; }, 0);
    const itemTotal = (totalSum / 100).toFixed(2);
    return itemTotal;
  }

  displayPage() {
    const { view, cart } = this.state;
    if (view.name === 'catalog') {
      return (
        <ProductList
          setView={this.setView} />
      );
    } else if (view.name === 'details') {
      return (
        <ProductDetails
          setView={this.setView}
          viewParams={view.params}
          addToCart={this.addToCart} />
      );
    } else if (view.name === 'cart') {
      return (
        <CartSummary
          setView={this.setView}
          itemsInCart={cart}
          itemTotal={this.calculateCartTotalCost()}
          deleteItem={this.deleteFromCart} />
      );
    } else if (view.name === 'checkout') {
      return (
        <CheckoutForm
          setView={this.setView}
          placeOrder={this.placeOrder}
          itemTotal={this.calculateCartTotalCost()} />
      );
    } else if (view.name === 'mailing') {
      return (
        <MailingList
          setView={this.setView}
        />
      );
    }
  }

  render() {
    const { cart } = this.state;
    const displayContent = this.displayPage();

    return this.state.isLoading
      ? <h1>Testing connections...</h1>
      : (
        <React.Fragment>
          <Header
            title='Wicked Sales'
            cartItemCount={cart.length}
            setView={this.setView} />
          <main id='mainContent'>
            <div className='mainContent row'>
              <div className='col-12'> {displayContent} </div>
            </div>
          </main>
          <Footer setView={this.setView}/>
        </React.Fragment>
      );
  }
}

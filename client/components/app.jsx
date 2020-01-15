import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';

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

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
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
          <Header title='Wicked Sales' cartItemCount={cart.length} setView={this.setView} />
          <main className='container p-30' style={{ backgroundColor: '#f2f2f2' }}>
            <div className='row'>
              <div> {displayContent} </div>
            </div>
          </main>
        </React.Fragment>
      );
  }
}

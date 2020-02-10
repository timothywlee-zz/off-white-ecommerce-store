import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import Checkout from './checkout';
import Footer from './footer';
import MailingList from './mailing-list';
import ProductImages from './product-images';
import OrderConfirmation from './order-confirmation';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },
      cart: [],
      cartLength: 0,
      modal: true,
      fade: false,
      backdrop: 'static'
    };
    this.setView = this.setView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.getCartLength = this.getCartLength.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
    this.updateCart = this.updateCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.calculateCartTotalCost = this.calculateCartTotalCost.bind(this);
    this.resetCartLength = this.resetCartLength.bind(this);
    this.resetCart = this.resetCart.bind(this);
    this.toggleClickHandler = this.toggleClickHandler.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
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
        }, this.getCartLength);
      })
      .catch(err => console.error(err));
  }

  getCartLength() {
    const { cart } = this.state;
    let cartArray = null;
    for (let index = 0; index < cart.length; index++) {
      cartArray += parseInt(cart[index].quantity);
    }
    this.setState({
      cartLength: cartArray
    });
  }

  addToCart(product) {
    fetch('api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(response => {
        return response.json();
      })
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
      .then(response => response.json())
      .then(data => {
        const undeletedItems = this.state.cart.filter(item => item.cartItemId !== cartItemId);
        this.setState({
          cart: undeletedItems
        });
      })
      .catch(err => console.error(err));
  }

  updateCart(product) {
    fetch('/api/cart', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(response => response.json())
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
          view: {
            name: 'orderConfirmation',
            params: {}
          }
        });
      });
  }

  resetCartLength() {
    this.setState({
      cartLength: 0
    });
  }

  resetCart() {
    this.setState({
      cart: []
    });
  }

  calculateCartTotalCost() {
    const { cart } = this.state;
    const arrayOfTotalAmount = cart.map(item => (item.price * item.quantity));
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
          addToCart={this.addToCart}
          getCartItems={this.getCartItems} />
      );
    } else if (view.name === 'cart') {
      return (
        <CartSummary
          setView={this.setView}
          itemsInCart={cart}
          itemTotal={this.calculateCartTotalCost()}
          deleteItem={this.deleteFromCart}
          addToCart={this.addToCart}
          updateCart={this.updateCart}
          getCartItems={this.getCartItems}/>
      );
    } else if (view.name === 'checkout') {
      return (
        <Checkout
          setView={this.setView}
          itemsInCart={cart}
          placeOrder={this.placeOrder}
          itemTotal={this.calculateCartTotalCost()}
          getCartItems={this.getCartItems}
          resetCartLength={this.resetCartLength} />
      );
    } else if (view.name === 'mailing') {
      return (
        <MailingList
          setView={this.setView} />
      );
    } else if (view.name === 'images') {
      return (
        <ProductImages
          setView={this.setView}
          viewParams={view.params} />
      );
    } else if (view.name === 'orderConfirmation') {
      return (
        <OrderConfirmation
          setView={this.setView}
          itemsInCart={cart}
          getCartItems={this.getCartItems}
          resetCart={this.resetCart} />
      );
    }
  }

  toggleClickHandler() {
    this.setState({
      modal: !this.state.modal,
      fade: !this.state.fade
    });
  }

  render() {
    const { modal, fade, cartLength, backdrop } = this.state;
    return (
      <div className='mainContainer'>
        <Header
          cartLength={cartLength}
          setView={this.setView} />
        <main id='mainContent'>
          <div className='mainContent'>
            <div className='row'>
              <div className='col-sm-12'>
                {this.displayPage()}
              </div>
            </div>
          </div>
        </main>
        <Footer setView={this.setView} />
        <Modal
          className='introModal'
          isOpen={modal}
          toggle={this.toggleClickHandler}
          fade={fade}
          backdrop={backdrop}
          centered>
          <ModalHeader toggle={this.toggleClickHandler}> Welcome </ModalHeader>
          <ModalBody className='d-flex flex-row justify-content-center align-items-center'>
            <div className='d-flex justify-content-center align-items-center'>
              <h6 style={{ textAlign: 'center' }}>
                Off White Shoes Shop is a full stack Node.js and React application that was created for demonstration purposes only. <br /><br />
                This is not a real e-commerce site. <br /><br />
                By clicking the button below, you accept that no purchases will be made and that actual personal information should not be used at checkout.
              </h6>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button className='btn btn-danger' onClick={this.toggleClickHandler}>
              Agree
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

import React from 'react';
import OrderSummaryItem from './order-summary-item';

class OrderConfirmation extends React.Component {
  constructor(props) {
    super(props);
    this.resetCartChangeView = this.resetCartChangeView.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  resetCartChangeView() {
    this.props.setView('catalog', {});
    setTimeout(() => {
      this.props.resetCart();
    }, 200);
  }

  createListOfItemsInCart() {
    const cartItemArray = this.props.itemsInCart;
    let cartItemArrayDisplay = null;
    if (cartItemArray.length !== 0) {
      cartItemArrayDisplay = cartItemArray.map(product => {
        return (
          <OrderSummaryItem
            key={product.cartItemId}
            product={product}
            quantity={product.quantity}
            getCartItems={this.props.getCartItems} />
        );
      });
    }
    return cartItemArrayDisplay;
  }

  render() {
    return (
      <div className='container orderConfirmationContainer mt-4'>
        <div
          className='row d-flex flex-column justify-content-center align-items-center mb-5'
          style={{ height: '100%' }}>
          <div
            className='col-sm-6'
            style={{ margin: 'auto' }}>
            <h3
              className='mb-5'
              style={{ textAlign: 'center' }}>
              Thank you for your order!
            </h3>
            <h5> Your Order: </h5>
            {this.createListOfItemsInCart()}
          </div>
          <button
            className='btn btn-outline-dark justify-content-center mt-5'
            onClick={this.resetCartChangeView}
            style={{ width: '20vh', zIndex: '30' }}>
            Back To Shopping
          </button>
        </div>
      </div>
    );
  }
}

export default OrderConfirmation;

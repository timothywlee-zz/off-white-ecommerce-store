import React from 'react';
import OrderSummaryItem from './order-summary-item';

class OrderConfirmation extends React.Component {
  constructor(props) {
    super(props);
    this.resetCartChangeView = this.resetCartChangeView.bind(this);
  }

  resetCartChangeView() {
    this.props.resetCart();
    this.props.setView('catalog', {});
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
        <div className='row d-flex flex-column justify-content-center align-items-center mb-5' style={{ height: '100%' }}>
          <div className='col-sm-6' style={{ margin: 'auto' }}>
            <h3 style={{ textAlign: 'center' }}> Thank you for your order! </h3>
            <h5> Your Order: </h5>
            {this.createListOfItemsInCart()}
          </div>
          <button
            className='btn btn-outline-dark justify-content-center mt-5'
            onClick={this.resetCartChangeView}
            style={{ cursor: 'pointer', width: '20vh' }}>
                Back To Shopping
          </button>
        </div>
      </div>
    );
  }
}

export default OrderConfirmation;

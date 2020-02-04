import React from 'react';
import CartSummaryItem from './cart-summary-item';

class CartSummary extends React.Component {

  getCartLength() {
    let cartLength = null;
    this.props.itemsInCart.forEach(product => {
      cartLength += parseFloat(product.quantity);
    });
    return cartLength;
  }

  createListOfItemsInCart() {
    const cartItemArray = this.props.itemsInCart;
    let cartItemArrayDisplay = null;
    if (cartItemArray.length !== 0) {
      cartItemArrayDisplay = cartItemArray.map(product => {
        return (
          <CartSummaryItem
            key={product.cartItemId}
            product={product}
            deleteItem={this.props.deleteItem}
            addToCart={this.props.addToCart}
            updateCart={this.props.updateCart}
            deleteProductEntirely={this.props.deleteProductEntirely}
            quantity={product.quantity}
            getCartItems={this.props.getCartItems} />
        );
      });
    }
    return cartItemArrayDisplay;
  }

  render() {
    return (
      <div>
        <div
          className='text-muted col-12 m-2 d-flex flex-row'
          onClick={() => this.props.setView('catalog', {})}
          style={{ cursor: 'pointer' }}>
          <i className="fas fa-arrow-left mr-2 mt-1"></i>
          <div>{'Back To Catalog'}</div>
        </div>
        <h2 className='ml-4'> My Cart </h2>
        <div className='mx-2'>
          {this.createListOfItemsInCart()}
        </div>
        <div className='d-flex flex-row justify-content-between align-items-center my-5'>
          <h4 className='ml-4'>Item Total ${this.props.itemTotal} </h4>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => this.props.setView('checkout', {})}
            style={{ cursor: 'pointer' }}> Checkout
          </button>
        </div>
      </div>
    );
  }
}

export default CartSummary;

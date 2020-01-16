import React from 'react';
import CartSummaryItem from './cart-summary-item';

class CartSummary extends React.Component {
  createListOfItemsInCart() {
    return (
      this.props.itemsInCart.map(item =>
        <CartSummaryItem key={item.cartItemId} product={item} deleteItem={this.props.deleteItem} />
      )
    );
  }

  render() {
    const displayItemsInCart = this.createListOfItemsInCart();
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
          {displayItemsInCart}
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

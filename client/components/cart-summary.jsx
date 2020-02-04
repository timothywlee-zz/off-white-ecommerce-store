import React from 'react';
import CartSummaryItem from './cart-summary-item';

class CartSummary extends React.Component {

  getSelectedProduct(cart) {
    const { itemsInCart } = this.props;
    const selectedProduct = [];
    const selectedProductProductIds = [];

    if (cart.length === 0) {
      return [];
    }

    selectedProduct.push(itemsInCart[0]);
    selectedProductProductIds.push(itemsInCart[0].productId);

    for (let index = 1; index < itemsInCart.length; index++) {
      const product = itemsInCart[index];
      if (!selectedProductProductIds.includes(product.productId)) {
        selectedProductProductIds.push(product.productId);
        selectedProduct.push(product);
      }
    }
    return selectedProduct;
  }

  getQuantity(productId) {
    let counter = 0;
    const cart = this.props.itemsInCart;
    for (let index = 0; index < cart.length; index++) {
      if (cart[index].productId === productId) {
        counter++;
      }
    }
    return counter;
  }

  createListOfItemsInCart() {
    const selectedProduct = this.getSelectedProduct(this.props.itemsInCart);
    const cartItems = selectedProduct.map(item => {
      return (
        <CartSummaryItem
          key={item.cartItemId}
          product={item}
          deleteItem={this.props.deleteItem}
          addToCart={this.props.addToCart}
          deleteProductEntirely={this.props.deleteProductEntirely}
          quantity={this.getQuantity(item.productId)} />
      );
    });
    return cartItems;
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

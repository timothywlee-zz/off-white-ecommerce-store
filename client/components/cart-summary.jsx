import React from 'react';
import CartSummaryItem from './cart-summary-item';

class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.taxCalculation = this.taxCalculation.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.cartLengthCheck = this.cartLengthCheck.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
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
            quantity={product.quantity}
            getCartItems={this.props.getCartItems} />
        );
      });
    }
    return cartItemArrayDisplay;
  }

  taxCalculation() {
    const tax = (this.props.itemTotal * 0.0725).toFixed(2);
    return tax;
  }

  calculateTotal() {
    const total = (this.props.itemTotal * 1.0725).toFixed(2);
    return total;
  }

  cartLengthCheck() {
    if (this.props.itemsInCart.length !== 0) {
      return (
        <button
          className='d-flex btn btn-outline-dark justify-content-center mt-1'
          onClick={() => this.props.setView('checkout', {})}
          style={{ cursor: 'pointer', width: '20vh' }}>
          Checkout
        </button>
      );
    } else {
      return null;
    }
  }

  render() {
    const left = { width: '50%', textAlign: 'left' };
    const right = { width: '50%', textAlign: 'right' };

    if (this.props.itemsInCart === undefined || this.props.itemsInCart.length === 0) {
      return (
        <div className='container cartSummaryContainer'>
          <div className='row d-flex flex-column justify-content-center align-items-center'>
            <div
              className='col-sm-8 mb-5 d-flex flex-column justify-content-center'
              style={{ padding: '0 15%' }}>
              <h2 style={{ borderBottom: '1px solid #D3D3D3', textAlign: 'center' }}>My Cart</h2>
              <h4 style={{ textAlign: 'center' }}>Cart is empty</h4>
              <div style={{ margin: 'auto' }}>
                <button
                  className='d-flex btn btn-outline-dark justify-content-center mt-5'
                  onClick={() => this.props.setView('catalog', {})}
                  style={{ cursor: 'pointer', width: '20vh' }}>
                  Back To Shopping
                </button>
                {this.cartLengthCheck()}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className='container cartSummaryContainer'>
            <div className='row'>
              <div className='col-sm-8'>
                <h2 style={{ borderBottom: '1px solid #D3D3D3' }}>My Cart</h2>
                {this.createListOfItemsInCart()}
              </div>
              <div className='col-sm-4'>
                <h2 style={{ borderBottom: '1px solid #D3D3D3', textAlign: 'left', marginBottom: '0' }}>Summary</h2>
                <div
                  className='d-flex flex-column py-3'
                  style={{ borderBottom: '1px solid #D3D3D3' }}>
                  <div className='d-flex flex-row ' >
                    <div style={left}> Subtotal </div>
                    <div style={right}> ${this.props.itemTotal} </div>
                  </div>
                  <div className='d-flex flex-row'>
                    <div style={left}> Shipping </div>
                    <div style={right}> FREE </div>
                  </div>
                  <div className='d-flex flex-row'>
                    <div style={left}> Tax </div>
                    <div style={right}> ${this.taxCalculation()} </div>
                  </div>
                </div>
                <div className='d-flex flex-row mt-3'>
                  <h4 style={left}> TOTAL </h4>
                  <h4 style={right}> ${this.calculateTotal()} </h4>
                </div>
                <div className='d-flex flex-column justify-content-center align-items-center mt-3'>
                  <button
                    className='btn btn-outline-dark justify-content-center'
                    onClick={() => this.props.setView('catalog', {})}
                    style={{ cursor: 'pointer', width: '100%' }}>
                    <div> Back To Shopping </div>
                  </button>
                  <button
                    className='btn btn-outline-dark justify-content-center mt-1'
                    onClick={() => this.props.setView('checkout', {})}
                    style={{ cursor: 'pointer', width: '100%' }}>
                    <div> Checkout </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default CartSummary;

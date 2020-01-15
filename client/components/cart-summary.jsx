import React from 'react';
import CartSummaryItem from './cart-summary-item';

class CartSummary extends React.Component {
  createListOfItemsInCart() {
    return (
      this.props.itemsInCart.map(item =>
        <CartSummaryItem key={item.cartItemId} product={item}/>
      )
    );
  }

  render() {
    const displayItemsInCart = this.createListOfItemsInCart();
    return (
      <div>
        <div className='containerForThisShit'>
          <div className='backToCatalog text-muted col-12 m-3 d-flex flex-row' onClick={() => this.props.setView('catalog', {})} style={{ cursor: 'pointer' }}>
            <i className="fas fa-arrow-left mr-2 mt-1"></i>
            <div>{'Back To Catalog'}</div>
          </div>
          <h2 className='ml-4'> My Cart </h2>
          <div className='mx-2'>
            {displayItemsInCart}
          </div>
        </div>
      </div>
    );
  }
}

export default CartSummary;

import React from 'react';

function Header(props) {
  const itemsInCartCount = props.cartItemCount <= 1 ? 'item' : 'items';

  return (
    <div className='text-light bg-dark col-12 m-0' style={{ height: '7vh', padding: '1.7vh 9vh' }}>
      <div className='d-flex justify-content-between'>
        <div className=''>$ {props.title}</div>
        <div className='d-flex flex-row'>
          <div className=' mx-1'>{props.cartItemCount}</div>
          <div className='mr-2'> {itemsInCartCount} </div>
          <i className="fas fa-shopping-cart" style={{ fontSize: '1.5rem' }}></i>
        </div>
      </div>
    </div>
  );
}

export default Header;

import React from 'react';

function Header(props) {
  const itemsInCartCount = props.cartItemCount <= 1 || props.cartItemCount === undefined ? 'item' : 'items';
  return (
    <nav
      id='headerContainer'
      className='navbar sticky-top bg-white pb-0 px-0'
      style={{ height: '120px', paddingTop: '10px' }}>
      <div
        id='headerInnerContainer'
        className='d-flex flex-row justify-content-center col-12'
        style={{ height: '100%' }}>
        <div className='col-2'></div>
        <div
          className='d-flex justify-content-center align-items-center col-8'
          style={{ paddingLeft: '100px' }}>
          <img
            className='headerImg'
            onClick={() => props.setView('catalog', {})}
            src='/images/logo.png'
            style={{ objectFit: 'contain', width: '206px', height: '76px', cursor: 'pointer' }}
          />
        </div>
        <div className='headerCartContainer d-flex flex-row justify-content-center align-items-center col-2'>
          <div
            className='headerCartText d-flex flex-row justify-content-center align-items-center'
            onClick={() => props.setView('cart', {})}
            style={{ cursor: 'pointer', width: '150px', height: '50px' }} >
            <div
              className='mx-1 text-secondary'
              style={{ fontSize: '15px' }}> Cart ({props.cartLength} {itemsInCartCount} )
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;

import React from 'react';

function Header(props) {
  const itemsInCartCount = props.cartLength <= 1 ? 'item' : 'items';
  return (
    <nav
      id='headerContainer'
      className='navbar sticky-top bg-white pb-0 px-0'
      style={{ height: '15vh', paddingTop: '10px' }}>
      <div
        id='headerInnerContainer'
        className='d-flex flex-row justify-content-center col-12'>
        <div className='col-3' />
        <div
          className='d-flex justify-content-center align-items-center col-6'
          style={{ paddingLeft: '5vh', paddingRight: '0' }}>
          <img
            className='headerImg'
            onClick={() => props.setView('catalog', {})}
            src='/images/logo.png'
            style={{ objectFit: 'contain', width: '17vh', height: '10vh', cursor: 'pointer' }}/>
        </div>
        <div className='headerCartContainer d-flex flex-row justify-content-center align-items-center col-3' style={{ padding: '0' }}>
          <div
            className='headerCartText d-flex flex-row justify-content-center align-items-center'
            onClick={() => props.setView('cart', {})}
            style={{ cursor: 'pointer', height: '4vh' }} >

            {props.cartLength === undefined || props.cartLength === 0 || props.cartLength === null
              ? <div
                className='text-secondary'
                style={{ fontSize: '15px', textAlign: 'center' }}> Cart </div>
              : <div
                className='text-secondary'
                style={{ fontSize: '15px', textAlign: 'center' }}> Cart <br /> ({props.cartLength} {itemsInCartCount})
              </div>}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;

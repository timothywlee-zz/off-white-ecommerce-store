import React from 'react';

function CartSummaryItem(props) {
  return (
    <div className='container border border-dark rounded m-3 shadow-sm'>
      <div className='row d-flex flex-row'>
        <img
          src={props.product.image}
          className='picture'
          style={{ objectFit: 'contain', height: '30vh' }}/>
        <div className='d-flex flex-column py-5 mx-4'>
          <h4> {props.product.name} </h4>
          <div className='text-muted'> ${(props.product.price / 100).toFixed(2)}  </div>
          <div
            className='my-2'
            style={{ fontSize: '0.9rem' }}> {props.product.shortDescription} </div>
        </div>
      </div>
    </div>
  );
}

export default CartSummaryItem;

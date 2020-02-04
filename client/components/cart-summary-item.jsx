import React from 'react';

function CartSummaryItem(props) {
  return (
    <div className='container border border-dark rounded m-3 shadow-sm'>
      <div className='row d-flex flex-row'>
        <img
          src={props.product.image}
          className='cartSummaryImg'
          style={{ objectFit: 'contain', height: '30vh' }}/>
        <div className='d-flex flex-column py-5 mx-4'>
          <h4> {props.product.name} </h4>
          <div className='text-muted'> ${(props.product.price / 100).toFixed(2)}  </div>
          <div
            className='my-2'
            style={{ fontSize: '0.9rem' }}> {props.product.shortDescription} </div>
        </div>
        <div className='d-flex flex-column justify-content-center align-items-center' style={{ width: '14%' }}>
          <div>Quantity</div>
          <div className='d-flex flex-row justify-content-center' style={{ width: '100%' }}>
            <button
              className='fas fa-minus'
              onClick={() => { props.deleteItem(props.product.cartItemId); }} />
            <div className='border' style={{ width: '30%', textAlign: 'center' }}> {props.quantity}</div>
            <button
              className='fas fa-plus'
              onClick={() => { props.addToCart({ productId: props.product.productId }); }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartSummaryItem;

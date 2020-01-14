import React from 'react';

function ProductListItem(props) {
  return (
    <div className='container border col-md-3 card-group m-2 shadow bg-white rounded' style={{ height: '60vh' }}>
      <div className='row'>
        <div className='card border-0'>
          <img src={props.product.image} className='card-img-top' style={{ objectFit: 'contain', height: '35vh' }} />
        </div>
        <div className='card-body border-0'>
          <div>
            <p className='card-title font-weight-bold'> {props.product.name} </p>
          </div>
          <div>
            <p className='card-title text-muted'> {props.product.price} </p>
          </div>
          <div>
            <p className='card-text' style={{ fontSize: '0.8rem' }}> {props.product.shortDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductListItem;

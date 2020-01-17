import React from 'react';

function ProductListItem(props) {
  return (
    <div className='eachCard container border col-md-3 card-group m-2 shadow bg-white rounded'
      style={{ height: '72vh' }}>
      <div className='row'>
        <div className='card border-0'>
          <img
            src={props.product.image}
            className='card-img-top'
            style={{ objectFit: 'contain', height: '35vh' }} />
        </div>
        <div className='card-body border-0'>
          <h6 className='card-title font-weight-bold'> {props.product.name} </h6>
          <div
            className='card-title text-muted'
            style={{ fontSize: '0.8rem' }}> ${(props.product.price / 100).toFixed(2)}
          </div>
          <p
            className='card-text'
            style={{ fontSize: '0.8rem' }}> {props.product.shortDescription}
          </p>
        </div>
        <div className='col text-center'>
          <button
            type='button'
            className='btn btn-outline-secondary'
            onClick={() => { props.setView('details', { productId: props.product.productId }); }}
            style={{ cursor: 'pointer' }} > View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductListItem;

import React from 'react';

function ProductListItem(props) {
  return (
    <div
      className='eachCard container col-md-3 card-group mx-4'
      onClick={() => { props.setView('details', { productId: props.product.productId }); }}
      style={{ height: '35vh', cursor: 'pointer' }}>
      <div className='row'>
        <div className='card border-0'>
          <img
            src={props.product.image}
            className='card-img-top'
            style={{ objectFit: 'contain', height: '35vh' }} />
        </div>
      </div>
    </div>
  );
}

export default ProductListItem;

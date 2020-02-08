import React from 'react';

class CheckoutSummaryItem extends React.Component {
  render() {
    return (
      <div className='container border rounded bg-white shadow-sm my-2 d-flex justify-content-center align-items-center' style={{ paddingRight: '2%', height: '200px' }}>
        <div className='row d-flex flex-row my-2'>
          <img
            src={this.props.product.image}
            className='cartSummaryImg'
            style={{ objectFit: 'contain', width: '50%' }} />
          <div className='d-flex flex-column justify-content-center align-items-center' style={{ width: '50%' }}>
            <div className='d-flex flex-column mb-1 justify-content-center align-items-center'>
              <div className='d-flex font-weight-bold' style={{ fontSize: '1.7vh', textAlign: 'center' }}> {this.props.product.name} </div>
              <div className=''>Quantity: {this.props.product.quantity} </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CheckoutSummaryItem;

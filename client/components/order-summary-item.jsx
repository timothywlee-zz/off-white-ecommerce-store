import React from 'react';

class OrderSummaryItem extends React.Component {
  render() {
    return (
      <div className='container border border-dark rounded shadow-sm my-2' style={{ paddingRight: '2%' }}>
        <div className='row d-flex flex-row my-2'>
          <img
            src={this.props.product.image}
            className='cartSummaryImg'
            style={{ objectFit: 'contain', width: '50%' }} />
          <div className='d-flex flex-column justify-content-center align-items-center' style={{ width: '50%' }}>
            <div className='d-flex flex-column mb-1 justify-content-center align-items-center'>
              <div className='d-flex font-weight-bold' style={{ fontSize: '1.7vh' }}> {this.props.product.name} </div>
              <div className='text-muted'> ${(this.props.product.price / 100).toFixed(2)}  </div>
              <div className=''>Quantity: {this.props.product.quantity} </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderSummaryItem;

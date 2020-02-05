import React from 'react';

class ProductQuantity extends React.Component {
  constructor(props) {
    super(props);
    this.incrementQuantity = this.incrementQuantity.bind(this);
    this.decrementQuantity = this.decrementQuantity.bind(this);
  }

  incrementQuantity() {
    this.props.increment();
  }

  decrementQuantity() {
    this.props.decrement();
  }

  render() {
    return (
      <div className='d-flex justify-content-center' style={{ width: '100%' }}>
        <div className='d-flex flex-column justify-content-center align-items-center' style={{ width: '130px' }}>
          <div className='btn-group d-flex flex-row justify-content-center' style={{ width: '100%' }}>
            <button
              className='fas fa-minus btn btn-outline-dark'
              onClick={this.decrementQuantity} />
            <div className='border' style={{ width: '100%', textAlign: 'center' }}> {this.props.quantity}</div>
            <button
              className='fas fa-plus btn btn-outline-dark'
              onClick={this.incrementQuantity} />
          </div>
        </div>
      </div>
    );
  }
}

export default ProductQuantity;

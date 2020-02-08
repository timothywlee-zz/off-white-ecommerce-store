import React from 'react';

class QuantityUpdate extends React.Component {
  render() {
    return (
      <div
        className='d-flex justify-content-center'
        style={{ width: '100%' }}>
        <div
          className='d-flex flex-column justify-content-center align-items-center'
          style={{ width: '130px' }}>
          <div
            className='btn-group d-flex flex-row justify-content-center'
            style={{ width: '100%' }}>
            <button
              className='fas fa-minus btn btn-outline-dark'
              onClick={this.props.decrement} />
            <div
              className='border'
              style={{ width: '100%', textAlign: 'center' }}>
              {this.props.quantity}
            </div>
            <button
              className='fas fa-plus btn btn-outline-dark'
              onClick={this.props.increment} />
          </div>
        </div>
      </div>
    );
  }
}

export default QuantityUpdate;

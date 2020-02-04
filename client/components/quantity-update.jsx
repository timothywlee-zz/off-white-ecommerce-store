import React from 'react';

class QuantityUpdate extends React.Component {
  render() {
    return (
      <div className='d-flex flex-column justify-content-center align-items-center' style={{ width: '14%' }}>
        <div className='d-flex flex-row justify-content-center' style={{ width: '100%' }}>
          <button
            className='fas fa-minus'
            onClick={this.props.decrement} />
          <div className='border' style={{ width: '30%', textAlign: 'center' }}> {this.props.quantity}</div>
          <button
            className='fas fa-plus'
            onClick={this.props.increment} />
        </div>
      </div>
    );
  }
}

export default QuantityUpdate;

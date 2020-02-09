import React from 'react';
import QuantityUpdate from './quantity-update';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      modal: false,
      fade: true,
      backdrop: 'static'
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.incrementQuantity = this.incrementQuantity.bind(this);
    this.decrementQuantity = this.decrementQuantity.bind(this);
    this.toggleClickHandler = this.toggleClickHandler.bind(this);
  }

  componentDidMount() {
    this.getQuantity();
  }

  getQuantity() {
    this.setState({ quantity: this.props.quantity });
  }

  handleDelete() {
    const { product } = this.props;
    this.props.deleteItem(product.cartItemId);
    setTimeout(() => {
      this.props.getCartItems();
    }, 100);
  }

  handleUpdate() {
    const { product } = this.props;
    const newQuantity = this.state.quantity;
    this.props.updateCart({
      quantity: newQuantity,
      cartItemId: product.cartItemId
    });
    setTimeout(() => {
      this.props.getCartItems();
    }, 100);
  }

  incrementQuantity() {
    let { quantity } = this.state;
    const newQuantity = ++quantity;
    this.setState({ quantity: newQuantity });
  }

  decrementQuantity() {
    let { quantity } = this.state;
    let newQuantity = --quantity;

    if (newQuantity < 1) {
      this.toggleClickHandler();
    }
    if (newQuantity < 0) {
      newQuantity = 0;
    }

    this.setState({ quantity: newQuantity });
  }

  toggleClickHandler() {
    this.setState({
      modal: !this.state.modal,
      fade: !this.state.fade
    });
  }

  render() {
    const { quantity, modal, fade, backdrop } = this.state;
    return (
      <div
        className='container border rounded bg-white shadow-sm my-2'
        style={{ padding: '0' }}>
        <div
          className='row d-flex justify-content-center align-items-center flex-row my-2'
          style={{ height: '260px' }}>
          <img
            src={this.props.product.image}
            className='cartSummaryImg'
            style={{ objectFit: 'contain', width: '42%' }}/>
          <div
            className='d-flex flex-column justify-content-center align-items-center'
            style={{ width: '50%' }}>
            <div className='d-flex flex-column mb-1 justify-content-center align-items-center'>
              <div
                className='d-flex font-weight-bold'
                style={{ fontSize: '17px', textAlign: 'center' }}>
                {this.props.product.name}
              </div>
              <div className='text-muted'>
                ${(this.props.product.price / 100).toFixed(2)}
              </div>
            </div>
            <QuantityUpdate
              increment={this.incrementQuantity}
              decrement={this.decrementQuantity}
              quantity={quantity} />
            <button
              className='d-flex btn btn-outline-dark justify-content-center mt-2 mb-1'
              style={{ width: '130px' }}
              onClick={this.handleUpdate}>
              UPDATE
            </button>
            <button
              className='d-flex btn btn-outline-dark justify-content-center'
              style={{ width: '130px' }}
              onClick={this.toggleClickHandler}>
              DELETE
            </button>
          </div>
        </div>
        <Modal
          isOpen={modal}
          toggle={this.toggleClickHandler}
          fade={fade}
          backdrop={backdrop}
          centered>
          <ModalHeader
            toggle={this.toggleClickHandler}>
            Wait!
          </ModalHeader>
          <ModalBody
            className='d-flex justify-content-center align-items-center flex-column'>
            Are you sure you want to delete your selection of
            <div className='d-flex flex-row'>
              <div className='font-weight-bold'>
                {this.props.product.name}
              </div>
              <div>?</div>
            </div>
            <div
              className='font-weight-bold'>
                Quantity: {this.props.quantity}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              className='btn btn-outline-primary btn-md'
              style={{ cursor: 'pointer' }}
              onClick={this.toggleClickHandler}>
              No
            </Button>
            <Button
              className='btn btn-outline-danger btn-md'
              style={{ cursor: 'pointer' }}
              onClick={this.handleDelete}>
              Yes
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default CartSummaryItem;

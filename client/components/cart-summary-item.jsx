import React from 'react';
import QuantityUpdate from './quantity-update';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      modal: false,
      fade: true
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
    const { quantity, modal, fade } = this.state;
    return (
      <div className='container border border-dark rounded m-3 shadow-sm'>
        <div className='row d-flex flex-row'>
          <img
            src={this.props.product.image}
            className='cartSummaryImg'
            style={{ objectFit: 'contain', height: '30vh' }} />
          <div className='d-flex flex-column py-5 mx-4'>
            <h4> {this.props.product.name} </h4>
            <div className='text-muted'> ${(this.props.product.price / 100).toFixed(2)}  </div>
          </div>

          <QuantityUpdate increment={this.incrementQuantity} decrement={this.decrementQuantity} quantity={quantity}/>
          <button onClick={this.handleUpdate}> UPDATE </button>
          <button onClick={this.toggleClickHandler}> DELETE </button>

          <Modal
            isOpen={modal}
            toggle={this.toggleClickHandler}
            fade={fade}
            centered>
            <ModalHeader toggle={this.toggleClickHandler}> Caution! </ModalHeader>
            <ModalBody>
                  Are you sure you want to delete {this.props.product.name}
            </ModalBody>
            <ModalFooter>
              <Button className='btn btn-outline-danger btn-md' style={{ cursor: 'pointer' }} onClick={this.toggleClickHandler}> No </Button>
              <Button className='btn btn-outline-primary btn-md' style={{ cursor: 'pointer' }} onClick={this.handleDelete}> Yes </Button>
            </ModalFooter>
          </Modal>

        </div>
      </div>
    );
  }
}

export default CartSummaryItem;

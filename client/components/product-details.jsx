import React from 'react';
import ProductQuantity from './product-quantity';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      quantity: 1,
      modal: false,
      fade: true
    };
    this.getProductsById = this.getProductsById.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.incrementQuantity = this.incrementQuantity.bind(this);
    this.decrementQuantity = this.decrementQuantity.bind(this);
    this.toggleClickHandler = this.toggleClickHandler.bind(this);
  }

  componentDidMount() {
    this.getProductsById();
  }

  getProductsById() {
    fetch(`/api/products/${this.props.viewParams.productId}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          product: data
        });
      })
      .catch(err => console.error(err));
  }

  addToCart() {
    const { product, quantity } = this.state;
    this.props.addToCart({
      productId: product.productId,
      quantity: quantity
    });
    setTimeout(() => {
      this.props.getCartItems();
    }, 100);

    this.toggleClickHandler();
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
    const { product, quantity, modal, fade } = this.state;
    return !this.state.product
      ? <h1> Testing connections... </h1>
      : (
        <div
          className='row'
          style={{ height: '66vh' }}>
          <div>
            <div
              className='d-flex flex-row col-12'
              style={{ height: '66vh' }}>

              <img
                src={product.image}
                className='productDetailImg col-6'
                style={{ height: '66vh' }}
                onClick={() => this.props.setView('images', this.props.viewParams.productId)} />

              <div
                className='d-flex flex-column justify-content-center col-6'
                style={{ height: '66vh', padding: '4vh 13vh 6vh 5vh' }}>
                <h1
                  className='font-weight-bold'
                  style={{ fontSize: '3vh' }}> {product.name}
                </h1>

                <div
                  style={{ fontSize: '3vh' }}> ${(product.price / 100).toFixed(2)}
                </div>

                <p
                  className='text-muted mt-2'
                  style={{ fontSize: '1.5vh' }}> {product.shortDescription}
                </p>

                <div>
                  <p
                    className='text-muted'
                    style={{ fontSize: '1.7vh' }}> {product.longDescription}
                  </p>
                </div>

                <ProductQuantity increment={this.incrementQuantity} decrement={this.decrementQuantity} quantity={quantity}/>

                <div>
                  <button
                    type='button'
                    className='btn btn-outline-primary btn-md'
                    onClick={this.addToCart}
                    style={{ cursor: 'pointer' }}> Purchase
                  </button>
                </div>

                <Modal
                  isOpen={modal}
                  toggle={this.toggleClickHandler}
                  fade={fade}
                  centered>
                  <ModalHeader toggle={this.toggleClickHandler}> Product has been added to cart. </ModalHeader>
                  <ModalBody className='d-flex flex-row justify-content-center align-items-center'>
                    <img style={{ objectFit: 'cover', height: '200px', width: '300px' }} src={product.image}/>
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                      <div> {product.name} </div>
                      <div> {`$${(product.price / 100).toFixed(2)}`} </div>
                      <div> Quantity: {quantity} </div>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={this.toggleClickHandler}> Keep Shopping </Button>
                    <Button onClick={() => this.props.setView('cart', {})}> Go To Cart</Button>
                  </ModalFooter>
                </Modal>

                <div
                  className='backToCatalog d-flex flex-row mt-3'
                  onClick={() => this.props.setView('catalog', {})}
                  style={{ cursor: 'pointer' }}>
                  <i className="fas fa-arrow-left mt-1 mr-2"></i>
                  <div> Back To Catalog </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      );
  }
}

export default ProductDetails;

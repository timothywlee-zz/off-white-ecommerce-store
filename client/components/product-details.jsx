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
      fade: true,
      backdrop: 'static'
    };
    this.getProductsById = this.getProductsById.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.incrementQuantity = this.incrementQuantity.bind(this);
    this.decrementQuantity = this.decrementQuantity.bind(this);
    this.toggleClickHandler = this.toggleClickHandler.bind(this);
    this.changeView = this.changeView.bind(this);
  }

  componentDidMount() {
    this.getProductsById();
    window.scrollTo(0, 0);
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
    }, 200);

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

  changeView() {
    this.props.setView('catalog', {});
    this.toggleClickHandler();
  }

  render() {
    const { product, quantity, modal, fade, backdrop } = this.state;
    return !this.state.product
      ? <div style={{ height: '100vh' }}></div>
      : (
        <div className='container productDetailsContainer d-flex justify-content-center align-items-center'>
          <div className='row'>
            <div className='imageContainer col-lg-6 d-flex justify-content-center align-items-center'>
              <img
                src={product.image}
                className='productDetailImg'
                onClick={() => this.props.setView('images', this.props.viewParams.productId)} />
            </div>
            <div className='d-flex flex-column justify-content-center col-lg-6'>
              <h1
                className='font-weight-bold'
                style={{ textAlign: 'center', fontSize: '24px' }}>
                {product.name}
              </h1>
              <div
                className='font-weight-light'
                style={{ textAlign: 'center', fontSize: '25px' }}>
                ${(product.price / 100).toFixed(2)}
              </div>
              <p
                className='productDetailsShort text-muted mt-2'
                style={{ textAlign: 'center', fontSize: '12px' }}>
                {product.shortDescription}
              </p>
              <div className='productDetailsLong mx-3'>
                <p
                  className='text-muted'
                  style={{ textAlign: 'center', fontSize: '15px' }}>
                  {product.longDescription}
                </p>
              </div>
              <ProductQuantity
                increment={this.incrementQuantity}
                decrement={this.decrementQuantity}
                quantity={quantity}/>
              <div className='d-flex flex-column justify-content-center align-items-center'>
                <button
                  type='button'
                  className='d-flex btn btn-primary btn-md mt-5 justify-content-center'
                  onClick={this.addToCart} style={{ cursor: 'pointer', width: '225px' }}>
                  Add To Cart
                </button>
                <button
                  type='button'
                  className='backToCatalog d-flex btn btn-outline-primary mt-1 justify-content-center'
                  onClick={() => this.props.setView('catalog', {})}
                  style={{ cursor: 'pointer', width: '225px' }}>
                  <div> Back To Catalog </div>
                </button>
              </div>
              <Modal
                isOpen={modal}
                toggle={this.toggleClickHandler}
                fade={fade}
                backdrop={backdrop}
                centered>
                <ModalHeader toggle={this.toggleClickHandler}>
                   Product has been added to cart.
                </ModalHeader>
                <ModalBody className='d-flex flex-row justify-content-center align-items-center'>
                  <img
                    style={{ objectFit: 'cover', height: '16vh' }}
                    src={product.image} />
                  <div className='d-flex flex-column'>
                    <div
                      className='d-flex font-weight-bold'
                      style={{ textAlign: 'center', fontSize: '17px' }}>
                      {product.name}
                    </div>
                    <div
                      className='d-flex justify-content-center mt-3'>
                      Quantity: {quantity}
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    className='btn btn-outline-dark'
                    onClick={this.changeView}>
                    Keep Shopping
                  </Button>
                  <Button
                    className='btn btn-outline-dark'
                    onClick={() => this.props.setView('cart', {})}>
                    Go To Cart
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          </div>
        </div>
      );
  }
}

export default ProductDetails;

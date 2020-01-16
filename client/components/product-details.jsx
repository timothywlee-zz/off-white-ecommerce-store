import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
    this.getProductsById = this.getProductsById.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(event) {
    event.preventDefault();
    this.props.addToCart({
      productId: this.props.viewParams.productId
    });
  }

  render() {
    const { product } = this.state;
    return !this.state.product
      ? <h1> Testing connections... </h1>
      : (
        <div className='container border border-dark rounded mt-5'>
          <div className='row'>
            <div>
              <div
                className='text-muted col-2 m-3 d-flex flex-row'
                onClick={() => this.props.setView('catalog', {})}
                style={{ cursor: 'pointer' }}>
                <i className="fas fa-arrow-left mr-2 mt-1"></i>
                <div>{'Back To Catalog'}</div>
              </div>
              <div className='d-flex flex-row my-5'>
                <img
                  src={product.image}
                  className='mx-4'
                  style={{ height: '35vh' }} />
                <div className='mx-4'>
                  <h1
                    className='font-weight-bold'
                    style={{ fontSize: '1.5rem' }}> {product.name}
                  </h1>
                  <div className='text-muted'> ${(product.price / 100).toFixed(2)} </div>
                  <p
                    className='mt-2'
                    style={{ fontSize: '0.8rem' }}> {product.shortDescription}
                  </p>
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={this.handleSubmit}
                    style={{ cursor: 'pointer' }}> Add To Cart
                  </button>
                </div>
              </div>
              <div>
                <p className='m-4'> {product.longDescription} </p>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default ProductDetails;

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
                style={{ height: '66vh', padding: '0 7rem 2rem 3rem' }}>
                <h1
                  className='font-weight-bold'
                  style={{ fontSize: '1.5rem' }}> {product.name}
                </h1>

                <div
                  style={{ fontSize: '1.5rem' }}> ${(product.price / 100).toFixed(2)}
                </div>

                <p
                  className='text-muted mt-2'
                  style={{ fontSize: '0.8rem' }}> {product.shortDescription}
                </p>

                <div>
                  <p className='text-muted'> {product.longDescription} </p>
                </div>
                <div>
                  <button
                    type='button'
                    className='btn btn-outline-primary btn-lg'
                    onClick={this.handleSubmit}
                    style={{ cursor: 'pointer' }}> PURCHASE
                  </button>
                </div>

                <div
                  className='backToCatalog d-flex flex-row mt-3'
                  onClick={() => this.props.setView('catalog', {})}
                  style={{ cursor: 'pointer' }}>
                  <i className="fas fa-arrow-left mt-1 mr-2"></i>
                  <div>{'Back To Catalog'}</div>
                </div>

              </div>
            </div>

          </div>
        </div>
      );
  }
}

export default ProductDetails;

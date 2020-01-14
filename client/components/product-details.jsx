import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
    this.getProductsById = this.getProductsById.bind(this);
  }

  componentDidMount() {
    this.getProductsById();
  }

  getProductsById() {
    fetch(`/api/products/${this.props.viewParams.productId}`, {
      method: 'GET'
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          product: data
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { product } = this.state;
    return !this.state.product
      ? <h1> Testing connections... </h1>
      : (
        <div className='container'>
          <div className='row'>
            <div>
              <div className='backToCatalog text-muted' onClick={() => this.props.setView('catalog', {})}>
                {'< Back To Catalog'}
              </div>
              <div className='d-flex flex-row my-5'>
                <img src={product.image} className='mx-4' style={{ height: '35vh' }} />
                <div className='productDetails mx-4'>
                  <h1 className='font-weight-bold' style={{ fontSize: '1.5rem' }}> {product.name} </h1>
                  <div className='text-muted'> ${(product.price / 100).toFixed(2)} </div>
                  <p className='mt-2' style={{ fontSize: '0.8rem' }}> {product.shortDescription} </p>
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

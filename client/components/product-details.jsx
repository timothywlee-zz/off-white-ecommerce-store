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

  getProductsById(productId) {
    fetch(`/api/products/:${productId}`, {
      method: 'GET'
    })
      .then();
  }

  render() {
    return (null);
  }
}

export default ProductDetails;

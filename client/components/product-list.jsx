import React from 'react';
import ProductListItem from './product-list-item';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.getProducts = this.getProducts.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products', {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          products: data
        });
      })
      .catch(err => console.error(err));
  }

  createListOfItems() {
    return (
      this.state.products.map(item =>
        <ProductListItem
          key={item.productId}
          product={item}
          setView={this.props.setView}/>
      )
    );
  }

  render() {
    const createListOfItems = this.createListOfItems();
    return (
      <div>
        <div
          id='productList'
          className='row d-flex align-items-center justify-content-center'>
          {createListOfItems}
        </div>
      </div>
    );
  }
}

export default ProductList;

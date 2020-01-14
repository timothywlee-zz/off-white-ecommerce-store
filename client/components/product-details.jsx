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
        this.setState = {
          product: data
        };
      })
      .catch(err => console.error(err));
  }

  render() {
    const { product } = this.state;
    return this.state.product
      ? <h1> Testing connections... </h1>
      : (
        <div className='container'>
          <div className='row'>
            <div className='image/productdetailsContainer'>
              <div onClick={() => this.props.setView('catalog', {})}>
                {'< Back To Catalog'}
              </div>
              <img src={this.state.product.image}/>
              <div className='productDetails'>
                <div>
                  <p> {product.name} </p>
                </div>
                <div>
                  <p> {product.price} </p>
                </div>
                <div>
                  <p> {product.shortDescription} </p>
                </div>
              </div>
              <div className='longDescriptionSection'>
                <p> {product.LongDescription} </p>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default ProductDetails;

/* SELF_NOTES */
// check to see if you need to put the <p> tags inside a div each time, check if you can do it without any divs. all <p>s inside one div
// instead of using <p> tags, you can use h1-h6 tags for size. <p> tags are used for elements that contian a paragraph text.

import React from 'react';

class ProductImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
    this.getProductsById = this.getProductsById.bind(this);
    this.testFunction = this.testFunction.bind(this);
  }

  componentDidMount() {
    this.getProductsById();
  }

  getProductsById() {
    fetch(`/api/products/${this.props.viewParams}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        console.log('data.productId(product-images): ', data.productId);
        this.setState({
          product: data.productId
        });
        this.testFunction();
      })
      .catch(err => console.error(err));
  }

  testFunction() {
    console.log('FINAL OUTCOME: ', this.state.product);
  }

  // write function that displays the product with a conditional that states whether if the productID matches it.

  render() {
    return (
      <div
        className='border'
        style={{ height: '67vh' }}>TESTING

        <div id='myCarousel' className='carousel slide border' data-ride='carousel'>
          <ol className='carousel-indicators'>
            <li data-target='myCarousel' data-slide-to='0' className='active' style={{ color: 'black' }}></li>
            <li data-target='myCarousel' data-slide-to='1'></li>
            <li data-target='myCarousel' data-slide-to='2'></li>
          </ol>

          <div className='carousel-inner border' style={{ height: '70vh', display: 'flex', alignItems: 'center' }}>
            <div className='carousel-item active border'>
              <img style={{ height: '100%', width: '40%' }} src='/images/Jordan1RetroRed_1.jpg' />
            </div>
            <div className='carousel-item active border'>
              <img style={{ height: '100%', width: '40%' }} src='/images/AirVaporMax_1.jpg' />
            </div>
            <div className='carousel-item active border'>
              <img style={{ height: '100%', width: '40%' }} src='/images/NikeBlazer_1.jpg' />
            </div>
          </div>

          <a className="carousel-control-prev border" href="#myCarousel" data-slide="prev">
            <span className="carousel-control-prev-icon border" style={{ height: '100px', width: '100px' }}></span>
          </a>
          <a className="carousel-control-next border" href="#myCarousel" data-slide="next">
            <span className="carousel-control-next-icon border" style={{ height: '100px', width: '100px' }}></span>
          </a>

        </div>
      </div>
    );
  }
}

export default ProductImages;

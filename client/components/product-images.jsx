import React from 'react';

class ProductImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      images: null,
      productImagesArray: []
    };
    this.getProductsById = this.getProductsById.bind(this);
    this.getImages = this.getImages.bind(this);
    this.renderProductById = this.renderProductById.bind(this);
  }

  componentDidMount() {
    this.getImages();
    this.getProductsById();
  }

  getProductsById() {
    fetch(`/api/products/${this.props.viewParams}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          product: data.productId
        });
        setTimeout(() => {
          this.renderProductById();
        }, 100);
      })
      .catch(err => console.error(err));
  }

  getImages() {
    fetch('/api/images', {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          images: data
        });
      })
      .catch(err => console.error(err));
  }

  renderProductById() {
    const { product, images } = this.state;
    const initialArray = [];

    for (let imagesIndex = 0; imagesIndex < images.length; imagesIndex++) {
      const productToView = imagesIndex + 1;
      if (productToView === product) {
        initialArray.push(images[imagesIndex]);
      }
    }
    const imagesPosition = initialArray[0];
    const selectedProductArray = Object.values(imagesPosition);

    this.setState({
      productImagesArray: selectedProductArray
    });
    return initialArray;
  }

  render() {
    return (
      <React.Fragment>
        <div className='fas fa-times carouselCancelButton pr-3' onClick={() => this.props.setView('details', { productId: this.props.viewParams })} />
        <div className='row d-flex justify-content-center align-items-center' style={{ height: '73vh' }}>
          <div className='px-0' style={{ width: '100vh', marginBottom: '4.5vh' }}>
            <div id="myCarousel" className="carousel slide" data-ride="carousel">
              <ol className="carousel-indicators" style={{ marginBottom: '-20px' }}>
                <li data-target="#myCarousel" data-slide-to="0" className="active" style={{ height: '0.7vh', filter: 'invert(100%)' }}></li>
                <li data-target="#myCarousel" data-slide-to="1" style={{ height: '0.7vh', filter: 'invert(100%)' }}></li>
                <li data-target="#myCarousel" data-slide-to="2" style={{ height: '0.7vh', filter: 'invert(100%)' }}></li>
                <li data-target="#myCarousel" data-slide-to="3" style={{ height: '0.7vh', filter: 'invert(100%)' }}></li>
              </ol>
              <div className="carousel-inner" role="listbox">
                <div className="carousel-item active">
                  <img src={this.state.productImagesArray[0]} className='d-block w-100' />
                </div>
                <div className="carousel-item">
                  <img src={this.state.productImagesArray[1]} className='d-block w-100' />
                </div>
                <div className="carousel-item">
                  <img src={this.state.productImagesArray[2]} className='d-block w-100' />
                </div>
                <div className="carousel-item">
                  <img src={this.state.productImagesArray[3]} className='d-block w-100' />
                </div>
              </div>
              <a className="prevIcon carousel-control-prev " href="#myCarousel" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" style={{ filter: 'invert(100%)' }} aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="nextIcon carousel-control-next " href="#myCarousel" role="button" data-slide="next">
                <span className="carousel-control-next-icon" style={{ filter: 'invert(100%)' }} aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

}

export default ProductImages;

import React from 'react';
import ImagesInCarousel from './images-in-carousel';

class ProductImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      images: null,
      productImagesArray: [],
      carouselIndicatorArray: [],
      displayImagesArray: []
      // productImages: [
      //   ['/images/Jordan1RetroRed_1.jpg', '/images/Jordan1RetroRed_2.jpg', '/images/Jordan1RetroRed_3.jpg', '/images/Jordan1RetroRed_4.jpg'],
      //   ['/images/Jordan1RetroBlue_1.jpg', '/images/Jordan1RetroBlue_2.jpg', '/images/Jordan1RetroBlue_3.jpg', '/images/Jordan1RetroBlue_4.jpg'],
      //   ['/images/AirForce1_1.jpg', '/images/AirForce1_2.jpg', '/images/AirForce1_3.jpg', '/images/AirForce1_4.jpg'],
      //   ['/images/NikeBlazer_1.jpg', '/images/NikeBlazer_2.jpg', '/images/NikeBlazer_3.jpg', '/images/NikeBlazer_4.jpg'],
      //   ['/images/NikeDunkGreen_1.jpg', '/images/NikeDunkGreen_2.jpg', '/images/NikeDunkGreen_3.jpg', '/images/NikeDunkGreen_4.jpg'],
      //   ['/images/AirForce1Volt_1.jpg', '/images/AirForce1Volt_2.jpg', '/images/AirForce1Volt_3.jpg', '/images/AirForce1Volt_4.jpg'],
      //   ['/images/AirMax90_1.jpg', '/images/AirMax90_2.jpg', '/images/AirMax90_3.jpg', '/images/AirMax90_4.jpg'],
      //   ['/images/AirPresto_1.jpg', '/images/AirPresto_2.jpg', '/images/AirPresto_3.jpg', '/images/AirPresto_4.jpg'],
      //   ['/images/AirVaporMax_1.jpg', '/images/AirVaporMax_2.jpg', '/images/AirVaporMax_3.jpg', '/images/AirVaporMax_4.jpg']
      // ]
    };
    this.getProductsById = this.getProductsById.bind(this);
    this.getImages = this.getImages.bind(this);
    this.testFunction = this.testFunction.bind(this);
    this.renderProductById = this.renderProductById.bind(this);
    this.renderCarouselIndicatorsCount = this.renderCarouselIndicatorsCount.bind(this);
    // this.renderImages = this.renderImages.bind(this);
  }

  componentDidMount() {
    this.getProductsById();
    this.getImages();
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
        this.renderProductById();
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

  testFunction() {
    console.log('FINAL OUTCOME: ', this.state.product);
    console.log('images from sql/backend: ', this.state.images);
  }

  renderProductById() {
    const { product, productImagesArray, images } = this.state;
    const array = [];

    for (let carouselIndex = 0; carouselIndex < images.length; carouselIndex++) {
      const productToView = carouselIndex + 1;
      if (productToView === product) {
        array.push(images[carouselIndex]);
      }
    }

    array.forEach(product => {
      for (let index = 0; index <= 3; index++) {
        productImagesArray.push(product[index]);
      }
    });

    this.setState({
      productImagesArray: productImagesArray
    });
    console.log('productImagesArray: ', this.state.productImagesArray);
    return array;
  }

  renderCarouselIndicatorsCount() {
    const { carouselIndicatorArray } = this.state;
    for (let index = 1; index <= 3; index++) {
      carouselIndicatorArray.push(
        <li data-target="#myCarousel" data-slide-to={index} style={{ height: '0.7vh', filter: 'invert(100%)' }}></li>
      );
    }

    return carouselIndicatorArray;
  }

  // make a key prop for each productImage

  // renderImages() {
  //   const { productImagesArray, displayImagesArray } = this.state;
  //   console.log('productImageArrayInRenderIMAGES: ', this.state.productImagesArray);

  //   for (let productIndex = 1; productIndex <= 3; productIndex++) {
  //     displayImagesArray.push(
  //       <ImagesInCarousel
  //         key={productIndex}
  //         image={productImagesArray[productIndex]}/>
  //     );
  //   }

  //   // this.state.productImagesArray[productIndex]

  //   console.log('this.state.displayImagesArray: ', this.state.displayImagesArray);
  //   return displayImagesArray;
  // }

  render() {
    return (
      <div className='row d-flex justify-content-center align-items-center'>
        <div className='px-0' style={{ width: '84vh', marginBottom: '4.5vh' }}>
          <div id="myCarousel" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
              <li data-target="#myCarousel" data-slide-to="0" className="active" style={{ height: '0.7vh', filter: 'invert(100%)' }}></li>
              {this.renderCarouselIndicatorsCount()}
            </ol>
            <div className="carousel-inner" role="listbox">
              <div className="carousel-item active">
                <img src={this.state.productImagesArray[0]} className='d-block w-100' />
              </div>
              {/* {this.renderImages()} */}
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
    );
  }

}

export default ProductImages;

import React from 'react';

function ImagesInCarousel(props) {
  return (
    <div className="carousel-item">
      <img src={props.image} className='d-block w-100' />
    </div>
  );
}

export default ImagesInCarousel;

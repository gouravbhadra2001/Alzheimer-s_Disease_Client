import React from 'react';

const ExampleCarouselImage = ({ text , src }) => {
  // Replace the content of this component with your desired image or custom carousel content
  return (
    <img
      className=" w-100 w-lg-75 img-fluid z-50 "
      src={src} // Replace with your image source
      alt={text}
      style={{height:"50vh"}}
    />
  );
}

export default ExampleCarouselImage;
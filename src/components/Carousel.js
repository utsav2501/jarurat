import React from 'react';
import { Carousel } from 'react-bootstrap';
import './carousel.css';


const CarouselComponent = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/img/gettyimages-1337631022-612x612.jpg" // Replace with your image URL
          alt="First slide"
        />
        {/* <Carousel.Caption>
          <h3>First Slide Title</h3>
          <p>Description for the first slide.</p>
        </Carousel.Caption> */}
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/img/whousepainter.jpg" // Replace with your image URL
          alt="Second slide"
        />
        {/* <Carousel.Caption>
          <h3>Second Slide Title</h3>
          <p>Description for the second slide.</p>
        </Carousel.Caption> */}
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/img/istockphoto-1796838374-612x612.jpg" // Replace with your image URL
          alt="Third slide"
        />
        {/* <Carousel.Caption>
          <h3>Third Slide Title</h3>
          <p>Description for the third slide.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselComponent;

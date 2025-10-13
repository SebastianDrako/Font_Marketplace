import React from 'react';
import { Carousel } from 'react-bootstrap';

const CarruselMain = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://placehold.co/800x600/E9ECEF/495057?text=Imagen+1"
          alt="Imagen de producto 1"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://placehold.co/800x600/6C757D/FFFFFF?text=Imagen+2"
          alt="Imagen de producto 2"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://placehold.co/800x600/343A40/FFFFFF?text=Imagen+3"
          alt="Imagen de producto 3"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default CarruselMain;

import React from 'react';
import { Carousel } from 'react-bootstrap';
import AuthImage from '../AuthImage';

const CarruselMain = ({ imageIds = [] }) => {
  if (imageIds.length === 0) {
    return (
      <AuthImage imageId={null} alt="Producto sin imagen" className="d-block w-100" />
    );
  }

  return (
    <Carousel>
      {imageIds.map((id, index) => (
        <Carousel.Item key={id}>
          <AuthImage 
            imageId={id} 
            alt={`Imagen de producto ${index + 1}`} 
            className="d-block w-100"
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarruselMain;

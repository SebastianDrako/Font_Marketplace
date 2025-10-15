import React from 'react';
import { Carousel, Row, Col } from 'react-bootstrap';
import Card from './Card';

// Función para dividir el array de productos en grupos de un tamaño específico
const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

const CarruselOther = ({ products = [] }) => {
  // Si no hay productos, no renderizar nada
  if (!products || products.length === 0) {
    return null;
  }

  // Agrupamos los productos de 3 en 3 para cada slide del carrusel
  const productChunks = chunk(products, 3);

  return (
    <Carousel indicators={productChunks.length > 1} controls={productChunks.length > 1}>
      {productChunks.map((chunk, index) => (
        <Carousel.Item key={index}>
          <Row>
            {chunk.map((product) => {
              // Obtenemos el ID de la primera imagen.
              const imageId = product.imageIds && product.imageIds.length > 0
                ? product.imageIds[0]
                : null;

              return (
                <Col md={4} className="mb-3" key={product.id}>
                  <Card
                    productId={product.id}
                    imageId={imageId} // Pasamos el ID de la imagen
                    title={product.name}
                  />
                </Col>
              );
            })}
          </Row>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarruselOther;

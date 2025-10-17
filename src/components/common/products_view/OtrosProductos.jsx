import React from "react";
import { Row, Col, Carousel } from "react-bootstrap";
import Card from "./otros_productos/Card";

// Función para dividir el array de productos en grupos de un tamaño específico
const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size),
  );

const OtrosProductos = ({ products = [] }) => {
  // Si no hay productos, no renderizar nada
  if (!products || products.length === 0) {
    return null;
  }

  // Agrupamos los productos de 3 en 3 para cada slide del carrusel
  const productChunks = chunk(products, 3);

  return (
    <Row className="mt-5 pt-4 border-top">
      <Col xs={12}>
        <h2 className="text-center mb-4">
          Otros productos que te podrían gustar
        </h2>
      </Col>
      <Col xs={12}>
        <Carousel
          indicators={productChunks.length > 1}
          controls={productChunks.length > 1}
        >
          {productChunks.map((chunk, index) => (
            <Carousel.Item key={index}>
              <Row>
                {chunk.map((product) => {
                  // Obtenemos el ID de la primera imagen.
                  const imageId =
                    product.imageIds && product.imageIds.length > 0
                      ? product.imageIds[0]
                      : null;

                  return (
                    <Col md={4} className="mb-3" key={product.id}>
                      <Card
                        productId={product.id}
                        imageId={imageId} // Pasamos el ID de la imagen
                        title={product.name}
                        price={product.price}
                      />
                    </Col>
                  );
                })}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Col>
    </Row>
  );
};

export default OtrosProductos;

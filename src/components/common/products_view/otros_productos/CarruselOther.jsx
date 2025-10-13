import React from 'react';
import { Carousel, Row, Col } from 'react-bootstrap';
import Card from './Card';

const CarruselOther = () => {
  return (
    <Carousel indicators={false}>
      <Carousel.Item>
        <Row>
          <Col md={4} className="mb-3">
            <Card
              imageUrl="https://placehold.co/600x400/adb5bd/495057?text=Producto+A"
              title="Nombre del Producto A"
            />
          </Col>
          <Col md={4} className="mb-3">
            <Card
              imageUrl="https://placehold.co/600x400/6c757d/ffffff?text=Producto+B"
              title="Nombre del Producto B"
            />
          </Col>
          <Col md={4} className="mb-3">
            <Card
              imageUrl="https://placehold.co/600x400/495057/ffffff?text=Producto+C"
              title="Nombre del Producto C"
            />
          </Col>
        </Row>
      </Carousel.Item>
      <Carousel.Item>
        <Row>
          <Col md={4} className="mb-3">
            <Card
              imageUrl="https://placehold.co/600x400/343a40/ffffff?text=Producto+D"
              title="Nombre del Producto D"
            />
          </Col>
          <Col md={4} className="mb-3">
            <Card
              imageUrl="https://placehold.co/600x400/ced4da/495057?text=Producto+E"
              title="Nombre del Producto E"
            />
          </Col>
          <Col md={4} className="mb-3">
            <Card
              imageUrl="https://placehold.co/600x400/212529/ffffff?text=Producto+F"
              title="Nombre del Producto F"
            />
          </Col>
        </Row>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarruselOther;

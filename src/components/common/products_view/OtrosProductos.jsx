import React from 'react';
import { Row, Col } from 'react-bootstrap';
import CarruselOther from './otros_productos/CarruselOther';

const OtrosProductos = ({ products }) => {
  return (
    <Row className="mt-5 pt-4 border-top">
      <Col xs={12}>
        <h2 className="text-center mb-4">Otros productos que te podrían gustar</h2>
      </Col>
      <Col xs={12}>
        <CarruselOther products={products} />
      </Col>
    </Row>
  );
};

export default OtrosProductos;

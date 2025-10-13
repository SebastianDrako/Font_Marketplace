import React, { useState } from 'react';
import { Row, Col, Form, InputGroup, Button } from 'react-bootstrap';

const AddToCart = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <Row className="mt-4 align-items-center">
      <Col lg={5} md={12} sm={6} className="mb-3 mb-lg-0">
        <Form.Label htmlFor="quantity">Cantidad:</Form.Label>
        <InputGroup className="input-group-lg">
          <Button variant="outline-secondary" onClick={handleDecrement}>-</Button>
          <Form.Control
            type="text"
            id="quantity"
            className="text-center"
            value={quantity}
            placeholder="1"
            aria-label="Cantidad"
            readOnly
          />
          <Button variant="outline-secondary" onClick={handleIncrement}>+</Button>
        </InputGroup>
      </Col>
      <Col lg={7} md={12} sm={6}>
        <div className="d-grid">
          <Button variant="primary" size="lg">
            <i className="bi bi-cart-plus-fill me-2"></i>Agregar al carrito
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default AddToCart;

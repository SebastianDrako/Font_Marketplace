import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
  if (products.length === 0) {
    return <p className="text-center">No se encontraron productos.</p>;
  }

  return (
    <Row>
      {products.map((product) => (
        <Col key={product.id} sm={12} md={4} lg={3} className="mb-4">
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductGrid;

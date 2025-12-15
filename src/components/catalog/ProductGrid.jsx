import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';
import PropTypes from 'prop-types';

/**
 * Component to display a grid of products.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.products - The list of products to display.
 * @returns {JSX.Element} The rendered ProductGrid component.
 */
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

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  })).isRequired,
};

export default ProductGrid;

import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

const CategoryOptions = ({ categories, level = 0 }) => {
  return categories.map(category => (
    <React.Fragment key={category.id}>
      <option value={category.id}>
        {`${'--'.repeat(level)} ${category.name}`}
      </option>
      {category.children && category.children.length > 0 && (
        <CategoryOptions categories={category.children} level={level + 1} />
      )}
    </React.Fragment>
  ));
};

const ProductFilter = ({ categories, filters, onFilterChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  return (
    <Row className="mb-4">
      <Col md={6}>
        <Form.Control
          type="text"
          name="q"
          placeholder="Buscar por palabra clave..."
          value={filters.q}
          onChange={handleInputChange}
        />
      </Col>
      <Col md={6}>
        <Form.Select name="categoryId" value={filters.categoryId} onChange={handleInputChange}>
          <option value="">Todas las categorías</option>
          <CategoryOptions categories={categories} />
        </Form.Select>
      </Col>
    </Row>
  );
};

export default ProductFilter;

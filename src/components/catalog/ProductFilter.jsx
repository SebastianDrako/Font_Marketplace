import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * Recursive component to render category options with indentation.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.categories - The list of categories.
 * @param {number} [props.level=0] - The nesting level for indentation.
 * @returns {Array<JSX.Element>} An array of option elements.
 */
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

CategoryOptions.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    children: PropTypes.array,
  })).isRequired,
  level: PropTypes.number,
};

/**
 * Component for filtering products by search query and category.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.categories - The list of categories available.
 * @param {Object} props.filters - Current filter values.
 * @param {string} props.filters.q - Search query.
 * @param {string} props.filters.categoryId - Selected category ID.
 * @param {Function} props.onFilterChange - Callback for when filters change.
 * @returns {JSX.Element} The rendered ProductFilter component.
 */
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

ProductFilter.propTypes = {
  categories: PropTypes.array.isRequired,
  filters: PropTypes.shape({
    q: PropTypes.string,
    categoryId: PropTypes.string,
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default ProductFilter;

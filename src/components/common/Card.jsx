import React from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * A custom card component that wraps react-bootstrap Card.
 * Adds a default shadow-sm class.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content of the card.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {Object} [props.props] - Other props passed to the Bootstrap Card.
 * @returns {JSX.Element} The rendered Card component.
 */
const CustomCard = ({ children, className, ...props }) => {
  return (
    <BootstrapCard className={`shadow-sm ${className}`} {...props}>
      {children}
    </BootstrapCard>
  );
};

CustomCard.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// Attach sub-components from BootstrapCard to CustomCard
CustomCard.Body = BootstrapCard.Body;
CustomCard.Title = BootstrapCard.Title;
CustomCard.Subtitle = BootstrapCard.Subtitle;
CustomCard.Text = BootstrapCard.Text;

export default CustomCard;

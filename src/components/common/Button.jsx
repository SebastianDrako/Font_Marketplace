import React from 'react';
import { Button as BootstrapButton, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * A custom button component that wraps react-bootstrap Button.
 * Displays a spinner when in loading state.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content of the button.
 * @param {boolean} [props.isLoading=false] - Whether the button is in a loading state.
 * @param {Object} [props.props] - Other props passed to the Bootstrap Button.
 * @returns {JSX.Element} The rendered Button component.
 */
const Button = ({ children, isLoading, ...props }) => {
  return (
    <BootstrapButton {...props} disabled={isLoading}>
      {isLoading ? (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className="visually-hidden">Loading...</span>
        </>
      ) : (
        children
      )}
    </BootstrapButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
};

export default Button;

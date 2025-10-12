
import React from 'react';
import { Button as BootstrapButton, Spinner } from 'react-bootstrap';

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

export default Button;

import React from "react";
import { Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

/**
 * A widget that displays the shopping cart icon and the total number of items.
 * Links to the cart page.
 *
 * @component
 * @returns {JSX.Element} The rendered CartWidget component.
 */
const CartWidget = () => {
  const { items } = useCart();

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Button as={Link} to="/cart" variant="outline-primary" className="me-2">
      <i className="bi bi-cart-fill me-1"></i>
      <Badge bg="danger">{totalItems}</Badge>
    </Button>
  );
};

export default CartWidget;

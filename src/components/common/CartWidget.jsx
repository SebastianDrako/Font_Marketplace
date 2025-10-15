import React from 'react';
import { Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

const CartWidget = () => {
    const { cart } = useCart();
    
    let totalItems = 0;
    for (const item of cart) {
        totalItems += item.quantity;
    }

    return (
        <Button as={Link} to="/cart" variant="outline-primary" className="me-2">
            <i className="bi bi-cart-fill me-1"></i>
            <Badge bg="danger">{totalItems}</Badge>
        </Button>
    );
};

export default CartWidget;

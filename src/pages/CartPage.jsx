import React from 'react';
import { useCart } from '../hooks/useCart';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { calcTotals } from '../utils/cartTotals';

const CartPage = () => {
const { cart, removeFromCart, decrementQuantity, addToCart, clearCart } = useCart();


const { subtotal, total, totalItems } = calcTotals(cart);
if (cart.length === 0) {
    return (
    <Container className="my-5 text-center">
        <h2>Tu carrito está vacío</h2>
        <p>No has añadido ningún producto todavía.</p>
        <Button as={Link} to="/">Ir a la tienda</Button>
        </Container>
    );
}

return (
    <Container className="my-5">
        <Row>
        <Col md={8}>
        <h2>Tu Carrito</h2>
        <ListGroup variant="flush">
            {cart.map(item => (
                <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                <div>
                    <h5>{item.name}</h5>
                    <p className="mb-1">Precio: ${item.price}</p> 
                    <div className="d-flex align-items-center">
                    <Button variant="outline-secondary" size="sm" onClick={() => decrementQuantity(item.id)}>-</Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button variant="outline-secondary" size="sm" onClick={() => addToCart(item, 1)}>+</Button>
                    </div>
                </div>
                <Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)}>Eliminar</Button>
                </ListGroup.Item>
            ))}
            </ListGroup>
        </Col>

        <Col md={4}>
            <Card>
            <Card.Body>
                <Card.Title>Resumen del Pedido</Card.Title>
                <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between">
                    <span>Artículos</span>
                    <span>{totalItems}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                    <strong>Total</strong>
                    <strong>${total.toFixed(2)}</strong>
                </ListGroup.Item>
                </ListGroup>
                <div className="d-grid gap-2 mt-3">
                <Button as={Link} to="/checkout" variant="primary" size="lg">
                Proceder al Pago
                </Button>
                <Button variant="outline-danger" size="sm" onClick={clearCart}>
                    Vaciar Carrito
                </Button>
                </div>
            </Card.Body>
            </Card>
        </Col>
        </Row>
    </Container>
    );
};

export default CartPage;

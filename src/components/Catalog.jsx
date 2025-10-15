import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';

const products = [
    { id: 1, name: 'Café Premium de Colombia', price: 15000 },
    { id: 2, name: 'Artesanía Wayuu', price: 80000 },
    { id: 3, name: 'Dulces Típicos', price: 25000 },
    { id: 4, name: 'Esmeraldas de Boyacá', price: 500000 },
    { id: 5, name: 'Mochilas Arhuacas', price: 120000 },
    { id: 6, name: 'Ruanas de Lana', price: 150000 },
];

function Catalog() {
    return (
        <Row>
        {products.map(product => (
            <Col key={product.id} sm={12} md={4} className="mb-4">
            <Card>
                <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>Precio: ${product.price.toLocaleString()}</Card.Text>
                <Button variant="info">Ver más</Button>
                </Card.Body>
                </Card>
            </Col>
        ))}
        </Row>
    );
}

export default Catalog;
import React, { useState } from 'react';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';

const products = [
    { id: 1, name: 'Café Premium de Colombia', description:'', price: 15000, categoryId: 1 , stock: 1 },
    { id: 2, name: 'Artesanía Wayuu', description:'', price: 80000, categoryId: 2 , stock: 2 },
    { id: 3, name: 'Dulces Típicos', description:'', price: 25000, categoryId: 3 , stock: 3 },
    { id: 4, name: 'Esmeraldas de Boyacá', description:'', price: 500000, categoryId: 4 , stock: 4 },
    { id: 5, name: 'Mochilas Arhuacas', description:'', price: 120000, categoryId: 5 , stock: 5 },
    { id: 6, name: 'Ruanas de Lana', description:'', price: 150000, categoryId: 5 , stock: 5 },
];

const categories = {
    0: 'Todas las categorías',
    1: 'Café',
    2: 'Artesanías',
    3: 'Dulces',
    4: 'Joyería',
    5: 'Textiles',
};

function Catalog() {
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('');

    const filteredProducts = products.filter((product) => {
        const matchesKeyword =
            product.name.toLowerCase().includes(keyword.toLowerCase()) ||
            product.description.toLowerCase().includes(keyword.toLowerCase());

        const matchesCategory = category === "0" ? true: product.categoryId === parseInt(category);

        return matchesKeyword && matchesCategory;
    });

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Catálogo de Productos</h2>

            <Row className="mb-4">
                <Col md={6}>
                    <Form.Control
                        type="text"
                        placeholder="Buscar por palabra clave..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </Col>
                <Col md={6}>
                    <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Seleccione categoría</option>
                        {Object.entries(categories).map(([id, name]) => (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
            </Row>

            <Row>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <Col key={product.id} sm={12} md={4} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>{product.description}</Card.Text>
                                    <Card.Text>Precio: ${product.price.toLocaleString()}</Card.Text>
                                    <Card.Text>Stock: {product.stock}</Card.Text>
                                    <Card.Text>
                                        Categoría: {categories[product.categoryId] || 'Sin categoría'}
                                    </Card.Text>
                                    <Button variant="info">Ver más</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p className="text-center">No se encontraron productos.</p>
                )}
            </Row>
        </div>
    );
}

export default Catalog;
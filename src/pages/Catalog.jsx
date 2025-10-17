import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';

function Catalog() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/products');
                setProducts(response.data.products || []);
            } catch (error) {
                console.error('Error al cargar productos:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return <p className="text-center mt-5">Cargando productos...</p>;
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Catálogo de Productos</h2>

            <Row>
                {products.length > 0 ? (
                    products.map((product) => (
                        <Col key={product.id} sm={12} md={4} lg={3} className="mb-4">
                            <Card className="h-100 shadow-sm product-card">
                                {product.imageUrl ? (
                                    <Card.Img
                                        variant="top"
                                        src={product.imageUrl}
                                        alt={product.name}
                                        style={{ height: '200px', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <Card.Img
                                        variant="top"
                                        src="https://via.placeholder.com/300x200?text=Sin+imagen"
                                        alt="Sin imagen"
                                        style={{ height: '200px', objectFit: 'cover' }}
                                    />
                                )}
                                <Card.Body className="d-flex flex-column justify-content-between">
                                    <div>
                                        <Card.Title className="text-center">{product.name}</Card.Title>
                                    </div>
                                    <Button variant="info" className="w-100 mt-3">
                                        ${product.price.toLocaleString()}
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p className="text-center">No hay productos disponibles.</p>
                )}
            </Row>

        </div>
    );
}

export default Catalog;

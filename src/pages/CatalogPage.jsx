import React from 'react';
import { Container, Carousel, Card } from 'react-bootstrap';
import Catalog from './Catalog.jsx';

function CatalogPage() {
    return (
        <div style={{ backgroundColor: '#212529', color: '#FFD700', minHeight: '100vh' }}>
            

            <Carousel fade interval={3000} className="mb-5">
                {[
                    { src: 'https://placehold.co/1200x400?text=Imagen+1', alt: 'Slide 1' },
                    { src: 'https://placehold.co/1200x400?text=Imagen+2', alt: 'Slide 2' },
                    { src: 'https://placehold.co/1200x400?text=Imagen+3', alt: 'Slide 3' },
                    { src: 'https://placehold.co/1200x400?text=Imagen+4', alt: 'Slide 4' },
                ].map((slide, idx) => (
                    <Carousel.Item key={idx}>
                        <img
                            className="d-block w-100"
                            src={slide.src}
                            alt={slide.alt}
                            style={{ maxHeight: '400px', objectFit: 'cover' }}
                        />
                        <Carousel.Caption>
                            <h3 style={{ textShadow: '2px 2px 6px #212529' }}>{slide.alt}</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>


            <hr style={{ borderColor: '#FFD700', borderWidth: '2px', margin: '2rem 0' }} />


            <Container className="text-center mb-4">
                <Card
                    bg="dark"
                    text="warning"
                    className="p-3 shadow-lg"
                    style={{ display: 'inline-block', border: '2px solid #FFD700' }}
                >
                    <h3 style={{ fontWeight: 'bold' }}>Marketplace</h3>
                </Card>
            </Container>

            <Container className="text-center mb-5">
                <Card
                    bg="dark"
                    text="warning"
                    className="p-4 shadow-lg"
                    style={{ border: '2px solid #FFD700', maxWidth: '800px', margin: '0 auto' }}
                >
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.5' }}>
                        Trayendo un pedacito de la cultura y el sabor de Colombia a la increíble ciudad de Buenos Aires. Un espacio para conectar con nuestras raíces.


                    </p>
                </Card>
            </Container>

            <Container className="mb-5">
                <Catalog />
            </Container>
        </div>
    );
}

export default CatalogPage;

import React from "react";
import { Container, Carousel, Spinner } from "react-bootstrap";
import { useCatalog } from "../hooks/useCatalog";
import ProductGrid from "../components/catalog/ProductGrid";
import Pagination from "../components/catalog/Pagination";
import styled from "styled-components";

const StyledHomePage = styled.div`
  background-color: #f8f9fa;
  color: #343a40;
  min-height: 100vh;
`;

const HomePage = () => {
  const { products, loading, error, pagination, handlePageChange } =
    useCatalog();

  return (
    <StyledHomePage>
      <Carousel fade interval={3000} className="mb-5">
        {[
          {
            src: "https://placehold.co/1200x400?text=Imagen+1",
            alt: "Slide 1",
          },
          {
            src: "https://placehold.co/1200x400?text=Imagen+2",
            alt: "Slide 2",
          },
          {
            src: "https://placehold.co/1200x400?text=Imagen+3",
            alt: "Slide 3",
          },
          {
            src: "https://placehold.co/1200x400?text=Imagen+4",
            alt: "Slide 4",
          },
        ].map((slide, idx) => (
          <Carousel.Item key={idx}>
            <img
              className="d-block w-100"
              src={slide.src}
              alt={slide.alt}
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
            <Carousel.Caption>
              <h3 style={{ textShadow: "2px 2px 6px #212529" }}>{slide.alt}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <Container className="mb-5">
        <h2 className="text-center mb-2">Bienvenido a Nuestro Marketplace</h2>
        <p className="text-center text-muted mb-4">
          Explore nuestra colección de productos de alta calidad.
        </p>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : error ? (
          <p className="text-center text-danger">{error}</p>
        ) : (
          <>
            <ProductGrid products={products} />
            <Pagination
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </Container>
    </StyledHomePage>
  );
};

export default HomePage;

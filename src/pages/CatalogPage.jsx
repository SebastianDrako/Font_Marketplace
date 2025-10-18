import React from "react";
import { Container, Spinner } from "react-bootstrap";
import { useCatalog } from "../hooks/useCatalog";
import ProductFilter from "../components/catalog/ProductFilter";
import ProductGrid from "../components/catalog/ProductGrid";
import Pagination from "../components/catalog/Pagination";
import styled from "styled-components";

const StyledCatalogPage = styled.div`
  background-color: #f8f9fa;
  color: #343a40;
  min-height: 100vh;
  padding-top: 2rem;
`;

const CatalogPage = () => {
  const {
    products,
    categories,
    loading,
    error,
    pagination,
    filters,
    handleFilterChange,
    handlePageChange,
  } = useCatalog();

  return (
    <StyledCatalogPage>
      <Container className="mb-5">
        <h2 className="text-center mb-4">Catálogo de Productos</h2>
        <ProductFilter
          categories={categories}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
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
    </StyledCatalogPage>
  );
};

export default CatalogPage;

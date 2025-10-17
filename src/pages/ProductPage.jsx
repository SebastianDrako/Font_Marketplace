import React from "react";
import { Link } from "react-router-dom";
import { Container, Alert, Spinner } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import ProductView from "../components/common/products_view/ProductView";

const ProductPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="my-5">
        <Alert variant="warning">
          <Alert.Heading>¡Atención!</Alert.Heading>
          <p>
            Para ver los detalles completos del producto y agregarlo a tu
            carrito, necesitas iniciar sesión o crear una cuenta.
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Link to="/login" className="btn btn-primary me-2">
              Iniciar Sesión
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Crear Cuenta
            </Link>
          </div>
        </Alert>
      </Container>
    );
  }

  return <ProductView />;
};

export default ProductPage;

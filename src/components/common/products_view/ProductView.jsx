import React from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  ListGroup,
  Spinner,
} from "react-bootstrap";
import { useProduct } from "../../../hooks/useProduct";
import BreadCrumb from "./BreadCrumb";
import CarruselMain from "./CarruselMain";
import AddToCart from "./AddToCart";
import OtrosProductos from "./OtrosProductos";

const ProductView = () => {
  const { id } = useParams();
  const { product, breadcrumbs, relatedProducts, loading, error } =
    useProduct(id);

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5 text-center">
        <p className="text-danger">{error}</p>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="my-5 text-center">
        <h2>Producto no encontrado</h2>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <BreadCrumb path={breadcrumbs} productName={product.name} />
      <Row>
        <Col lg={6} className="mb-4">
          <CarruselMain imageIds={product.imageIds} />
        </Col>
        <Col lg={6}>
          <Card className="shadow-sm border-light">
            <Card.Body>
              <h2 className="card-title h3 mb-3">{product.name}</h2>

              <p className="lead text-primary fw-bold fs-4 mb-3">
                ${product.price.toFixed(2)}
              </p>

              <p className="text-muted">{product.description}</p>

              <ListGroup variant="flush" className="my-4">
                <ListGroup.Item>
                  <Row>
                    <Col sm={4}>
                      <strong>Disponibilidad:</strong>
                    </Col>
                    <Col sm={8}>
                      {product.stock > 0 ? (
                        <Badge bg="success">
                          En Stock ({product.stock} unidades)
                        </Badge>
                      ) : (
                        <Badge bg="danger">Agotado</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col sm={4}>
                      <strong>Categoría:</strong>
                    </Col>
                    <Col sm={8}>
                      {breadcrumbs.map((b) => b.name).join(" / ")}
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>

              <AddToCart product={product} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <OtrosProductos products={relatedProducts} />
    </Container>
  );
};

export default ProductView;

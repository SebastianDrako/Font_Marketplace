import React from 'react';
import { Nav, Container, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Outlet } from 'react-router-dom';

const ProfilePage = () => {
  return (
    <Container className="mt-4">
      <Row>
        <Col md={3}>
          <Nav variant="pills" className="flex-column">
            <LinkContainer to="/profile/info">
              <Nav.Link>Mi Información</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/profile/addresses">
              <Nav.Link>Mis Direcciones</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/profile/orders">
              <Nav.Link>Mis Pedidos</Nav.Link>
            </LinkContainer>
          </Nav>
        </Col>
        <Col md={9}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;

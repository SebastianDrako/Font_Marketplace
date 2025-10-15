import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useAuth } from '../../hooks/useAuth.jsx';
import CartWidget from '../common/CartWidget.jsx';

const AppNavbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">Marketplace</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <>
                <CartWidget />
                <NavDropdown title={user?.name} id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={logout}>Cerrar Sesión</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/profile">Mi Perfil</NavDropdown.Item>
                  {user?.roles?.includes('ADMIN') && (
                  <NavDropdown.Item as={Link} to="/admin" variant="danger">Administración</NavDropdown.Item>
                )}
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Iniciar Sesión</Nav.Link>
                <Nav.Link as={Link} to="/register">Registrarse</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;

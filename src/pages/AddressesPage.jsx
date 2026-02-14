import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  ListGroup,
  Alert,
  Spinner,
  Modal,
  Form,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  resetOperationStatus,
} from "../redux/addressSlice";

/**
 * Page to manage user addresses (create, read, update, delete).
 *
 * @component
 * @returns {JSX.Element} The rendered AddressesPage component.
 */
const AddressesPage = () => {
  const dispatch = useDispatch();
  const { addresses, loading, operationLoading, operationSuccess, operationError } = useSelector(
    (state) => state.address
  );
  const token = useSelector((state) => state.auth.token);

  const [showModal, setShowModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [formData, setFormData] = useState({
    postalCode: "",
    street: "",
    apt: "",
    others: "",
    name: "",
  });
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (token) {
      dispatch(fetchAddresses());
    }
  }, [token, dispatch]);

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAddress(null);
    setLocalError("");
    dispatch(resetOperationStatus());
  };

  useEffect(() => {
    if (operationSuccess) {
      handleCloseModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operationSuccess]);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowModal = (address = null) => {
    setSelectedAddress(address);
    setFormData(
      address
        ? { ...address }
        : { postalCode: "", street: "", apt: "", others: "", name: "" },
    );
    setShowModal(true);
    setLocalError("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedAddress) {
        await dispatch(updateAddress({
          addressId: selectedAddress.id,
          addressData: formData
        })).unwrap();
      } else {
        await dispatch(createAddress(formData)).unwrap();
      }
    } catch (err) {
      setLocalError(err.message || "Error al guardar la dirección.");
    }
  };

  const handleDelete = async (addressId) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar esta dirección?")
    ) {
      try {
        await dispatch(deleteAddress(addressId)).unwrap();
      } catch (err) { // eslint-disable-line no-unused-vars
        setLocalError("Error al eliminar la dirección.");
      }
    }
  };

  return (
    <Card>
      <Card.Header as="h2">Mis Direcciones</Card.Header>
      <Card.Body>
        {operationError && <Alert variant="danger">{typeof operationError === 'string' ? operationError : 'Error en la operación'}</Alert>}
        {localError && <Alert variant="danger">{localError}</Alert>}

        <Button
          variant="primary"
          onClick={() => handleShowModal()}
          className="mb-3"
        >
          Añadir Nueva Dirección
        </Button>
        {loading ? (
          <Spinner animation="border" />
        ) : addresses.length > 0 ? (
          <ListGroup>
            {addresses.map((addr) => (
              <ListGroup.Item
                key={addr.id} // Assuming ID field is 'id'
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{addr.name}</strong>
                  <br />
                  {addr.street}, {addr.apt}
                  <br />
                  {addr.postalCode}
                  {addr.others && (
                    <>
                      <br />
                      <em>{addr.others}</em>
                    </>
                  )}
                </div>
                <div>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleShowModal(addr)}
                    className="me-2"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(addr.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p>No tienes direcciones guardadas.</p>
        )}
      </Card.Body>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedAddress ? "Editar Dirección" : "Añadir Nueva Dirección"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {operationError && <Alert variant="danger">{typeof operationError === 'string' ? operationError : 'Error al guardar'}</Alert>}
           {localError && <Alert variant="danger">{localError}</Alert>}
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>
                Nombre de la Dirección (ej. Casa, Trabajo)
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="street">
              <Form.Label>Calle</Form.Label>
              <Form.Control
                type="text"
                name="street"
                value={formData.street}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="apt">
              <Form.Label>Apartamento, piso, etc.</Form.Label>
              <Form.Control
                type="text"
                name="apt"
                value={formData.apt}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="postalCode">
              <Form.Label>Código Postal</Form.Label>
              <Form.Control
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="others">
              <Form.Label>Otros detalles (opcional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="others"
                value={formData.others}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={operationLoading}>
              {operationLoading ? "Guardando..." : "Guardar Dirección"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Card>
  );
};

export default AddressesPage;

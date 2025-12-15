import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Spinner,
  Alert,
  Modal,
  Form,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import CustomPagination from "../components/common/CustomPagination";
import {
  fetchCoupons,
  createCoupon,
  updateCoupon,
  resetOperationStatus,
} from "../redux/couponSlice";

/**
 * Page to administer coupons (CRUD operations).
 *
 * @component
 * @returns {JSX.Element} The rendered AdminCouponsPage component.
 */
const AdminCouponsPage = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const {
    coupons,
    loading,
    error,
    operationLoading,
    operationSuccess,
    operationError,
  } = useSelector((state) => state.coupon);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    codigo: "",
    porcentajeDescuento: "",
    fechaExpiracion: "",
    usosMaximos: "",
  });

  // State for Edit Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (token) {
      // API currently does not support pagination in the implemented slice/service in this refactor
      // Assuming fetchCoupons fetches all.
      dispatch(fetchCoupons());
    }
  }, [currentPage, token, dispatch]);

  const handleModalClose = () => {
    setShowCreateModal(false);
    dispatch(resetOperationStatus());
  };
  const handleModalShow = () => setShowCreateModal(true);

  useEffect(() => {
    if (operationSuccess) {
      handleModalClose();
      setShowEditModal(false);
      dispatch(fetchCoupons());
      dispatch(resetOperationStatus());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operationSuccess]);


  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewCoupon((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    const couponToCreate = {
      ...newCoupon,
      porcentajeDescuento: parseFloat(newCoupon.porcentajeDescuento),
      usosMaximos: parseInt(newCoupon.usosMaximos, 10),
      fechaExpiracion: new Date(newCoupon.fechaExpiracion).toISOString(),
    };
    dispatch(createCoupon(couponToCreate));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEditClick = (coupon) => {
    setEditingCoupon(coupon);
    setEditFormData({
      codigo: coupon.codigo,
      porcentajeDescuento: coupon.porcentajeDescuento,
      fechaExpiracion: new Date(coupon.fechaExpiracion)
        .toISOString()
        .slice(0, 16),
      usosMaximos: coupon.usosMaximos,
      activo: coupon.activo,
    });
    setShowEditModal(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdateCoupon = async (e) => {
    e.preventDefault();
    const couponToUpdate = {
      ...editFormData,
      porcentajeDescuento: parseFloat(editFormData.porcentajeDescuento),
      usosMaximos: parseInt(editFormData.usosMaximos, 10),
      fechaExpiracion: new Date(editFormData.fechaExpiracion).toISOString(),
    };
    dispatch(updateCoupon({ couponId: editingCoupon.id, couponData: couponToUpdate }));
  };

  const couponList = Array.isArray(coupons) ? coupons : (coupons?.cupones || []);
  const totalPages = coupons?.totalPages || 0;

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Administrar Cupones</h1>
        <div>
          <Button variant="primary" onClick={handleModalShow} className="me-2">
            Crear Cupón
          </Button>
          <LinkContainer to="/admin">
            <Button variant="secondary">Volver al Menú</Button>
          </LinkContainer>
        </div>
      </div>

      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{typeof error === 'string' ? error : 'Error'}</Alert>}
      {operationError && <Alert variant="danger">{typeof operationError === 'string' ? operationError : 'Error en operación'}</Alert>}

      {!loading && !error && (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Código</th>
                <th>Descuento (%)</th>
                <th>Expira</th>
                <th>Usos / Máximos</th>
                <th>Activo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {couponList.map((coupon) => (
                <tr key={coupon.id}>
                  <td>{coupon.codigo}</td>
                  <td>{coupon.porcentajeDescuento.toFixed(2)}%</td>
                  <td>
                    {new Date(coupon.fechaExpiracion).toLocaleDateString()}
                  </td>
                  <td>
                    {coupon.usosActuales} / {coupon.usosMaximos}
                  </td>
                  <td>{coupon.activo ? "Sí" : "No"}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleEditClick(coupon)}
                    >
                      Editar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {/* Modal de Creación */}
      <Modal show={showCreateModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Nuevo Cupón</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleCreateCoupon}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Código</Form.Label>
              <Form.Control
                type="text"
                name="codigo"
                value={newCoupon.codigo}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Porcentaje de Descuento</Form.Label>
              <Form.Control
                type="number"
                name="porcentajeDescuento"
                value={newCoupon.porcentajeDescuento}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de Expiración</Form.Label>
              <Form.Control
                type="datetime-local"
                name="fechaExpiracion"
                value={newCoupon.fechaExpiracion}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Usos Máximos</Form.Label>
              <Form.Control
                type="number"
                name="usosMaximos"
                value={newCoupon.usosMaximos}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit" disabled={operationLoading}>
              {operationLoading ? "Creando..." : "Crear"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Modal de Edición */}
      {editingCoupon && (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Cupón</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleUpdateCoupon}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Código</Form.Label>
                <Form.Control
                  type="text"
                  name="codigo"
                  value={editFormData.codigo}
                  onChange={handleEditFormChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Porcentaje de Descuento</Form.Label>
                <Form.Control
                  type="number"
                  name="porcentajeDescuento"
                  value={editFormData.porcentajeDescuento}
                  onChange={handleEditFormChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Fecha de Expiración</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="fechaExpiracion"
                  value={editFormData.fechaExpiracion}
                  onChange={handleEditFormChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Usos Máximos</Form.Label>
                <Form.Control
                  type="number"
                  name="usosMaximos"
                  value={editFormData.usosMaximos}
                  onChange={handleEditFormChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="switch"
                  label="Activo"
                  name="activo"
                  checked={editFormData.activo}
                  onChange={handleEditFormChange}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowEditModal(false)}
              >
                Cancelar
              </Button>
              <Button variant="primary" type="submit" disabled={operationLoading}>
                {operationLoading ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      )}
    </Container>
  );
};

export default AdminCouponsPage;

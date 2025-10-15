import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Spinner, Alert, Badge, Modal, ButtonGroup, Form, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import apiClient from '../services/apiClient';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Details Modal State
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Edit Status Modal State
  const [editingOrder, setEditingOrder] = useState(null);
  const [showEditStatusModal, setShowEditStatusModal] = useState(false);
  const [statusData, setStatusData] = useState({ orderStatus: '', paymentStatus: '' });

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/api/v1/admin/orders');
      setOrders(response.data);
    } catch (err) {
      setError('Failed to fetch orders. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleShowDetails = (order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedOrder(null);
  };

  const handleShowEditStatus = (order) => {
    setEditingOrder(order);
    setStatusData({ orderStatus: order.orderStatus, paymentStatus: order.paymentStatus });
    setShowEditStatusModal(true);
  };

  const handleCloseEditStatusModal = () => {
    setShowEditStatusModal(false);
    setEditingOrder(null);
  };

  const handleStatusFormChange = (e) => {
    const { name, value } = e.target;
    setStatusData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    try {
      if (statusData.orderStatus !== editingOrder.orderStatus) {
        await apiClient.patch(`/api/v1/orders/${editingOrder.orderId}/delivery-status`, { newStatus: statusData.orderStatus });
      }
      if (statusData.paymentStatus !== editingOrder.paymentStatus) {
        await apiClient.patch(`/api/v1/orders/payment/${editingOrder.paymentId}`, { newStatus: statusData.paymentStatus });
      }
      handleCloseEditStatusModal();
      fetchOrders(); // Refresh orders
    } catch (err) {
      console.error('Failed to update status', err);
      // Optionally, show an error in the modal
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'SUCCESS':
      case 'DELIVERED':
        return 'success';
      case 'WAITING':
      case 'PLACED':
        return 'warning';
      case 'FAILED':
        return 'danger';
      case 'START_DELIVERY':
        return 'info';
      default:
        return 'secondary';
    }
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Administrar Pedidos</h1>
        <LinkContainer to="/admin">
          <Button variant="secondary">Back to Admin Menu</Button>
        </LinkContainer>
      </div>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User Email</th>
              <th>Date</th>
              <th>Total</th>
              <th>Payment Status</th>
              <th>Order Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.userEmail}</td>
                <td>{new Date(order.orderTimestamp).toLocaleString()}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>
                  <Badge bg={getStatusBadge(order.paymentStatus)}>
                    {order.paymentStatus}
                  </Badge>
                </td>
                <td>
                  <Badge bg={getStatusBadge(order.orderStatus)}>
                    {order.orderStatus}
                  </Badge>
                </td>
                <td>
                  <ButtonGroup>
                    <Button variant="outline-info" size="sm" onClick={() => handleShowDetails(order)}>View Details</Button>
                    <Button variant="outline-primary" size="sm" onClick={() => handleShowEditStatus(order)}>Edit Status</Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Order Details Modal */}
      <Modal show={showDetailsModal} onHide={handleCloseDetailsModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Order Details #{selectedOrder?.orderId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <>
              <Row>
                <Col md={6}>
                  <h5>Delivery Information</h5>
                  <p><strong>Provider:</strong> {selectedOrder.deliveryProvider}</p>
                  <p><strong>Address:</strong> {selectedOrder.deliveryAddress}</p>
                </Col>
                <Col md={6}>
                  <h5>Payment Information</h5>
                  <p><strong>Method:</strong> {selectedOrder.paymentMethod}</p>
                  <p><strong>Payment ID:</strong> {selectedOrder.paymentId}</p>
                  <p><strong>Order Date:</strong> {new Date(selectedOrder.orderTimestamp).toLocaleString()}</p>
                  <p><strong>Payment Date:</strong> {new Date(selectedOrder.paymentTimestamp).toLocaleString()}</p>
                </Col>
              </Row>
              <hr />
              <h5>Items</h5>
              <Table striped bordered size="sm">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.productName}</td>
                      <td>{item.quantity}</td>
                      <td>${item.price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetailsModal}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Status Modal */}
      <Modal show={showEditStatusModal} onHide={handleCloseEditStatusModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Status for Order #{editingOrder?.orderId}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleUpdateStatus}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Payment Status</Form.Label>
              <Form.Select name="paymentStatus" value={statusData.paymentStatus} onChange={handleStatusFormChange}>
                <option value="WAITING">WAITING</option>
                <option value="SUCCESS">SUCCESS</option>
                <option value="FAILED">FAILED</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Order Status</Form.Label>
              <Form.Select name="orderStatus" value={statusData.orderStatus} onChange={handleStatusFormChange}>
                <option value="PLACED">PLACED</option>
                <option value="START_DELIVERY">START_DELIVERY</option>
                <option value="DELIVERED">DELIVERED</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditStatusModal}>Cancel</Button>
            <Button variant="primary" type="submit">Save Changes</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default AdminOrdersPage;

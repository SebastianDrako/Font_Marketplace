import React, { useState, useEffect } from 'react';
import { orderService } from '../services/orderService';
import { Button, Card, ListGroup, Alert, Spinner, Badge } from 'react-bootstrap';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState({ type: '', message: '' }); // For retry payment

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getMyOrders();
      // Sort orders by date, newest first
      const sortedOrders = response.data.sort((a, b) => new Date(b.orderTimestamp) - new Date(a.orderTimestamp));
      setOrders(sortedOrders);
    } catch (err) {
      setError('Failed to fetch orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleRetryPayment = async (orderId) => {
    setFeedback({ type: '', message: '' });
    try {
      await orderService.retryPayment(orderId);
      setFeedback({ type: 'success', message: `Payment retry initiated for order #${orderId}. Refreshing...` });
      setTimeout(fetchOrders, 2000); // Refresh orders after a short delay
    } catch (err) {
      setFeedback({ type: 'danger', message: `Failed to retry payment for order #${orderId}.` });
    }
  };

  const getStatusInfo = (status) => {
    const upperStatus = status?.toUpperCase();
    switch (upperStatus) {
      // Payment Statuses
      case 'SUCCESS':
      case 'PAID':
        return { variant: 'success', name: 'Paid' };
      case 'WAITING':
      case 'PENDING':
        return { variant: 'warning', name: 'Pending' };
      case 'FAILED':
        return { variant: 'danger', name: 'Failed' };

      // Order Statuses
      case 'DELIVERED':
        return { variant: 'success', name: 'Delivered' };
      case 'PLACED':
        return { variant: 'warning', name: 'Placed' };
      case 'START_DELIVERY':
      case 'SHIPPED':
        return { variant: 'info', name: 'Shipped' };
      case 'PROCESSING':
        return { variant: 'primary', name: 'Processing' };
      case 'CANCELLED':
        return { variant: 'danger', name: 'Cancelled' };

      default:
        return { variant: 'secondary', name: status };
    }
  };

  return (
    <Card>
      <Card.Header as="h2">My Orders</Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {feedback.message && <Alert variant={feedback.type}>{feedback.message}</Alert>}
        {loading ? (
          <div className="text-center"><Spinner animation="border" /></div>
        ) : orders.length > 0 ? (
          orders.map(order => {
            const orderStatusInfo = getStatusInfo(order.orderStatus);
            const paymentStatusInfo = getStatusInfo(order.paymentStatus);

            return (
              <Card key={order.orderId} className="mb-3">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>Order #{order.orderId}</strong>
                    <br />
                    <small className="text-muted">Date: {new Date(order.orderTimestamp).toLocaleDateString()}</small>
                  </div>
                  <div className="text-end">
                    <Badge bg={orderStatusInfo.variant}>{orderStatusInfo.name}</Badge>
                    <br />
                    <Badge bg={paymentStatusInfo.variant}>{paymentStatusInfo.name}</Badge>
                  </div>
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    {order.items.map((item, index) => (
                      <ListGroup.Item key={index} className="d-flex justify-content-between">
                        <span>{item.productName} (x{item.quantity})</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </ListGroup.Item>
                    ))}
                    <ListGroup.Item className="d-flex justify-content-between">
                      <strong>Total</strong>
                      <strong>${order.total.toFixed(2)}</strong>
                    </ListGroup.Item>
                  </ListGroup>
                  <div className="mt-3">
                      <p><strong>Shipping Address:</strong> {order.deliveryAddress}</p>
                      <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                  </div>
                  {order.paymentStatus === 'FAILED' && (
                    <div className="text-end mt-2">
                      <Button variant="warning" onClick={() => handleRetryPayment(order.orderId)}>
                        Retry Payment
                      </Button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            );
          })
        ) : (
          <p>You have no orders.</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default OrdersPage;

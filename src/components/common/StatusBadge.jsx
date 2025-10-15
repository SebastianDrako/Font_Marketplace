import React from 'react';
import { Badge } from 'react-bootstrap';

const statusMap = {
  // Payment Statuses
  SUCCESS: { variant: 'success', name: 'Paid' },
  PAID: { variant: 'success', name: 'Paid' },
  WAITING: { variant: 'warning', name: 'Pending' },
  PENDING: { variant: 'warning', name: 'Pending' },
  FAILED: { variant: 'danger', name: 'Failed' },
  REFUNDED: { variant: 'info', name: 'Refunded' },

  // Order Statuses
  DELIVERED: { variant: 'success', name: 'Delivered' },
  PLACED: { variant: 'warning', name: 'Placed' },
  START_DELIVERY: { variant: 'info', name: 'Shipped' },
  SHIPPED: { variant: 'info', name: 'Shipped' },
  PROCESSING: { variant: 'primary', name: 'Processing' },
  CANCELLED: { variant: 'danger', name: 'Cancelled' },

  // Default
  DEFAULT: { variant: 'secondary', name: 'Unknown' }
};

const StatusBadge = ({ status }) => {
  const details = statusMap[status?.toUpperCase()] || { variant: 'secondary', name: status };

  return (
    <Badge bg={details.variant}>
      {details.name}
    </Badge>
  );
};

export default StatusBadge;
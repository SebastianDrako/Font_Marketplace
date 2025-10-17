import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';

const Pagination = ({ pagination, onPageChange }) => {
  const { page, totalPages } = pagination;

  if (totalPages <= 1) {
    return null;
  }

  const handlePageClick = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      onPageChange(newPage);
    }
  };

  const items = [];
  for (let number = 0; number < totalPages; number++) {
    items.push(
      <BootstrapPagination.Item key={number} active={number === page} onClick={() => handlePageClick(number)}>
        {number + 1}
      </BootstrapPagination.Item>,
    );
  }

  return (
    <div className="d-flex justify-content-center mt-4">
      <BootstrapPagination>
        <BootstrapPagination.Prev onClick={() => handlePageClick(page - 1)} disabled={page === 0} />
        {items}
        <BootstrapPagination.Next onClick={() => handlePageClick(page + 1)} disabled={page === totalPages - 1} />
      </BootstrapPagination>
    </div>
  );
};

export default Pagination;

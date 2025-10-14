import React from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthImage from '../../AuthImage';

const Card = ({ productId, imageId, title, text }) => {
  return (
    <Link to={`/product/${productId}`} className="text-decoration-none text-dark">
      <BootstrapCard className="h-100 shadow-sm border-0">
        <AuthImage imageId={imageId} alt={title} variant="top" as={BootstrapCard.Img} />
        <BootstrapCard.Body>
          <BootstrapCard.Title>{title}</BootstrapCard.Title>
          {text && <BootstrapCard.Text>{text}</BootstrapCard.Text>}
        </BootstrapCard.Body>
      </BootstrapCard>
    </Link>
  );
};

export default Card;

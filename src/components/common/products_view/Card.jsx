import React from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';

const Card = ({ imageUrl, title, text }) => {
  return (
    <a href="#" className="text-decoration-none text-dark">
      <BootstrapCard className="h-100 shadow-sm border-0">
        <BootstrapCard.Img variant="top" src={imageUrl} />
        <BootstrapCard.Body>
          <BootstrapCard.Title>{title}</BootstrapCard.Title>
          {text && <BootstrapCard.Text>{text}</BootstrapCard.Text>}
        </BootstrapCard.Body>
      </BootstrapCard>
    </a>
  );
};

export default Card;

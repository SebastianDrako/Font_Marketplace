
import React from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';

const CustomCard = ({ children, className, ...props }) => {
  return (
    <BootstrapCard className={`shadow-sm ${className}`} {...props}>
      {children}
    </BootstrapCard>
  );
};

// Attach sub-components from BootstrapCard to CustomCard
CustomCard.Body = BootstrapCard.Body;
CustomCard.Title = BootstrapCard.Title;
CustomCard.Subtitle = BootstrapCard.Subtitle;
CustomCard.Text = BootstrapCard.Text;

export default CustomCard;

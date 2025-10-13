import React from 'react';
import { Breadcrumb } from 'react-bootstrap';

const BreadCrumb = () => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="#">Categoría Principal</Breadcrumb.Item>
      <Breadcrumb.Item href="#">Subcategoría 1</Breadcrumb.Item>
      <Breadcrumb.Item active>Título del Producto</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default BreadCrumb;

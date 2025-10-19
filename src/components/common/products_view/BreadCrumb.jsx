import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

const BreadCrumb = ({ path = [], productName = "" }) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
        Inicio
      </Breadcrumb.Item>
      {path.map((category) => (
        <Breadcrumb.Item
          key={category.id}
          linkAs={Link}
          linkProps={{ to: `/catalog?category=${category.name}` }}
        >
          {category.name}
        </Breadcrumb.Item>
      ))}
      <Breadcrumb.Item active>{productName}</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default BreadCrumb;

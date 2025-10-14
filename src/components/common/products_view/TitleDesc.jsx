import React from 'react';

const TitleDesc = ({ title = 'Nombre no disponible', description = 'Sin descripción.' }) => {
  return (
    <>
      <h1 className="display-5">{title}</h1>
      <p className="lead">
        {description}
      </p>
    </>
  );
};

export default TitleDesc;

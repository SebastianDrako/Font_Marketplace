import React from 'react';

const TitleDesc = ({ title = 'Nombre no disponible', description = 'Sin descripción.' }) => {
  return (
    <div>
      <h1 className="display-5 text-start">{title}</h1>
      <hr />
      <p className="text-start">
        {description}
      </p>
    </div>
  );
};

export default TitleDesc;

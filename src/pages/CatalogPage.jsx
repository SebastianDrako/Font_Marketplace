import React from 'react';
import Catalog from '../components/Catalog';

function CatalogPage() {
    return (
        <div className="container mt-4">
        <h1 className="mb-4 text-center">Catálogo de Productos</h1>
        <Catalog />
        </div>
    );
}

export default CatalogPage;
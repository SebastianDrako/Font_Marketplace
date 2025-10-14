import React from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import BreadCrumb from '../components/common/products_view/BreadCrumb';
import CarruselMain from '../components/common/products_view/CarruselMain';
import TitleDesc from '../components/common/products_view/TitleDesc';
import AddToCart from '../components/common/products_view/AddToCart';
import OtrosProductos from '../components/common/products_view/OtrosProductos';

const ProductPage = () => {
    const { id } = useParams(); // Obtiene el ID del producto de la URL
    const { product, breadcrumbs, relatedProducts, loading, error } = useProduct(id);

    // 1. Manejo del estado de carga
    if (loading) {
        return <div className="container my-5 text-center"><h2>Cargando producto...</h2></div>;
    }

    // 2. Manejo del estado de error
    if (error) {
        return <div className="container my-5 text-center"><p className="text-danger">{error}</p></div>;
    }
    
    // 3. Si no hay producto después de cargar, mostrar mensaje
    if (!product) {
        return <div className="container my-5 text-center"><h2>Producto no encontrado</h2></div>;
    }

    return (
        <div className="container my-5">
            <BreadCrumb path={breadcrumbs} productName={product.name} />
            <div className="row">
                <div className="col-md-6">
                    {/* Pasamos los IDs de las imágenes directamente */}
                    <CarruselMain imageIds={product.imageIds} />
                </div>
                <div className="col-md-6 d-flex flex-column justify-content-center ps-md-5">
                    {/* Usamos el nombre y descripción del producto */}
                    <TitleDesc 
                        title={product.name}
                        description={product.description}
                    />
                    {/* Pasamos el producto completo al componente AddToCart */}
                    <AddToCart product={product} />
                </div>
            </div>
            <OtrosProductos products={relatedProducts} />
        </div>
    );
};

export default ProductPage;
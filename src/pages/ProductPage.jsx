import React from 'react';
import BreadCrumb from '../components/common/products_view/BreadCrumb';
import CarruselMain from '../components/common/products_view/CarruselMain';
import TitleDesc from '../components/common/products_view/TitleDesc';
import AddToCart from '../components/common/products_view/AddToCart';
import OtrosProductos from '../components/common/products_view/OtrosProductos';

const ProductPage = () => {
    const productImages = [
        "https://placehold.co/800x600/E9ECEF/495057?text=Imagen+1",
        "https://placehold.co/800x600/6C757D/FFFFFF?text=Imagen+2",
        "https://placehold.co/800x600/343A40/FFFFFF?text=Imagen+3"
    ];

    const relatedProducts = [
        {
            imgSrc: "https://placehold.co/600x400/adb5bd/495057?text=Producto+A",
            title: "Nombre del Producto A"
        },
        {
            imgSrc: "https://placehold.co/600x400/6c757d/ffffff?text=Producto+B",
            title: "Nombre del Producto B"
        },
        {
            imgSrc: "https://placehold.co/600x400/495057/ffffff?text=Producto+C",
            title: "Nombre del Producto C"
        },
        {
            imgSrc: "https://placehold.co/600x400/343a40/ffffff?text=Producto+D",
            title: "Nombre del Producto D"
        },
        {
            imgSrc: "https://placehold.co/600x400/ced4da/495057?text=Producto+E",
            title: "Nombre del Producto E"
        },
        {
            imgSrc: "https://placehold.co/600x400/212529/ffffff?text=Producto+F",
            title: "Nombre del Producto F"
        }
    ];

    return (
        <div className="container my-5">
            <BreadCrumb />
            <div className="row">
                <div className="col-md-6">
                    <CarruselMain images={productImages} />
                </div>
                <div className="col-md-6 d-flex flex-column justify-content-center ps-md-5">
                    <TitleDesc 
                        title="Título del Producto"
                        description="Aquí va una descripción detallada y atractiva del producto. Puedes hablar de sus características, beneficios y por qué es la mejor opción para el cliente."
                    />
                    <AddToCart />
                </div>
            </div>
            <OtrosProductos products={relatedProducts} />
        </div>
    );
};

export default ProductPage;
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container text-center text-md-start">
        <div className="row text-center text-md-start">
          {/* About Section */}
          <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">
              Qué más veci
            </h5>
            <p>
              Trayendo un pedacito de la cultura y el sabor de Colombia a la
              increíble ciudad de Buenos Aires. Un espacio para conectar con
              nuestras raíces.
            </p>
          </div>

          {/* Useful Links Section */}
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">
              Enlaces Útiles
            </h5>
            <p>
              <Link to="/profile" className="text-white text-decoration-none">
                Tu Cuenta
              </Link>
            </p>
            <p>
              <Link to="/shipping" className="text-white text-decoration-none">
                Envíos y Entregas
              </Link>
            </p>
            <p>
              <Link to="/about" className="text-white text-decoration-none">
                Nosotros
              </Link>
            </p>
          </div>

          {/* Contact Section */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">
              Contacto
            </h5>
            <p>Palermo, Buenos Aires, Argentina</p>
            <p>hola@quemasveci.com</p>
            <p>+54 9 11 1234-5678</p>
          </div>
        </div>

        <hr className="mb-4" />

        {/* Social Media and Copyright */}
        <div className="row align-items-center">
          {/* Copyright */}
          <div className="col-md-7 col-lg-8">
            <p className="text-center text-md-start">
              © 2025 Copyright:
              <Link to="/" className="text-decoration-none">
                <strong className="text-warning"> QueMasVeci.com</strong>
              </Link>
            </p>
          </div>
          {/* Social Media */}
          <div className="col-md-5 col-lg-4">
            <div className="text-center text-md-end">
              {/* Social media links can be added here later */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

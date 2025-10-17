import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container text-center text-md-start">
        <div className="row text-center text-md-start">

          {/* About Section */}
          <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Colombia en Buenos Aires</h5>
            <p>Trayendo un pedacito de la cultura y el sabor de Colombia a la increíble ciudad de Buenos Aires. Un espacio para conectar con nuestras raíces.</p>
          </div>

          {/* Products Section */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Productos</h5>
            <p><a href="#!" className="text-white" style={{textDecoration: 'none'}}>Café y Bebidas</a></p>
            <p><a href="#!" className="text-white" style={{textDecoration: 'none'}}>Dulces y Antojitos</a></p>
            <p><a href="#!" className="text-white" style={{textDecoration: 'none'}}>Artesanías</a></p>
          </div>

          {/* Useful Links Section */}
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Enlaces Útiles</h5>
            <p><a href="/profile" className="text-white" style={{textDecoration: 'none'}}>Tu Cuenta</a></p>
            <p><a href="#!" className="text-white" style={{textDecoration: 'none'}}>Envíos y Entregas</a></p>
            <p><a href="#!" className="text-white" style={{textDecoration: 'none'}}>Nosotros</a></p>
          </div>

          {/* Contact Section */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Contacto</h5>
            <p><i className="fas fa-home me-3"></i> Palermo, Buenos Aires, Argentina</p>
            <p><i className="fas fa-envelope me-3"></i> hola@colombiaenbsas.com</p>
            <p><i className="fas fa-phone me-3"></i> +54 9 11 1234-5678</p>
          </div>
        </div>

        <hr className="mb-4" />

        {/* Social Media and Copyright */}
        <div className="row align-items-center">
          {/* Copyright */}
          <div className="col-md-7 col-lg-8">
            <p className="text-center text-md-start">© 2025 Copyright:
              <a href="#" style={{textDecoration: 'none'}}>
                <strong className="text-warning">ColombiaEnBsAs.com</strong>
              </a>
            </p>
          </div>
          {/* Social Media */}
          <div className="col-md-5 col-lg-4">
            <div className="text-center text-md-end">
              <ul className="list-unstyled list-inline">
                <li className="list-inline-item">
                  <a href="#" className="btn-floating btn-sm text-white" style={{fontSize: '23px'}}><i className="fab fa-facebook-f"></i></a>
                </li>
                <li className="list-inline-item">
                  <a href="#" className="btn-floating btn-sm text-white" style={{fontSize: '23px'}}><i className="fab fa-instagram"></i></a>
                </li>
                <li className="list-inline-item">
                  <a href="#" className="btn-floating btn-sm text-white" style={{fontSize: '23px'}}><i className="fab fa-whatsapp"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
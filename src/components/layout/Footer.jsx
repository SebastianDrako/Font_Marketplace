
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container text-center text-md-start">
        <div className="row text-center text-md-start">

          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Marketplace</h5>
            <p>Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </div>

          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Products</h5>
            <p>
              <a href="#" className="text-white" style={{textDecoration: 'none'}}>TheCompany</a>
            </p>
          </div>

          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Useful links</h5>
            <p>
              <a href="#" className="text-white" style={{textDecoration: 'none'}}>Your Account</a>
            </p>
          </div>

          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Contact</h5>
            <p>
              <i className="fas fa-home me-3"></i> New York, NY 10012, US
            </p>
            <p>
              <i className="fas fa-envelope me-3"></i> info@example.com
            </p>
            <p>
              <i className="fas fa-phone me-3"></i> + 01 234 567 88
            </p>
          </div>
        </div>

        <hr className="mb-4" />

        <div className="row align-items-center">
          <div className="col-md-7 col-lg-8">
            <p className="text-center text-md-start">© 2025 Copyright:
              <a href="#" style={{textDecoration: 'none'}}>
                <strong className="text-warning">TheCompany.com</strong>
              </a>
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;

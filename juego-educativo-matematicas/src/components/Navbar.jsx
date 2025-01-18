import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/styles/Navbar.css'; // Archivo CSS para estilos personalizados

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
      <div className="container fs-6">
        <div className="d-flex justify-content-between w-100">
          <div>
            <Link className="navbar-brand ms-5" to="/">
              <img src="../images/logo.png" alt="Logo" className="navbar-logo" />
            </Link>
          </div>
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link nav-equal-width" to="/inicio">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav-equal-width" to="/intro-suma">Operaciones Matemáticas</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav-equal-width" to="/sequence-games">Sucesiones</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav-equal-width" to="/intro-figuras">Figuras Geométricas</Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className="navbar-nav me-5 mt-1">
              <li className="nav-item">
                <Link  className="nav-link nav-equal-width text-end"
              to="https://youtube.com/@angelofabara7351?si=QIvQ6z2C2GwZuXK2"
              target="_blank"
              rel="noopener noreferrer">Ayuda</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

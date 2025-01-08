// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css'; // Asegúrate de tener estilos globales si los necesitas

const Home = () => {
  return (
    <main className=" my-4 container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      {/* Filas de botones */}
      <div className="row w-100 justify-content-center mb-4">
        {/* Primer tema */}
        <div className="col-12 col-sm-6 col-md-4 d-flex justify-content-center mb-3">
          <Link
            to="/intro-suma"
            className="btn btn-primary text-center d-flex flex-column justify-content-center align-items-center home-button"
            style={{ width: '250px', height: '250px', borderRadius: '15px', backgroundColor: '#0033cc' }}
            aria-label="Operaciones Básicas"
          >
            <img src="/images/math.png" alt="Operaciones Básicas" className="img-fluid mb-2" style={{ maxWidth: '150px' }} />
            <span>Operaciones Matemáticas</span>
          </Link>
        </div>

        {/* Segundo tema */}
        <div className="col-12 col-sm-6 col-md-4 d-flex justify-content-center mb-3">
          <Link
            to="/sequence-games"
            className="btn btn-primary text-center d-flex flex-column justify-content-center align-items-center home-button"
            style={{ width: '250px', height: '250px', borderRadius: '15px', backgroundColor: '#9900cc' }}
            aria-label="Sucesiones"
          >
            <img src="/images/sequence.png" alt="Sucesiones" className="img-fluid mb-2" style={{ maxWidth: '150px' }} />
            <span>Sucesiones</span>
          </Link>
        </div>
      </div>

      {/* Tercer tema */}
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-sm-6 col-md-4 d-flex justify-content-center mb-3">
          <Link
            to="/intro-figuras"
            className="btn btn-primary text-center d-flex flex-column justify-content-center align-items-center home-button"
            style={{ width: '250px', height: '250px', borderRadius: '15px', backgroundColor: '#339933' }}
            aria-label="Geometría"
          >
            <img src="/images/geometry.png" alt="Geometría" className="img-fluid mb-2" style={{ maxWidth: '150px' }} />
            <span>Geometría</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;

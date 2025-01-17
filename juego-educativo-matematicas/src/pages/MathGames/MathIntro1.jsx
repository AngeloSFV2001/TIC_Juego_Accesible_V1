import React from 'react';
import { useNavigate } from 'react-router-dom';

const MathIntro = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/suma');
  };

  return (
    <main className="my-2 container d-flex flex-column justify-content-center align-items-center min-vh-80 text-center">
      <h1 className=" mb-3" tabIndex="0">Bienvenido a Operaciones Matemáticas de Suma</h1>
      
      {/* Video responsivo */}
      <div className="mb-4" style={{ width: '100%', maxWidth: '800px' }}>
        <div className="ratio ratio-16x9">
        <iframe width="560" 
        height="315" 
        src="https://www.youtube.com/embed/Y8q_74xXN20?si=0rpGU8STKMxjRYpo" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </div>

      {/* Botón accesible */}
      <button
        className="btn btn-primary"
        onClick={handleContinue}
        aria-label="Continuar a los juegos de operaciones matemáticas"
      >
        Seguir
      </button>
    </main>
  );
};

export default MathIntro;

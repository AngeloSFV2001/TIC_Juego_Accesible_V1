import React from 'react';
import { useNavigate } from 'react-router-dom';

const MathIntro = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/sequence-game-1');
  };

  return (
    <main className="container d-flex flex-column justify-content-center align-items-center min-vh-80 text-center">
      <h1 className="mb-4" tabIndex="0">Bienvenido a Operaciones Matemáticas de Suma</h1>
      
      {/* Video responsivo */}
      <div className="mb-4" style={{ width: '100%', maxWidth: '800px' }}>
        <div className="ratio ratio-16x9">
          <iframe
            className="embed-responsive-item"
            src="https://www.youtube.com/watch?v=HbxkZ3xjIQk?playlist=HWdwzmD3XXQ&loop=1&modestbranding=1&rel=1&showinfo=1"
            title="Video de introducción a operaciones matemáticas"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture;playlist; controls"
            allowFullScreen
            aria-label="Video introductorio de operaciones matemáticas"
            tabIndex="0"
          ></iframe>
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

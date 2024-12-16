// src/pages/SequenceIntro.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SequenceIntro = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/sequence-game-1');
  };

  return (
    <div className="container my-5">
      <h1>Bienvenido a Sucesiones</h1>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <button className="btn btn-primary mt-3" onClick={handleContinue}>Seguir</button>
    </div>
  );
};

export default SequenceIntro;

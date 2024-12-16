// src/pages/SequenceGame1.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SequenceGame1 = () => {
  const navigate = useNavigate();

  // La sucesión completa y correcta
  const sequence = [1, 1, 2, 4, 7];
  const correctAnswer = 11;

  // Opciones de respuesta
  const options = [8, 6, 11];

  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [locked, setLocked] = useState(true);

  const handleCheck = () => {
    if (selectedOption === correctAnswer) {
      setFeedback('¡Correcto! Bien hecho.');
      setLocked(false);
    } else {
      setFeedback('Incorrecto. Inténtalo de nuevo.');
      setLocked(false);
    }
  };

  const handleRetry = () => {
    setSelectedOption(null);
    setFeedback(null);
    setLocked(true);
  };

  const handleNext = () => {
    navigate('/sequence-game-2'); // Redirige al siguiente juego de sucesiones
  };

  return (
    <div className="container my-5">
      <h1>Seleccione la opción que sigue en la sucesión</h1>
      <div className="d-flex justify-content-center align-items-center my-4">
        {sequence.map((num, index) => (
          <div key={index} className="text-center mx-2">
            <div className="p-3 border rounded bg-light">
              {/* Aquí irán las imágenes, reemplazar con img src si es necesario */}
              <span role="img" aria-label="lollipop">
                🍭
              </span>
              <p>{num}</p>
            </div>
            {index < sequence.length - 1 && <h2 className="mx-2">→</h2>}
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-around my-4">
        {options.map((option, index) => (
          <button
            key={index}
            className={`btn btn-lg ${selectedOption === option ? 'btn-success' : 'btn-outline-success'}`}
            onClick={() => setSelectedOption(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <button className="btn btn-primary me-3" onClick={handleCheck} disabled={selectedOption === null}>
          Comprobar
        </button>
        <button className="btn btn-warning me-3" onClick={handleRetry} disabled={locked}>
          Intentar de nuevo
        </button>
        <button className="btn btn-success" onClick={handleNext} disabled={locked}>
          Siguiente
        </button>
      </div>

      {feedback && <p className="mt-3">{feedback}</p>}
    </div>
  );
};

export default SequenceGame1;

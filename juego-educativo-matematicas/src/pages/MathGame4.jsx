// src/pages/MathGame4.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateGame = () => {
  const num1 = getRandomNumber(2, 10);
  const num2 = getRandomNumber(2, 10);
  const missingIndex = Math.random() < 0.5 ? 1 : 2;
  const result = num1 * num2;
  const correctAnswer = missingIndex === 1 ? num1 : num2;

  // Generar opciones únicas (incluyendo la respuesta correcta)
  const options = generateUniqueOptions(correctAnswer);

  return { num1, num2, missingIndex, result, correctAnswer, options };
};

const generateUniqueOptions = (correctAnswer) => {
  const options = new Set();
  options.add(correctAnswer);
  while (options.size < 4) {
    options.add(getRandomNumber(2, 10));
  }
  return Array.from(options).sort(() => Math.random() - 0.5);
};

const MathGame4 = () => {
  const navigate = useNavigate();

  const [gameData, setGameData] = useState(generateGame());
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [locked, setLocked] = useState(true);

  const { num1, num2, missingIndex, result, correctAnswer, options } = gameData;

  // Estado para manejar el arrastre
  const [draggedOption, setDraggedOption] = useState(null);

  const handleSelect = (value) => {
    setSelectedOption(value);
    setFeedback(null);
  };

  const handleDragStart = (value) => {
    setDraggedOption(value);
  };

  const handleDrop = () => {
    setSelectedOption(draggedOption);
    setDraggedOption(null);
  };

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
    setGameData(generateGame());
    setSelectedOption(null);
    setFeedback(null);
    setLocked(true);
  };

  const handleNext = () => {
    navigate('/home'); // Reemplaza con la ruta del siguiente juego o sección
  };

  // Función para manejar accesibilidad con teclas 1, 2, 3, 4
  const handleKeyDown = (e) => {
    const key = e.key;
    if (['1', '2', '3', '4'].includes(key)) {
      handleSelect(options[parseInt(key, 10) - 1]);
    }
  };

  return (
    <div className="container my-5" onKeyDown={handleKeyDown} tabIndex="0">
      <h1>Arrastra o selecciona el número que hace realidad la operación</h1>
      <div className="d-flex justify-content-center align-items-center my-4">
        {missingIndex === 1 ? (
          <>
            <div className="p-3 border" style={{ minWidth: '60px', minHeight: '60px', textAlign: 'center' }}>
              {selectedOption !== null ? selectedOption : '¿?'}
            </div>
            <h2 className="mx-3">× {num2} = {result}</h2>
          </>
        ) : (
          <>
            <h2>{num1} ×</h2>
            <div
              className="p-3 border mx-3"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              style={{ minWidth: '60px', minHeight: '60px', textAlign: 'center' }}
            >
              {selectedOption !== null ? selectedOption : '¿?'}
            </div>
            <h2>= {result}</h2>
          </>
        )}
      </div>

      <div className="d-flex justify-content-around my-4">
        {options.map((option, index) => (
          <div
            key={index}
            className={`btn btn-outline-primary btn-lg ${selectedOption === option ? 'btn-primary text-white' : ''}`}
            draggable
            onDragStart={() => handleDragStart(option)}
            onClick={() => handleSelect(option)}
          >
            {option}
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button className="btn btn-success me-3" onClick={handleCheck}>
          Comprobar
        </button>
        <button className="btn btn-warning me-3" onClick={handleRetry} disabled={locked}>
          Intentar de nuevo
        </button>
        <button className="btn btn-primary" onClick={handleNext} disabled={locked}>
          Siguiente
        </button>
      </div>

      {feedback && <p className="mt-3">{feedback}</p>}
    </div>
  );
};

export default MathGame4;

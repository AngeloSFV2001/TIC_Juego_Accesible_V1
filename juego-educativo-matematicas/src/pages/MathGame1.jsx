// src/pages/MathGame1.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const getRandomNumber = () => Math.floor(Math.random() * 999) + 1;

const MathGame1 = () => {
  const [num1, setNum1] = useState(getRandomNumber());
  const [num2, setNum2] = useState(getRandomNumber());
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [locked, setLocked] = useState(true);
  const navigate = useNavigate();

  const correctAnswer = num1 + num2;
  const options = [
    correctAnswer,
    getRandomNumber(),
    getRandomNumber()
  ].sort(() => Math.random() - 0.5);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setLocked(false);
    if (answer === correctAnswer) {
      setFeedback('Correcto!');
    } else {
      setFeedback('Incorrecto. Recuerda sumar correctamente.');
    }
  };

  const handleRetry = () => {
    setNum1(getRandomNumber());
    setNum2(getRandomNumber());
    setSelectedAnswer(null);
    setFeedback(null);
    setLocked(true);
  };

  const handleNext = () => {
    navigate('/math-game-2'); // Redirige al juego 2
  };

  return (
    <div className="container my-5">
      <h1>Resuelve la siguiente suma:</h1>
      <h2>{num1} + {num2}</h2>
      <div className="options mt-4">
        {options.map((option, index) => (
          <button
            key={index}
            className={`btn btn-${selectedAnswer === option ? 'success' : 'secondary'} mx-2`}
            disabled={!locked}
            onClick={() => handleAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
      {feedback && <p className="mt-3">{feedback}</p>}
      <div className="mt-3">
        <button className="btn btn-warning" onClick={handleRetry} disabled={locked}>
          Intentar de nuevo
        </button>
        <button className="btn btn-primary ms-3" onClick={handleNext} disabled={locked}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default MathGame1;

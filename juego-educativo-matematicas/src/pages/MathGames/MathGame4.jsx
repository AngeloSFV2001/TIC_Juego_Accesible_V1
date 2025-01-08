import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateGame = () => {
  const num1 = getRandomNumber(2, 10);
  const num2 = getRandomNumber(2, 10);
  const missingIndex = Math.random() < 0.5 ? 1 : 2;
  const result = num1 * num2;
  const correctAnswer = missingIndex === 1 ? num1 : num2;
  const options = generateUniqueOptions(correctAnswer);

  return { num1, num2, missingIndex, result, correctAnswer, options };
};

const generateUniqueOptions = (correctAnswer) => {
  const options = new Set([correctAnswer]);
  while (options.size < 4) {
    options.add(getRandomNumber(2, 10));
  }
  return Array.from(options).sort(() => Math.random() - 0.5);
};

const MathGame4 = () => {
  const navigate = useNavigate();
  const [gameData, setGameData] = useState(generateGame());
  const [selectedOption, setSelectedOption] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [locked, setLocked] = useState(true);

  const { num1, num2, missingIndex, result, correctAnswer, options } = gameData;

  const handleSelect = (value) => {
    setSelectedOption(value);
    setFeedback('');
  };

  const handleCheck = () => {
    const isCorrect = selectedOption === correctAnswer;
    const explanation = missingIndex === 1
      ? `El problema era: ? × ${num2} = ${result}. Luego, ? = ${result} / ${num2}. Finalmente, ? = ${correctAnswer}.`
      : `El problema era: ${num1} × ? = ${result}. Luego, ? = ${result} / ${num1}. Finalmente, ? = ${correctAnswer}.`;
    setFeedback(isCorrect ? `¡Correcto! Bien hecho. ${explanation}` : `Incorrecto. Inténtalo de nuevo. ${explanation}`);
    setLocked(!isCorrect);
    setShowModal(true);
  };

  const handleRetry = () => {
    setGameData(generateGame());
    setSelectedOption(null);
    setFeedback('');
    setLocked(true);
    setShowModal(false);
  };

  const handleNext = () => {
    navigate('/home'); // Cambia por la ruta al siguiente juego o sección
  };

  return (
    <div className="container justify-content-center">
      <h1 className="text-center m-5" tabIndex='0' style={{ fontSize: '2rem' }}>Arrastra o selecciona el número que hace realidad la operación</h1>
      <div className="d-flex justify-content-center align-items-center m-5" tabIndex='0' style={{ gap: '20px' }}>
        <h2 style={{ fontSize: '3rem' }}>{missingIndex === 1 ? '¿?' : num1}</h2>
        <h2 style={{ fontSize: '3rem' }}>×</h2>
        <h2 style={{ fontSize: '3rem' }}>{missingIndex === 2 ? '¿?' : num2}</h2>
        <h2 style={{ fontSize: '3rem' }}>=</h2>
        <h2 style={{ fontSize: '3rem' }}>{result}</h2>
      </div>

      <div className="d-flex justify-content-around flex-wrap my-5">
        {options.map((option, index) => (
          <button
            key={index}
            className={`btn btn-lg m-5 ${selectedOption === option ? 'btn-primary' : 'btn-outline-primary'}`}
            style={{ minWidth: '150px', fontSize: '1.8rem' }}
            onClick={() => handleSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="text-center mt-4">
        <button 
          className="btn btn-success btn-lg me-3" 
          onClick={handleCheck} 
          aria-label={`Botón comprobar, respuesta actual ${num1} x ${num2} = ${result}`} 
          style={{ fontSize: '1.5rem' }}
        >
          Comprobar
        </button>
        <button 
          className="btn btn-warning btn-lg me-3" 
          onClick={handleRetry} 
          disabled={locked} 
          style={{ fontSize: '1.5rem' }}
        >
          Intentar de nuevo
        </button>
        <button 
          className="btn btn-primary btn-lg" 
          onClick={handleNext} 
          disabled={locked} 
          style={{ fontSize: '1.5rem' }}
        >
          Siguiente
        </button>
      </div>

      {/* Modal de retroalimentación */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Resultado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <h4>{feedback}</h4>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="warning" onClick={handleRetry}>
            Intentar de nuevo
          </Button>
          <Button variant="primary" onClick={handleNext} disabled={locked}>
            Siguiente
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MathGame4;

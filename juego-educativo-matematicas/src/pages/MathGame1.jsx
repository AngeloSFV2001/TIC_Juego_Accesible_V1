import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const getRandomNumber = () => Math.floor(Math.random() * 999) + 1;

const MathGame1 = () => {
  const [num1, setNum1] = useState(getRandomNumber());
  const [num2, setNum2] = useState(getRandomNumber());
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [locked, setLocked] = useState(true);
  const [options, setOptions] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const navigate = useNavigate();

  useEffect(() => {
    const correctAnswer = num1 + num2;
    setOptions([
      correctAnswer,
      getRandomNumber(),
      getRandomNumber(),
    ].sort(() => Math.random() - 0.5));
    setSelectedAnswer(null);
    setFeedback('');
    setLocked(true);
  }, [num1, num2]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setLocked(false);
    if (answer === num1 + num2) {
      setFeedback('¡Correcto!');
    } else {
      setFeedback(`recuerda que las sumas se resuelven de derecha a izquierda. Empieza sumando las unidades, luego decenas y por último centenas`);
    }
    setShowModal(true); // Mostrar el modal
  };

  const handleRetry = () => {
    setAttempts((prev) => prev + 1);
    setNum1(getRandomNumber());
    setNum2(getRandomNumber());
    setFeedback('');
    setSelectedAnswer(null);
    setLocked(true);
    setStartTime(Date.now());
  };

  const handleNext = () => {
    const endTime = Date.now();
    const elapsedTime = Math.round((endTime - startTime) / 1000);

    localStorage.setItem('math-game-1', JSON.stringify({
      operation: `${num1} + ${num2}`,
      correctAnswer: num1 + num2,
      userAnswer: selectedAnswer,
      timeTaken: elapsedTime,
      attempts,
    }));

    setNum1(getRandomNumber());
    setNum2(getRandomNumber());
    navigate('/math-intro-2');
  };

  const closeModal = () => setShowModal(false);

  const renderVerticalOperation = (num1, num2, result = '???') => (
      <div
        className="border border-2 rounded p-3 mx-auto text-center"
        style={{ maxWidth: '200px', fontSize: '2.5rem', lineHeight: '3.5rem' }}
        aria-label={`${num1} más ${num2}. ¿Cuál es el resultado?`}
        tabIndex="0"
      >
    
      <table className="text-end w-100">
        <tbody>
          <tr>
            <td>{num1.toString().padStart(3, ' ')}</td>
          </tr>
          <tr>
            <td>
              <span aria-hidden="true" >+</span> {num2.toString().padStart(3, ' ')}
            </td>
          </tr>
          <tr>
            <td style={{ borderTop: '3px solid black' }}>{result}</td>
          </tr>
        </tbody>
      </table>
    </div>
    
  );
  
  const renderVerticalOperationResult = (num1, num2, result) => (
    <div
      className="border border-2 rounded p-3 mx-auto text-center"
      style={{ maxWidth: '200px', fontSize: '2.5rem', lineHeight: '3.5rem' }}
      aria-label={`${num1} más ${num2}. es igual a ${result}`}
      tabIndex="0"
    >
  
    <table className="text-end w-100">
      <tbody>
        <tr>
          <td>{num1.toString().padStart(3, ' ')}</td>
        </tr>
        <tr>
          <td>
            <span aria-hidden="true" >+</span> {num2.toString().padStart(3, ' ')}
          </td>
        </tr>
        <tr>
          <td style={{ borderTop: '3px solid black' }}>{result}</td>
        </tr>
      </tbody>
    </table>
  </div>
  
  );

  return (
    <div className="container my-5 text-center">
      <h1
        className="mb-4"
        style={{ fontSize: '2.5rem' }}
        tabIndex="0"
        aria-label="Resuelve la siguiente suma"
      >
        Resuelve la siguiente suma:
      </h1>

      {/* Operación en un cuadro */}
      {renderVerticalOperation(num1, num2)}

      {/* Opciones de respuesta */}
      <div className="d-flex justify-content-center my-4">
        {options.map((option, index) => (
          <button
            key={index}
            className={`btn ${selectedAnswer === option ? 'btn-success' : 'btn-outline-success'} mx-2`}
            style={{ width: '120px', height: '80px', fontSize: '1.8rem' }}
            disabled={!locked && selectedAnswer !== null}
            onClick={() => handleAnswer(option)}
            tabIndex="0"
            aria-label={`Opción de respuesta: ${option}`}
            aria-pressed={selectedAnswer === option}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Botones de interacción */}
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-warning mx-2"
          style={{ width: '180px', fontSize: '1.5rem' }}
          onClick={handleRetry}
          tabIndex="0"
          aria-label="Intentar de nuevo"
        >
          Intentar de nuevo
        </button>
        <button
          className="btn btn-primary mx-2"
          style={{ width: '180px', fontSize: '1.5rem' }}
          onClick={handleNext}
          disabled={locked || selectedAnswer === null}
          tabIndex="0"
          aria-label="Seguir al siguiente juego"
        >
          Seguir
        </button>
      </div>

      {/* Modal de retroalimentación */}
      <Modal
        show={showModal}
        onHide={closeModal}
        centered
        aria-labelledby="resultado-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="resultado-modal">Resultado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {renderVerticalOperationResult(num1, num2, num1 + num2)}
          <p
            className="mt-3"
            style={{ fontSize: '1.5rem' }}
            tabIndex="0"
            aria-live="assertive"
          >
            {feedback}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={closeModal}
            tabIndex="0"
            aria-label="Cerrar retroalimentación"
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MathGame1;

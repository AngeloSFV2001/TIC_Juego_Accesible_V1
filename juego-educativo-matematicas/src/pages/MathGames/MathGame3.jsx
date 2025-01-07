import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const MathGame3 = () => {
  const navigate = useNavigate();

  const [operations, setOperations] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [locked, setLocked] = useState(true);

  useEffect(() => {
    const generatedOperations = [];
    while (generatedOperations.length < 4) {
      const dividend = getRandomNumber(80, 999);
      const divisor = getRandomNumber(2, 100);
      if (dividend % divisor === 0) {
        generatedOperations.push({
          id: generatedOperations.length + 1,
          dividend,
          divisor,
          quotient: dividend / divisor,
        });
      }
    }
    setOperations(generatedOperations);
  }, []);

  const handleAnswerChange = (operationId, value) => {
    setSelectedAnswers({ ...selectedAnswers, [operationId]: value });
  };

  const handleCheck = () => {
    let incorrect = false;
    let feedbackMessage = '';

    operations.forEach((operation) => {
      const selectedAnswer = parseInt(selectedAnswers[operation.id], 10);
      if (selectedAnswer !== operation.quotient) {
        incorrect = true;
        feedbackMessage += `\u2022 Operación: ${operation.dividend} ÷ ${operation.divisor}. Respuesta correcta: ${operation.quotient}. \n`;
        document.getElementById(`operation-${operation.id}`).style.backgroundColor = 'red';
      } else {
        document.getElementById(`operation-${operation.id}`).style.backgroundColor = 'green';
      }
    });

    if (incorrect) {
      setFeedback(feedbackMessage);
      setShowModal(true);
    } else {
      setFeedback('¡Todas las respuestas son correctas! Redirigiendo al siguiente juego...');
      setLocked(false);
      setTimeout(() => {
        navigate('/math-game-4');
      }, 2000);
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setFeedback(null);
    setLocked(true);
    setShowModal(false);

    operations.forEach((operation) => {
      document.getElementById(`operation-${operation.id}`).style.backgroundColor = 'lightblue';
    });
  };

  const closeModal = () => setShowModal(false);

  const handleNext = () => {
    navigate('/math-game-4');
  };

  return (
    <div className="container my-8 ">
      <h1 className="text-center mb-5 mt-5" aria-label="Resuelve las divisiones" tabIndex={'0'}>
        Resuelve las divisiones
      </h1>
      <div className="row justify-content-center">
        {operations.map((operation, index) => (
          <div key={operation.id} className="row mb-4 justify-content-center align-items-center">
            <div className="col-md-4 d-flex justify-content-center">
              <div
                id={`operation-${operation.id}`}
                className="text-center p-2 rounded w-100"
                style={{ backgroundColor: 'lightblue', color: 'black', fontSize: '1.5rem', maxWidth: '300px' }}
                tabIndex={'0'}
                aria-label={`Problema ${index + 1}: ${operation.dividend} dividido por ${operation.divisor}`}
              >
                {operation.dividend} ÷ {operation.divisor}
              </div>
            </div>
            <div className="col-md-4 d-flex justify-content-center">
              <select
                className="form-select w-100"
                style={{ maxWidth: '300px', fontSize: '1.5rem', textAlign: 'center' }}
                value={selectedAnswers[operation.id] || ''}
                onChange={(e) => handleAnswerChange(operation.id, e.target.value)}
                aria-label={`Combo box de respuesta para el problema ${index + 1}`}
                tabIndex={'0'}
              >
                <option value="">Selecciona una respuesta</option>
                {[...operations]
                  .map((op) => op.quotient)
                  .sort(() => Math.random() - 0.5)
                  .map((optionValue, optionIndex) => (
                    <option key={optionIndex} value={optionValue}>
                      {optionValue}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 text-center">
        <button className="btn btn-warning me-3" onClick={handleRetry}>
          Intentar de nuevo
        </button>
        <button className="btn btn-primary" onClick={handleCheck}>
          Comprobar
        </button>
      </div>

      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Retroalimentación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ whiteSpace: 'pre-line' }}>{feedback}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleRetry}>
            Intentar de nuevo
          </Button>
          <Button variant="danger" onClick={closeModal}>
            Cerrar
          </Button>
          <Button variant="success" onClick={handleNext}>
            Seguir
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MathGame3;

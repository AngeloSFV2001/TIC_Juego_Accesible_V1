import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../../index.css';

const SequenceGame = () => {
  const navigate = useNavigate();

  const sequences = [
    { id: 1, sequence: '1 → 2 → 4 → 7 → 11 → ?', correctAnswer: 16 },
    { id: 2, sequence: '1 ; 2 ; 4 ; 4 ; 7 ; 6 ; 10 ; 8 ; ?', correctAnswer: 13 },
    { id: 3, sequence: '1 → 6 → 3 → 8 → 5 → 10 → 7 → ?', correctAnswer: 12 },
    { id: 4, sequence: '15 ; 17 ; 22 ; 15 ; 29 ; 13 ; 36 ; 11 ; ?', correctAnswer: 43 },
  ];

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [locked, setLocked] = useState(true);

  const handleAnswerChange = (sequenceId, value) => {
    setSelectedAnswers({ ...selectedAnswers, [sequenceId]: value });
  };

  const handleCheck = () => {
    let incorrect = false;
    let feedbackMessage = '';

    sequences.forEach((sequence) => {
      const selectedAnswer = parseInt(selectedAnswers[sequence.id], 10);
      if (selectedAnswer !== sequence.correctAnswer) {
        incorrect = true;
        feedbackMessage += `\u2022 Sucesión: ${sequence.sequence}. Respuesta correcta: ${sequence.correctAnswer}. \n`;
        document.getElementById(`sequence-${sequence.id}`).style.backgroundColor = 'red';
      } else {
        document.getElementById(`sequence-${sequence.id}`).style.backgroundColor = 'green';
      }
    });

    if (incorrect) {
      setFeedback(feedbackMessage);
      setShowModal(true);
    } else {
      setFeedback('¡Todas las respuestas son correctas! Redirigiendo al siguiente juego...');
      setLocked(false);
      setTimeout(() => {
        navigate('/next-game');
      }, 2000);
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setFeedback(null);
    setLocked(true);
    setShowModal(false);

    sequences.forEach((sequence) => {
      document.getElementById(`sequence-${sequence.id}`).style.backgroundColor = 'lightblue';
    });
  };

  const closeModal = () => setShowModal(false);

  const handleNext = () => {
    navigate('/inicio');
  };

  return (
    <div className="container my-8 ">
      <h1 className="text-center mb-5 mt-5" aria-label="Resuelve las sucesiones" tabIndex={'0'}>
        Resuelve las sucesiones
      </h1>
      <div className="row justify-content-center">
        {sequences.map((sequence, index) => (
          <div key={sequence.id} className="row mb-4 justify-content-center align-items-center">
            <div className="col-md-4 d-flex justify-content-center">
              <div
                id={`sequence-${sequence.id}`}
                className="text-center p-2 rounded w-100"
                style={{ backgroundColor: 'lightblue', color: 'black', fontSize: '1.5rem', maxWidth: '300px' }}
                tabIndex={'0'}
                aria-label={`Sucesión ${index + 1}: ${sequence.sequence}`}
              >
                {sequence.sequence}
              </div>
            </div>
            <div className="col-md-4 d-flex justify-content-center">
              <select
                className="form-select w-100"
                style={{ maxWidth: '300px', fontSize: '1.5rem', textAlign: 'center' }}
                value={selectedAnswers[sequence.id] || ''}
                onChange={(e) => handleAnswerChange(sequence.id, e.target.value)}
                aria-label={`Combo box de respuesta para la sucesión ${index + 1}`}
                tabIndex={'0'}
              >
                <option value="">Selecciona una respuesta</option>
                {[sequence.correctAnswer, sequence.correctAnswer + 1, sequence.correctAnswer - 1, sequence.correctAnswer + 2]
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

export default SequenceGame;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../../index.css';
import '../styles/Games.css';

const GeometryGameArea = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [locked, setLocked] = useState(true);
  const [options, setOptions] = useState([]);
  const [startTime, setStartTime] = useState(Date.now());
  const [background, setBackground] = useState('default-game');
  const navigate = useNavigate();

  const sideLength = 7; // Tamaño del lado del cuadrado en cm
  const correctAnswer = sideLength * sideLength; // Área correcta del cuadrado

  useEffect(() => {
    const incorrectAnswers = [
      correctAnswer - Math.floor(Math.random() * 10 + 1),
      correctAnswer + Math.floor(Math.random() * 10 + 1),
    ];
    setOptions(
      [correctAnswer, ...incorrectAnswers].sort(() => Math.random() - 0.5)
    );
    setSelectedAnswer(null);
    setFeedback('');
    setLocked(true);
    setBackground('default-game');
  }, []);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setLocked(false);
    if (answer === correctAnswer) {
      setFeedback('¡Correcto! El área de un cuadrado se calcula como lado x lado.');
      setBackground('correct');
    } else {
      setFeedback(
        'Incorrecto. Recuerda que el área de un cuadrado se obtiene multiplicando la longitud de uno de sus lados por sí mismo.'
      );
      setBackground('incorrect');
    }
    setShowModal(true);
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
    setFeedback('');
    setLocked(true);
    setBackground('default-game');
    setStartTime(Date.now());
  };

  const handleNext = () => {
    const endTime = Date.now();
    const elapsedTime = Math.round((endTime - startTime) / 1000);

    localStorage.setItem('geometry-game-area', JSON.stringify({
      figure: 'Cuadrado',
      sideLength,
      correctAnswer,
      userAnswer: selectedAnswer,
      timeTaken: elapsedTime,
    }));

    navigate('/next-geometry-game');
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className={`container-fluid bg-${background}`}>
      <div className="container my-5 text-center">
        <h1
          className="mb-4"
          style={{ fontSize: '2.5rem' }}
          tabIndex="0"
          aria-label="¿Qué valor tiene el área de esta figura?"
        >
          ¿Qué valor tiene el área de esta figura?
        </h1>

        {/* Imagen de la figura */}
        <img
          src={require('../../assets/imagen.png')}
          alt="Cuadrado con lados de 7 cm"
          className="mb-4"
          style={{ maxWidth: '300px' }}
        />

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
            <p
              className="mt-3"
              style={{ fontSize: '1.5rem' }}
              tabIndex="0"
              aria-live="assertive"
            >
              {feedback}
            </p>
          </Modal.Body>
          <Modal.Footer className="justify-content-center mt-3">
            <Button
              className="btn btn-warning mx-2"
              style={{ width: '130px', fontSize: '1.3rem' }}
              onClick={handleRetry}
              tabIndex="0"
              aria-label="Intentar de nuevo"
            >
              Intentar de nuevo
            </Button>
            <Button
              className="btn btn-primary mx-2"
              style={{ width: '130px', fontSize: '1.3rem' }}
              onClick={handleNext}
              disabled={locked || selectedAnswer === null}
              tabIndex="0"
              aria-label="Seguir al siguiente juego"
            >
              Seguir
            </Button>
            <Button
              className="btn btn-danger mx-2"
              style={{ width: '130px', fontSize: '1.3rem' }}
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
    </div>
  );
};

export default GeometryGameArea;

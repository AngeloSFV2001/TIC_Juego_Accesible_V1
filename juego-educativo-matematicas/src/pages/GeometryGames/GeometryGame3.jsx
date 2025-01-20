import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../../index.css';

const GeometryGameArea = () => {
  const exercises = [
    {
      figure: 'Cuadrado',
      description: '¿Cuál es el área de un cuadrado con lados de 6 cm?',
      src: ('/images/AreaCuadrado.png'),
      correctAnswer: 36,
      explanation: 'El área de un cuadrado se calcula multiplicando lado x lado.',
    },
    {
      figure: 'Rectángulo',
      description: '¿Cuál es el área de un rectángulo con base 7 cm y altura 4 cm?',
      src: ('/images/AreaRectangulo.png'),
      correctAnswer: 28,
      explanation: 'El área de un rectángulo se calcula multiplicando base x altura.',
    },
    {
      figure: 'Triángulo',
      description: '¿Cuál es el área de un triángulo con base 12 cm y altura 7 cm?',
      src: ('/images/AreaTriangulo.png'),
      correctAnswer: 42,
      explanation: 'El área de un triángulo se calcula como (base x altura) / 2.',
    },
  ];

  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [locked, setLocked] = useState(true);
  const [options, setOptions] = useState([]);
  const [background, setBackground] = useState('default-game');

  const exercise = exercises[currentExercise];

  const generateOptions = () => {
    const incorrectAnswers = [
      exercise.correctAnswer - Math.floor(Math.random() * 10 + 1),
      exercise.correctAnswer + Math.floor(Math.random() * 10 + 1),
    ];
    return [
      exercise.correctAnswer,
      ...incorrectAnswers,
    ].sort(() => Math.random() - 0.5);
  };

  React.useEffect(() => {
    setOptions(generateOptions());
    setSelectedAnswer(null);
    setFeedback('');
    setLocked(true);
    setBackground('default-game');
  }, [currentExercise]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setLocked(false);
    if (answer === exercise.correctAnswer) {
      setFeedback('¡Correcto! ' + exercise.explanation);
      setBackground('correct');
    } else {
      setFeedback('Incorrecto. ' + exercise.explanation);
      setBackground('incorrect');
    }
    setShowModal(true);
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
    setFeedback('');
    setLocked(true);
    setBackground('default-game');
    closeModal();
  };

  const handleNext = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
    } else {
      alert('¡Felicidades! Completaste todos los niveles.');
      setCurrentExercise(0); // Reiniciar el juego si se desea.
    }
    closeModal();
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className={`container-fluid bg-${background}`}>
      <div className="container my-5 text-center">
        <h2
          className="mb-3"
          style={{ fontSize: '2.5rem' }}
          tabIndex="0"
          aria-label={exercise.description}
        >
          {exercise.description}
        </h2>

        {/* Imagen de la figura */}
        <img tabIndex={'0'}
          src={exercise.src}
          alt={exercise.figure}
          className="mb-2"
          style={{ maxWidth: '250px', maxHeight: '230px'}}
        />

        {/* Opciones de respuesta */}
        <div className="d-flex justify-content-center my-2">
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
            aria-label="Siguiente ejercicio"
          >
            {currentExercise < exercises.length - 1 ? 'Siguiente' : 'Finalizar'}
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
              className="mt-1"
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
              aria-label="Siguiente ejercicio"
            >
              {currentExercise < exercises.length - 1 ? 'Siguiente' : 'Finalizar'}
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

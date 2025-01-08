import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../../index.css';

const figures = [
  {
    id: 1,
    name: 'Cuadrado',
    image: '/path/to/cuadrado.png', // Reemplazar con la ruta de la imagen del cuadrado
    formula: 'lado x lado',
  },
  {
    id: 2,
    name: 'Rectángulo',
    image: '/path/to/rectangulo.png', // Reemplazar con la ruta de la imagen del rectángulo
    formula: 'base x altura',
  },
  {
    id: 3,
    name: 'Triángulo',
    image: '/path/to/triangulo.png', // Reemplazar con la ruta de la imagen del triángulo
    formula: 'base x altura / 2',
  },
  {
    id: 4,
    name: 'Rombo',
    image: '/path/to/rombo.png', // Reemplazar con la ruta de la imagen del rombo
    formula: 'D x d / 2',
  },
];

const formulas = [
  'lado x lado',
  'base x altura',
  'base x altura / 2',
  'D x d / 2',
];

const GeometryGame = () => {
  const navigate = useNavigate();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [locked, setLocked] = useState(true);

  const handleAnswerChange = (figureId, value) => {
    setSelectedAnswers({ ...selectedAnswers, [figureId]: value });
  };

  const handleCheck = () => {
    let incorrect = false;
    let feedbackMessage = '';

    figures.forEach((figure) => {
      if (selectedAnswers[figure.id] !== figure.formula) {
        incorrect = true;
        feedbackMessage += `• Figura: ${figure.name}. Fórmula correcta: ${figure.formula}.
`;
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
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className="container-fluid bg-default">
      <div className="container my-8">
        <h1 className="text-center mb-5 mt-5" aria-label="Conecta las fórmulas del área con las figuras correspondientes" tabIndex="0">
          Conecta las fórmulas del área con las figuras correspondientes
        </h1>
        <div className="row justify-content-center">
          {figures.map((figure) => (
            <div key={figure.id} className="row mb-4 justify-content-center align-items-center">
              <div className="col-md-4 d-flex justify-content-center">
                <img
                  src={figure.image}
                  alt={`Figura de ${figure.name}`}
                  className="img-fluid"
                  style={{ maxWidth: '150px', maxHeight: '150px' }}
                />
              </div>
              <div className="col-md-4 d-flex justify-content-center">
                <select
                  className="form-select w-100"
                  style={{ maxWidth: '300px', fontSize: '1.5rem', textAlign: 'center' }}
                  value={selectedAnswers[figure.id] || ''}
                  onChange={(e) => handleAnswerChange(figure.id, e.target.value)}
                  aria-label={`Selecciona la fórmula para ${figure.name}`}
                  tabIndex="0"
                >
                  <option value="">Selecciona una fórmula</option>
                  {formulas.map((formula, index) => (
                    <option key={index} value={formula}>
                      {formula}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-center mb-5">
          <button className="btn btn-warning me-3 mb-5" onClick={handleRetry}>
            Intentar de nuevo
          </button>
          <button className="btn btn-primary mb-5" onClick={handleCheck}>
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
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default GeometryGame;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../../index.css';

// Importa las imágenes
import Cuadrado from '/images/Cuadrado.png';
import Rectangulo from '/images/rectangulo.png';
import Triangulo from '/images/triangulo.png';
import Rombo from '/images/rombo.png';

// Datos de las figuras y fórmulas
const figures = [
  { id: 1, name: 'Cuadrado', image: Cuadrado, formula: 'lado por lado',descripcion:'incluye etiquetas de lado' },
  { id: 2, name: 'Rectángulo', image: Rectangulo, formula: 'base por altura',descripcion:'incluye etiqutas de base y altura' },
  { id: 3, name: 'Triángulo', image: Triangulo, formula: '(base por altura) dividido para 2',descripcion:'incluye etiquetas de base y altura' },
  { id: 4, name: 'Rombo', image: Rombo, formula: '(D.mayor por d.menor) dividido para 2',descripcion:'incluye etiquetas como d mayuscula de diagonal mayor y d miniuscula como diagonal menor' },
];

// Fórmulas visuales
const formulas = [
  'lado por lado',
  'base por altura',
  '(base por altura) dividido para 2',
  '(D.mayor por d.menor) dividido para 2',
];

const GeometryGame = () => {
  const navigate = useNavigate();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [canProceed, setCanProceed] = useState(false);

  const handleAnswerChange = (figureId, value) => {
    setSelectedAnswers({ ...selectedAnswers, [figureId]: value });
  };

  const handleCheck = () => {
    let incorrect = false;
    let feedbackMessage = '';

    figures.forEach((figure) => {
      if (selectedAnswers[figure.id] !== figure.formula) {
        incorrect = true;
        feedbackMessage += `La fórmula que elegiste para el ${figure.name} es incorrecta.\n`;
      } else {
        feedbackMessage += `La fórmula que elegiste para el ${figure.name} es correcta.\n`;
      }
    });
    feedbackMessage += `Recuerda que las figuras tienen sus diferentes fórmulas y se componen de sus elementos como: lado, base, altura, diagonal, entre otros`;
    if (incorrect) {
      setFeedback(feedbackMessage);
      setShowModal(true);
      setCanProceed(false);
    } else {
      setFeedback('¡Todas las respuestas son correctas! Puedes avanzar.');
      setShowModal(true);
      setCanProceed(true);
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setFeedback(null);
    setShowModal(false);
    setCanProceed(false);
  };

  const handleNext = () => {
    if (canProceed) {
      navigate('/juego-figuras-3');
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container-fluid bg-default">
      <div className="container my-8">
        <h2 className="text-center mb-4 mt-5" aria-label="Conecta las fórmulas del área con las figuras correspondientes" tabIndex="0">
          Conecta las fórmulas del área con las figuras correspondientes
        </h2>
        <div className="row justify-content-center">
          {figures.map((figure) => (
            <div key={figure.id} className="row mb-1 justify-content-center align-items-center">
              <div className="col-md-4 d-flex justify-content-center" tabIndex="0">
                <img
                  src={figure.image}
                  alt={`Figura de ${figure.name}, ${figure.descripcion}`}
                  className="img-fluid"
                  style={{ maxWidth: '150px', maxHeight: '150px' }}
                />
              </div>
              <div className="col-md-4 d-flex justify-content-center">
                <select
                  className="form-select w-100"
                  style={{ maxWidth: '400px', fontSize: '1.5rem', textAlign: 'center' }}
                  value={selectedAnswers[figure.id] || ''}
                  onChange={(e) => handleAnswerChange(figure.id, e.target.value)}
                  aria-label={`Selecciona la fórmula para ${figure.name}`}
                  tabIndex="0"
                >
                  <option value="">Selecciona una fórmula</option>
                  {formulas.map((formula, index) => (
                    <option
                      key={index}
                      value={formula}
                      aria-label={figures[index]?.formula || formula} // Personaliza cómo el lector de pantalla lee esta opción
                    >
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
            <p style={{ whiteSpace: 'pre-line' }} tabIndex={'0'}>{feedback}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleRetry}>
              Intentar de nuevo
            </Button>
            <Button
              variant="success"
              onClick={handleNext}
              disabled={!canProceed} // Botón deshabilitado si las respuestas no son correctas
              tabIndex="0"
              aria-label="Ir al siguiente juego"
            >
              Seguir
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

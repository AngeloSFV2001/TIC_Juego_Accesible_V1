import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../../index.css';

const SequenceGame = () => {
  const navigate = useNavigate();

  const sequences = [
    { id: 1, sequence: '1 → 2 → 4 → 7 → 11 → ?', correctAnswer: 16 ,texto:', 1, 2, 4, 7, 11'},
    { id: 2, sequence: '1 ; 2 ; 4 ; 4 ; 7 ; 6 ; 10 ; 8 ; ?', correctAnswer: 13, texto:', 1, 2, 4, 4, 7, 6, 10, ocho'},
    { id: 3, sequence: '1 → 6 → 3 → 8 → 5 → 10 → 7 → ?', correctAnswer: 12, texto:', 1, 6, 3, 8, 5, 10, 7'},
    { id: 4, sequence: '15 ; 17 ; 22 ; 15 ; 29 ; 13 ; 36 ; 11 ; ?', correctAnswer: 43, texto:', 15, 17, 22, 15, 29, 13, 36, 11'},
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
        feedbackMessage += `\u2022 Sucesión: ${sequence.id}.Es incorrecta. \n`;
        document.getElementById(`sequence-${sequence.id}`).style.backgroundColor = 'red';
      } else {
        feedbackMessage += `\u2022 Sucesión: ${sequence.id}.Es correcta. \n`;
        document.getElementById(`sequence-${sequence.id}`).style.backgroundColor = 'green';
      }
    });
    feedbackMessage += 'Recuerda, para resolver una sucesión, debes encontrar la relación entre los números presentes,'+ 
    'estos pueden ser de suma, resta, multiplicación o división. Inténtalo de nuevo.';

    if (incorrect) {
      setFeedback(feedbackMessage);
      setShowModal(true);
    } else {
      setFeedback('¡Todas las respuestas son correctas!\n Felicitaciones has terminado todos los niveles');
      setShowModal(true);
      setLocked(false);
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
    <div className='container-fluid bg-default'>
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
                  style={{
                    backgroundColor: 'lightblue',
                    color: 'black',
                    fontSize: '1.5rem',
                    maxWidth: '500px', // Aumentar el ancho máximo
                    minWidth: '300px',
                  }}
                  tabIndex={'0'}
                  aria-label={`Sucesión ${index + 1} es ${sequence.texto} ¿Qué número sigue en la sucesión?`}
                >
                  {sequence.sequence}
                </div>
              </div>
              <div className="col-md-4 d-flex justify-content-center">
                <select
                  className="form-select w-100"
                  style={{
                    maxWidth: '500px', // Aumentar el ancho máximo
                    minWidth: '300px',
                    fontSize: '1.5rem',
                    textAlign: 'center',
                  }}
                  value={selectedAnswers[sequence.id] || ''}
                  onChange={(e) => handleAnswerChange(sequence.id, e.target.value)}
                  aria-label={`Combo box de respuesta para la sucesión ${index + 1}`}
                  tabIndex={'0'}
                >
                  <option value="">Selecciona una respuesta</option>
                  {[sequence.correctAnswer, sequence.correctAnswer + 1, sequence.correctAnswer - 1, sequence.correctAnswer + 2]
                    .sort((a, b) => a - b)
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
          <button
            className="btn btn-success ms-3"
            onClick={handleNext}
            disabled={locked} // Bloquear el botón hasta que todas las respuestas sean correctas
          >
            Seguir
          </button>
        </div>

        <Modal show={showModal} onHide={closeModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Retroalimentación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <p
              className="mt-3"
              style={{ fontSize: "1.5rem" }}
              tabIndex="0"
              aria-live="assertive"
            >
              {feedback}
            </p>
            <p
              className="mt-3 text-center"
              style={{ fontSize: '1.5rem' }}
              tabIndex="0"
              aria-label='Sucesion similar: 90, 82, 74, 66, 55. Analizamos. 90 menos 8 es 82, el 82 anterior menos 8 es 74, 74 anterior menos 8 es 66, 66 anterior menos 8 es 56. 
              Podemos observar que se resta al numero anterior 8 en cada posición'
            >
              Ejemplo similar
              90 - 82 - 74 - 66 - 58 <br />
              90<br />
              90 - <b>8</b> = 82<br />
              82 - <b>8</b> = 74<br />
              74 - <b>8</b> = 66<br />
              66 - <b>8</b> = 58
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleRetry}>
              Intentar de nuevo
            </Button>
            <Button variant="danger" onClick={closeModal}>
              Cerrar
            </Button>
            <Button
            className="btn btn-success"
            onClick={handleNext}
            disabled={locked} // Bloquear el botón hasta que todas las respuestas sean correctas
          >
            Seguir
          </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default SequenceGame;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../../index.css';

const SequenceGame1 = () => {
  const navigate = useNavigate();

  const exercises = [
    {
      sequence: [1, 1, 2, 3, 5, 8],
      correctAnswer: 13,
      options: [8, 6, 13]
    },
    {
      sequence: [1, 2, 4, 8, 16],
      correctAnswer: 32,
      options: [32, 20, 40]
    },
    {
      sequence: [12, 10, 8, 6, 4],
      correctAnswer: 2,
      options: [0, 2, 3]
    }
  ];

  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [locked, setLocked] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [allowNext, setAllowNext] = useState(false);
  const [background, setBackground] = useState('default-game');

  const handleCheck = () => {
    if (selectedOption === exercises[currentExercise].correctAnswer) {
      setFeedback('¡Correcto! Bien hecho.');
      setLocked(false);
      setAllowNext(true);
    } else {
      setFeedback('Incorrecto. Recuerda para resolver una sucesión, debes encontrar la relación entre los números presentes, estos pueden ser de suma, resta, multiplicación o división. Inténtalo de nuevo.');
      setLocked(true);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleRetry = () => {
    setSelectedOption(null);
    setFeedback('');
    setLocked(true);
    closeModal();
    setBackground('default-game');
  };

  const handleNextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setSelectedOption(null);
      setFeedback('');
      setLocked(true);
      setAllowNext(false);
      closeModal();
    } else {
      navigate('/sequence-game-2'); // Redirige al siguiente juego
    }
  };

  const renderImages = (num) => {
    const images = [];
    for (let i = 0; i < num; i++) {
      images.push(
        <img
          key={i}
          src="/images/paleta.png"
          alt={`Representación ${num}`}
          className="m-1 "
          style={{ width: '20px', height: '40px' }}
        />
      );
    }
    let columns = Math.round(Math.sqrt(num));
    let margen = 0;
    if (num > 15) margen = 50;
    else if (num > 5) margen = 45;
    else if (num > 1) margen =40;
    else margen= 20;
    return (
      <div className="align-items-center ">
        <div className="d-grid flex-row align-items-center bg-info bg-gradient rounded"
        style={{
          gridTemplateColumns: `repeat(${columns}, auto)`,
          gap: '10px',
        }}
        role="group"
        aria-label={`Número representado: ${num}`}
        >
        {images}
        </div>
        <br></br>
        <div className=" text-center"
        style={{
          fontSize: '1.2rem',
          fontWeight: 'bold',
          marginLeft: `${margen}%`,
        }}><p className="d-flex ">{num}</p></div>
      </div>
    );
  };

  const currentSeq = exercises[currentExercise];

  return (
    <div className={`container-fluid bg-${background} `}>
      <div className="container mt-3 text-center vh-100">
        <h1 className="mt-2" tabIndex="0">Seleccione la opción que sigue en la sucesión</h1>
        <div className="mt-2 ms-5 d-flex justify-content-center align-items-center "
          tabIndex="0"
          aria-label={`Secuencia actual: ${currentSeq.sequence.join(', ')}. ¿Cuál número sigue?`}
        >
          {currentSeq.sequence.map((num, index) => (
            <div key={index} className="d-flex align-items-center mt-3">
              {renderImages(num)}
              {index < currentSeq.sequence.length - 1 && <h2 className="mx-3 ">→</h2>}
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-center mt-1 mb-4">
          {currentSeq.options.map((option, index) => (
            <button
              key={index}
              className={`btn btn-lg ${
                selectedOption === option ? 'btn-success' : 'btn-outline-success'
              } mx-2`}
              aria-label={`número ${option}`}
              style={{ width: '120px', height: '60px', fontSize: '1.5rem' }}
              onClick={() => setSelectedOption(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="mt-2 text-center">
          <button className="btn btn-primary me-3 mb-5" onClick={handleCheck} disabled={selectedOption === null}>
            Comprobar
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
           <p
              className="mt-3 text-center"
              style={{ fontSize: '1.5rem' }}
              tabIndex="0"
              aria-label='Sucesion similar: 1, 2, 4, 7, 11. Analizamos y 1 + 1 es 2, el 2 anterior + 2 es 4, 4 anterior + 3 es 7, 7 anterior + 4 es 11. 
              Podemos observar que se suma al numero anterior otro numero que va incrementando en 1'
            >
              Ejemplo similar
              1 - 2 - 4 - 7 - 11 <br />
              1<br />
              1 + <b>1</b> = 2<br />
              2 + <b>2</b> = 4<br />
              4 + <b>3</b> = 7<br />
              7 + <b>4</b> = 11
            </p>
            
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="warning"
              onClick={handleRetry}
              tabIndex="0"
              aria-label="Intentar de nuevo"
            >
              Intentar de nuevo
            </Button>
            <Button
              variant="success"
              onClick={handleNextExercise}
              tabIndex="0"
              aria-label="Siguiente ejercicio"
              disabled={!allowNext}
            >
              {currentExercise < exercises.length - 1 ? 'Siguiente ejercicio' : 'Seguir'}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default SequenceGame1;

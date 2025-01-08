import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../../index.css';

const SequenceGame1 = () => {
  const navigate = useNavigate();

  // Sucesión completa y correcta
  const sequence = [1, 1, 2, 3, 5, 8];
  const correctAnswer = 13;

  // Opciones de respuesta
  const options = [8, 6, 13];

  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [locked, setLocked] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [allowNext, setAllowNext] = useState(false);
  const [background, setBackground] = useState('default-game');  

  const handleCheck = () => {
    if (selectedOption === correctAnswer) {
      setFeedback('¡Correcto! Bien hecho.');
      setLocked(false);
      setAllowNext(true);
    } else {
      setFeedback('Incorrecto. Inténtalo de nuevo.');
      setLocked(false);
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

  const handleNext = () => {
    navigate('/sequence-game-2'); // Redirige al siguiente juego de sucesiones
  };

  // Función para generar imágenes proporcionales al número con condiciones de diseño
  const renderImages = (num) => {
    const images = [];
    for (let i = 0; i < num; i++) {
      images.push(
        <img
          key={i}
          src="/images/paleta.png"
          alt={`Representación ${num}`}
          className="m-1"
          style={{ width: '20px', height: '40px' }}
        />
      );
    }
    let columns = 2;
    let margen = 0;
    if (num > 15) columns = 4 , margen = 50;
    else if (num > 5) columns = 3 , margen = 45;
    else if (num > 1) margen =40;
    else margen= 20;
    return (
      <div className="align-items-center">
        <div className="d-grid flex-row align-items-center"
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
  
  const renderSequenceDescription = () => {
    let description = '';
    for (let i = 1; i < sequence.length; i++) {
      const operation = sequence[i] - sequence[i - 1];
      description += `${sequence[i - 1]}-(${sequence[i - 1]}+${operation})->${sequence[i]} `;
    }
    description += `${sequence[sequence.length - 1]}-(${sequence[sequence.length - 1]}+${correctAnswer - sequence[sequence.length - 1]})->${correctAnswer}`;
    return description;
  };

  return (
    <div className={`container-fluid bg-${background}`}>
      <div className="container my-5 text-center">
        <h1 className="my-5" tabIndex="0">Seleccione la opción que sigue en la sucesión</h1>
        <div className="d-flex justify-content-center align-items-center my-4"
          tabIndex="0"
          aria-label={`Primer número de la sucesion es ${sequence[0]},
          el segundo número de la sucesion es ${sequence[1]},
          el tercero número de la sucesion es ${sequence[2]},
          el cuarto número de la sucesion es ${sequence[3]},
          el quinto número de la sucesion es ${sequence[4]},
          el sexto número de la sucesion es ${sequence[5]}
          ¿Cúal numero sigue en la sucesión?`}
        >
          {sequence.map((num, index) => (
            <div key={index} className="d-flex align-items-center ">
              {renderImages(num)}
              {index < sequence.length - 1 && <h2 className="mx-3">→</h2>}
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-center my-4">
          {options.map((option, index) => (
            <button
              key={index}
              className={`btn btn-lg ${
                selectedOption === option ? 'btn-success' : 'btn-outline-success'
              } mx-2`}
              style={{ width: '120px', height: '60px', fontSize: '1.5rem' }}
              onClick={() => setSelectedOption(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="mt-4 text-center">
          <button className="btn btn-primary me-3" onClick={handleCheck} disabled={selectedOption === null}>
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
              {renderSequenceDescription()}
            </p>
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
              variant="warning"
              onClick={handleRetry}
              tabIndex="0"
              aria-label="Intentar de nuevo"
            >
              Intentar de nuevo
            </Button>
            <Button
              variant="success"
              onClick={handleNext}
              tabIndex="0"
              aria-label="Seguir al siguiente juego"
              disabled={!allowNext}
            >
              Seguir
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default SequenceGame1;

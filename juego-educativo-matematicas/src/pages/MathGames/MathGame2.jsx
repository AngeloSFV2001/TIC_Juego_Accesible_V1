import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const getRandomNumber = () => Math.floor(Math.random() * 30) + 1;

const MathGame2 = () => {
  const navigate = useNavigate();
  const [num1, setNum1] = useState(getRandomNumber());
  const [num2, setNum2] = useState(getRandomNumber());
  const [centenas, setCentenas] = useState(0);
  const [decenas, setDecenas] = useState(0);
  const [unidades, setUnidades] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  const correctAnswer = num1 * num2;

  const renderVerticalOperationResult = (num1, num2, result) => (
    <div
      className="border border-2 rounded p-3 mx-auto text-center"
      style={{ maxWidth: '200px', fontSize: '2.5rem', lineHeight: '3.5rem' }}
      aria-label={`${num1} multiplicado por ${num2}. Es igual a ${result}`}
      tabIndex="0"
    >
      <table className="text-end w-100">
        <tbody>
          <tr>
            <td>{num1.toString().padStart(3, ' ')}</td>
          </tr>
          <tr>
            <td>
              <span aria-hidden="true">x</span> {num2.toString().padStart(3, ' ')}
            </td>
          </tr>
          <tr>
            <td style={{ borderTop: '3px solid black' }}>{result}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const handleCheck = () => {
    const total =
      (parseInt(centenas || 0, 10) * 100) +
      (parseInt(decenas || 0, 10) * 10) +
      (parseInt(unidades || 0, 10));
    if (total === correctAnswer) {
      setFeedback('¡Correcto! Bien hecho.');
    } else {
      setFeedback(
        'Incorrecto. Recuerda cómo calcular centenas, decenas y unidades.'
      );
    }
    setShowModal(true); // Mostrar el modal después de comprobar
  };

  const closeModal = () => {
    setShowModal(false);
    setFeedback(null);
  };

  const incrementUnidades = () => {
    setUnidades((prev) => prev + 1);
    announceTotal();
  };
  
  const incrementDecenas = () => {
    setDecenas((prev) => prev + 1);
    announceTotal();
  };
  
  const incrementCentenas = () => {
    setCentenas((prev) => prev + 1);
    announceTotal();
  };
  const handleRetry = () => {
    setCentenas(0);
    setDecenas(0);
    setUnidades(0);
    setShowModal(false);
  };

  const handleNext = () => {
    navigate('/math-game-3');
  };

  return (
    <div className={`container-fluid bg-default`}>
      <div className="container my-5 text-center" >
        <h1 className="mb-4" 
        style={{ fontSize: '1.5rem' }}
        tabIndex="0"
        aria-label='Coloque la cantidad de centenas, decenas y unidades que resuelvan la operación:'>
          Coloque la cantidad de centenas, decenas y unidades que resuelvan la operación:
        </h1>
        <div className="d-flex justify-content-center">
          <div
            className="border border-2 rounded p-3 text-center"
            style={{ maxWidth: '300px', fontSize: '3rem', lineHeight: '4rem' }}
            aria-label={`${num1} multiplicado por ${num2}. Es igual a ${correctAnswer}`}
        tabIndex="0"
          >
            <table className="text-end w-100">
              <tbody>
                <tr>
                  <td>{num1.toString().padStart(3, ' ')}</td>
                </tr>
                <tr>
                  <td>
                    <span aria-hidden="true">x</span> {num2.toString().padStart(3, ' ')}
                  </td>
                </tr>
                <tr>
                  <td style={{ borderTop: '3px solid black' }}>???</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="row mt-4 justify-content-center align-items-center">
          <div className="col-2 text-center">
            <label htmlFor="centenas" className="label-custom">Centenas</label>
            <input
              id="centenas"
              type="number"
              className="form-control input-custom border border-secondary"
              value={centenas}
              onFocus={() => setCentenas('')}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                setCentenas(
                  value >= 0 && value <= 9 ? value.toString() : ''
                );
              }}
            />
          </div>
          <div className="col-2 text-center">
            <label htmlFor="decenas" className="label-custom">Decenas</label>
            <input
              id="decenas"
              type="number"
              className="form-control input-custom border border-secondary"
              value={decenas}
              onFocus={() => setDecenas('')}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                setDecenas(
                  value >= 0 && value <= 9 ? value.toString() : ''
                );
              }}
            />
          </div>
          <div className="col-2 text-center">
            <label htmlFor="unidades" className="label-custom">Unidades</label>
            <input
              id="unidades"
              type="number"
              className="form-control input-custom border border-secondary"
              value={unidades}
              onFocus={() => setUnidades('')}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                setUnidades(
                  value >= 0 && value <= 9 ? value.toString() : ''
                );
              }}
            />
          </div>
        </div>
        
        <div className="action-row" aria-live="polite">
        <button
            className="btn btn-outline-primary btn-unit-size"
            onClick={incrementCentenas}
            tabIndex="-1"
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(10, 1fr)',
                gap: '2px',
              }}
            >
              {Array.from({ length: 100 }, (_, i) => (
                <div
                  key={i}
                  style={{
                    width: '10px',
                    height: '10px',
                    backgroundColor: 'blue',
                  }}
                />
              ))}
            </div>
            <p className="mt-2" style={{ fontSize: '1rem' }}>
              Centenas
            </p>
          </button>

          <button
            className="btn btn-outline-success btn-unit-size"
            onClick={incrementDecenas}
            tabIndex="-1"
          >
            <div
              style={{
                marginLeft:'5px',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 2fr)',
                gap: '5px',
                paddingLeft: '25%'
              }}
            >
              {Array.from({ length: 10 }, (_, i) => (
                <div
                  key={i}
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'green',
                  }}
                />
              ))}
            </div>
            <p className="mt-2" style={{ fontSize: '1rem' }}>
              Decenas
            </p>
          </button>

          <button
            className="btn btn-outline-warning btn-unit-size"
            onClick={incrementUnidades}
            tabIndex="-1"
          >
            <div
              style={{
                margin:'auto',
                width: '50px',
                height: '50px',
                backgroundColor: 'orange',
                
              }}
            />
            <p className="mt-2" style={{ fontSize: '1rem' }}>
              Unidades
            </p>
          </button>
          <button
            className="btn btn-primary"
            style={{ fontSize: '1.25rem' }}
            onClick={handleCheck}
          >
            Comprobar
          </button>
        </div>

        {/* Botones de interacción */}
        <div className="mt-3 text-center">
        <button
          className="btn btn-warning me-3"
          style={{ fontSize: '1.25rem' }}
          onClick={handleRetry}
        >
          Intentar de nuevo
        </button>
        <button
          className="btn btn-success"
          style={{ fontSize: '1.25rem' }}
          onClick={handleNext}
          
        >
          Siguiente
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
            {renderVerticalOperationResult(num1, num2, correctAnswer)}
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
              tabIndex="0"
              aria-label="Seguir al siguiente juego"
            >
              Seguir
            </Button>
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
    </div>
    
  );
};

export default MathGame2;

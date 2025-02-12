import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../../index.css';

const getRandomNumber = () => Math.floor(Math.random() * 30) + 1;

const MathGame2 = () => {
  const navigate = useNavigate();
  const [num1, setNum1] = useState(getRandomNumber());
  const [num2, setNum2] = useState(getRandomNumber());
  const [centenas, setCentenas] = useState('');
  const [decenas, setDecenas] = useState('');
  const [unidades, setUnidades] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  const headingRef = useRef(null);

  const correctAnswer = num1 * num2;

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'C' || event.key === 'c') {
        handleCheck();
      } else if (event.key === 'I' || event.key === 'i') {
        handleRetry();
      } else if (event.key === 'N' || event.key === 'n') {
        if (headingRef.current) {
          setTimeout(() => {
            headingRef.current.focus(); // Navegar al enunciado
          }, 0);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [centenas, decenas, unidades]);

  const renderVerticalOperationResult = (num1, num2, result, texto) => (
    <div
      className="border border-2 rounded p-3 mx-auto text-center"
      style={{ maxWidth: '200px', fontSize: '2.5rem', lineHeight: '3.5rem' }}
      aria-label={`${num1} multiplicado por ${num2} ${texto}`}
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

  const calculateTotal = () =>
    (parseInt(centenas || 0, 10) * 100) +
    (parseInt(decenas || 0, 10) * 10) +
    (parseInt(unidades || 0, 10));

  const handleCheck = () => {
    const total = calculateTotal();
    if (total === correctAnswer) {
      setFeedback('¡Correcto! Bien hecho.');
      setIsNextEnabled(true);
    } else {
      setFeedback('Incorrecto. Recuerda cómo calcular centenas, decenas y unidades.');
      setIsNextEnabled(false);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFeedback(null);
  };

  const handleRetry = () => {
    setCentenas('');
    setDecenas('');
    setUnidades('');
    setShowModal(false);
    setIsNextEnabled(false);
  };

  const handleNext = () => {
    if (isNextEnabled) {
      navigate('/math-game-3');
    }
  };

  const renderComboBox = (label, value, onChange) => (
    <div className="col-2 text-center">
      <label aria-label={`cantidad de ${label}`}>{label}</label>
      <select
        className="form-select border border-secondary"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={`${value} ${label}`}
      >
        {[...Array(10).keys()].map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className={`container-fluid bg-default`}>
      <div className="container my-5 text-center">
        <h1
          className="mb-4"
          style={{ fontSize: '1.5rem' }}
          ref={headingRef}
          tabIndex="0"
        >
          Coloque la cantidad de centenas, decenas y unidades que resuelvan la operación:
        </h1>
        {renderVerticalOperationResult(num1, num2, "???", "¿Cual es el resultado?")}

        <div className="row mt-4 justify-content-center align-items-center">
          {renderComboBox('Centenas', centenas, setCentenas)}
          {renderComboBox('Decenas', decenas, setDecenas)}
          {renderComboBox('Unidades', unidades, setUnidades)}
        </div>

        <div className="action-row mt-4">
          <button
            className="btn btn-primary"
            onClick={handleCheck}
            aria-label={`Comprobar con el valor actual ${calculateTotal()}`}
          >
            Comprobar
          </button>
        </div>

        <div className="mt-3">
          <button className="btn btn-warning me-3" onClick={handleRetry}>
            Intentar de nuevo
          </button>
          <button
            className="btn btn-success"
            onClick={handleNext}
            disabled={!isNextEnabled}
            aria-label='Pasar al siguiente juego'
          >
            Siguiente
          </button>
        </div>

        <Modal show={showModal} onHide={closeModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Resultado</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="mt-3" style={{ fontSize: '1.5rem' }} tabIndex="0">{feedback}</p>
            {renderVerticalOperationResult(num1, num2, num1 * num2, ` es ${num1 * num2}`)}
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
              aria-label="Pasar al siguiente juego"
              disabled={!isNextEnabled}
            >
              Seguir
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default MathGame2;

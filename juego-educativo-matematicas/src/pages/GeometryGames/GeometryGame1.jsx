import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../../index.css';

const AccessibleTableGame = () => {
  const [selectedPerimeter, setSelectedPerimeter] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [background, setBackground] = useState('default-game');  
  
  const correctPerimeter = 12; // El perímetro correcto de la figura

  const closeModal = () => setShowModal(false);

  const checkAnswer = () => {
    const isCorrect = parseInt(selectedPerimeter, 10) === correctPerimeter;
    setFeedback(
      isCorrect
        ? '¡Correcto! El perímetro de la figura es 12 cm.'
        : `Incorrecto. El perímetro correcto es 12 cm, pero seleccionaste ${selectedPerimeter} cm.`
    );
    setShowModal(true);
  };

  const renderVerticalOperationResult = () => (
    <div
      className="border border-2 rounded p-3 mx-auto text-center"
      style={{ maxWidth: '200px', fontSize: '2.5rem', lineHeight: '3.5rem' }}
      tabIndex="0"
    >
      <table className="text-center w-100 ">
        <tbody>
          <tr>
            <td>Perímetro:</td>
          </tr>
          <tr>
            <td>{correctPerimeter} cm</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const reloadGame = () => {
    setSelectedPerimeter(0);
    setFeedback('');
    setShowModal(false);
  };

  const goToNextGame = () => {
    window.location.href = '/juego-figuras-2';
  };
  return (
    <div className={`container-fluid bg-${background} pt-5`}>
      <div className="text-center mt-5 ">
        <h1 className='mb-4 '
        tabIndex={'0'}
        aria-label='Se presenta una cuadricula 
        de 5 cuadros por 5 cuadros, cada cuadro corresponde 
        a un centímetro por un centímetro, imagina la figura y 
        selecciona la respuesta' >El perímetro de la siguiente figura es:</h1>
        <h4>Cada cuadro mide 1 centímetro x 1 centímetro</h4>
        <div className="d-flex justify-content-center">
          <table
            className="border border-dark"
            aria-label="Tabla accesible representando la figura"
            style={{ borderCollapse: 'collapse' }}
            
          >
            <tbody>
              {[...Array(5)].map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {[...Array(5)].map((_, colIndex) => (
                    <td
                      key={`${rowIndex}-${colIndex}`}
                      className="border"
                      tabIndex='0'
                      style={{
                        width: '40px',
                        height: '40px',
                        
                        backgroundColor:
                          (rowIndex === 2 || colIndex === 2) &&
                          !(rowIndex === 0 || rowIndex === 4 || colIndex === 0 || colIndex === 4)
                            ? 'green'
                            : 'white',
                        
                      }}
                      aria-label={
                        (rowIndex === 2 || colIndex === 2) &&
                        !(rowIndex === 0 || rowIndex === 4 || colIndex === 0 || colIndex === 4)
                          ? 'Color verde'
                          : 'Vacío'
                      }
                    ></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <label htmlFor="perimeter-select" className="me-2">
            Selecciona el perímetro:
          </label>
          <select
            id="perimeter-select"
            value={selectedPerimeter}
            onChange={(e) => setSelectedPerimeter(e.target.value)}
            className="form-select d-inline-block w-auto"
            aria-label="Seleccionar el perímetro de la figura"
          >
            {[...Array(21).keys()].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <span className="ms-2">cm</span>
        </div>
        <div className="mt-4 mb-5">
          <Button
            variant="success"
            onClick={checkAnswer}
            aria-label="Comprobar respuesta"
          >
            Comprobar
          </Button>
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
            {renderVerticalOperationResult()}
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
              variant="secondary"
              onClick={reloadGame}
              tabIndex="0"
              aria-label="Intentar nuevamente"
            >
              Intentar nuevamente
            </Button>
            <Button
              variant="success"
              onClick={goToNextGame}
              tabIndex="0"
              aria-label="Ir al siguiente juego"
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

export default AccessibleTableGame;

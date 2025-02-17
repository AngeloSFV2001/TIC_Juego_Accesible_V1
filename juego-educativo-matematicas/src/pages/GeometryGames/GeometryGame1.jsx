import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../../index.css';
import { useNavigate } from 'react-router-dom';

const AccessibleTableGame = () => {
  const [selectedPerimeter, setSelectedPerimeter] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [currentGame, setCurrentGame] = useState(1);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [canProceed, setCanProceed] = useState(false);
  const navigate = useNavigate();

  const games = [
    { correctPerimeter: 12, label: 'Figura 1', gridSize: 5 },
    { correctPerimeter: 20, label: 'Figura 2', gridSize: 5 },
  ];

  const currentFigure = games[currentGame - 1];

  const closeModal = () => setShowModal(false);

  const checkAnswer = () => {
    const isCorrect = parseInt(selectedPerimeter, 10) === currentFigure.correctPerimeter;
    setFeedback(
      isCorrect
        ? `¡Correcto! Puedes pasar al siguiente nivel. Recuerda el perimetro es la distancia que rodea la figura.`
        : `Incorrecto. Recuerda el perimetro es la distancia que rodea la figura. Puedes ayudarte recreando el borde de la imagen en una hoja e ir contando las lineas.`
    );
    setShowModal(true);
    setCanProceed(isCorrect);
  };

  const reloadGame = () => {
    setSelectedPerimeter(null);
    setFeedback('');
    setShowModal(false);
  };

  const nextGame = () => {
    if (currentGame < games.length) {
      setCurrentGame((prev) => prev + 1);
      setCanProceed(false);
      reloadGame();
    } else {
      setGameCompleted(true);
      navigate('/juego-figuras-2');
    }
  };

  const renderFeedbackGrid = (gridSize) => (
    <table
      className="border-dark"
      aria-label="Tabla de retroalimentación con un ejemplo de figura"
      tabIndex={'0'}
      style={{ 
        borderCollapse: 'collapse', 
        margin: '0 auto', 
        width: '200px',
        border: '3px solid black'
      }}
    >
      <tbody>
        {[...Array(gridSize)].map((_, rowIndex) => (
          <tr key={rowIndex}>
            {[...Array(gridSize)].map((_, colIndex) => (
              <td
                key={`${rowIndex}-${colIndex}`}
                className="border"
                tabIndex="0"
                data-row={rowIndex}
                data-col={colIndex}
                onKeyDown={(e) => handleKeyNavigation(e, rowIndex, colIndex, gridSize)}
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor:
                    gridSize === 5
                      ? (rowIndex === 2 || colIndex === 2) &&
                        !(rowIndex === 0 || rowIndex === gridSize - 1 || colIndex === 0 || colIndex === gridSize - 1)
                        || (colIndex === 3)
                        ? 'green'
                        : 'white'
                      : (rowIndex === 1 || rowIndex === gridSize - 2) &&
                        (colIndex === 1 || colIndex === gridSize - 2) 
                      ? 'green'
                      : 'white',
                }}
                aria-label={
                  gridSize === 5
                    ? (rowIndex === 2 || colIndex === 2) &&
                      !(rowIndex === 0 || rowIndex === gridSize - 1 || colIndex === 0 || colIndex === gridSize - 1)
                      || (colIndex === 3)
                      ? `Ejemplo fila ${rowIndex + 1}, columna ${colIndex + 1} Color verde`
                      : `Ejemplo fila ${rowIndex + 1}, columna ${colIndex + 1} Vacío`
                    : (rowIndex === 1 || rowIndex === gridSize - 2) &&
                      (colIndex === 1 || colIndex === gridSize - 2) 
                      ? `Ejemplo fila ${rowIndex + 1}, columna ${colIndex + 1} Color verde`
                      : `Ejemplo fila ${rowIndex + 1}, columna ${colIndex + 1} Vacío`
                }
              ></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderGrid = (gridSize) => (
    <table
      className="border-dark"
      aria-label={`Tabla de ejercicio a resolver de la figura ${currentFigure.label}`}
      style={{ borderCollapse: 'collapse',
                border: '2px solid black'
      }}
      tabIndex={'0'}
      
    >
      <tbody>
        {[...Array(gridSize)].map((_, rowIndex) => (
          <tr key={rowIndex}>
            {[...Array(gridSize)].map((_, colIndex) => (
              <td
                key={`${rowIndex}-${colIndex}`}
                className="border"
                tabIndex="0"
                data-row={rowIndex}
                data-col={colIndex}
                onKeyDown={(e) => handleKeyNavigation(e, rowIndex, colIndex, gridSize)}
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor:
                    currentGame === 1
                      ? (rowIndex === 2 || colIndex === 2) &&
                        !(rowIndex === 0 || rowIndex === gridSize - 1 || colIndex === 0 || colIndex === gridSize - 1)
                        ? 'green'
                        : 'white'
                      : (rowIndex === 1 || rowIndex === gridSize - 2) &&
                        (colIndex === 1 || colIndex === gridSize - 2) || (colIndex === 2 )
                      ? 'green'
                      : 'white',
                }}
                aria-label={
                  currentGame === 1
                    ? (rowIndex === 2 || colIndex === 2) &&
                      !(rowIndex === 0 || rowIndex === gridSize - 1 || colIndex === 0 || colIndex === gridSize - 1)
                      ? `fila ${rowIndex + 1}, columna ${colIndex + 1} Color verde`
                      : `fila ${rowIndex + 1}, columna ${colIndex + 1} Vacío`
                    : (rowIndex === 1 || rowIndex === gridSize - 2) &&
                      (colIndex === 1 || colIndex === gridSize - 2) || (colIndex === 2 )
                    ? `fila ${rowIndex + 1}, columna ${colIndex + 1} Color verde`
                    : `fila ${rowIndex + 1}, columna ${colIndex + 1} Vacío`
                }
              ></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  const handleKeyNavigation = (e, rowIndex, colIndex, gridSize) => {
    switch (e.key) {
      case 'ArrowUp': {
        e.preventDefault();
        const prevRow = rowIndex > 0 ? rowIndex - 1 : gridSize - 1;
        document.querySelector(`[data-row='${prevRow}'][data-col='${colIndex}']`)?.focus();
        break;
      }
      case 'ArrowDown': {
        e.preventDefault();
        const nextRow = rowIndex < gridSize - 1 ? rowIndex + 1 : 0;
        document.querySelector(`[data-row='${nextRow}'][data-col='${colIndex}']`)?.focus();
        break;
      }
      case 'ArrowLeft': {
        e.preventDefault();
        const prevCol = colIndex > 0 ? colIndex - 1 : gridSize - 1;
        document.querySelector(`[data-row='${rowIndex}'][data-col='${prevCol}']`)?.focus();
        break;
      }
      case 'ArrowRight': {
        e.preventDefault();
        const nextCol = colIndex < gridSize - 1 ? colIndex + 1 : 0;
        document.querySelector(`[data-row='${rowIndex}'][data-col='${nextCol}']`)?.focus();
        break;
      }
      default:
        break;
    }
  };

  return (
    <div className="container-fluid bg-default pt-5">
      <div className="text-center mt-5">
        <h1 className="mb-4" tabIndex="0" aria-label='Calcula el perímetro de la figura que se presentara en una tabla de 5 centimetro por 5 centímetros'>
          {`Juego ${currentGame}: Calcula el perímetro de la figura`}
        </h1>
        <h2 tabIndex="0" aria-label='Cada cuadro de la tabla mide un centímetro por un centímetro. Cuando diga vacío no se llena la tabla y color verde si se llena el cuadro'>
          {`Cada cuadro mide un centímetro por un centímetro.`}
        </h2>
        <div className="d-flex justify-content-center mt-4">{renderGrid(currentFigure.gridSize)}</div>
        <div className="mt-4">
          <label htmlFor="perimeter-select" className="me-2">
            Selecciona el perímetro:
          </label>
          <select
            id="perimeter-select"
            value={selectedPerimeter || ''}
            onChange={(e) => setSelectedPerimeter(e.target.value)}
            className="form-select d-inline-block w-auto"
            aria-label="Seleccionar el perímetro de la figura"
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            {[12, 14, 16, 18, 20].map((num) => (
              <option key={num} value={num}>
                {num} cm
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4 mb-5">
          <Button
            variant="success"
            onClick={checkAnswer}
            aria-label="Comprobar respuesta"
            disabled={!selectedPerimeter}
          >
            Comprobar
          </Button>
        </div>

        <Modal show={showModal} onHide={closeModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Resultado</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {renderFeedbackGrid(5)}
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
              onClick={nextGame}
              tabIndex="0"
              aria-label="Ir al siguiente juego"
              disabled={!canProceed}
            >
              Siguiente
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AccessibleTableGame;

// src/pages/MathGame3.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const MathGame3 = () => {
  const navigate = useNavigate();

  const [operations, setOperations] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [pairs, setPairs] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [locked, setLocked] = useState(true);

  useEffect(() => {
    // Generar operaciones solo una vez al montar el componente
    const generatedOperations = [
      { id: 1, text: `${getRandomNumber(100, 500)} + ${getRandomNumber(100, 500)}` },
      { id: 2, text: `${getRandomNumber(500, 999)} - ${getRandomNumber(100, 500)}` },
      { id: 3, text: `${getRandomNumber(10, 31)} * ${getRandomNumber(1, 10)}` },
      { id: 4, text: `${getRandomNumber(20, 99)} / ${getRandomNumber(2, 10)}` },
    ];

    const generatedAnswers = generatedOperations.map((op, index) => ({
      id: index + 1,
      value: eval(op.text), // Evalúa la operación para obtener la respuesta
    }));

    setOperations(generatedOperations);
    setAnswers(generatedAnswers);
  }, []);

  const handleSelectOperation = (operationId) => {
    setSelectedOperation(operationId);
    setFeedback(null); // Limpiar feedback al seleccionar una operación
  };

  const handleSelectAnswer = (answerId) => {
    if (selectedOperation) {
      setPairs((prevPairs) => {
        const updatedPairs = { ...prevPairs, [selectedOperation]: answerId };

        // Validar que no se repitan conexiones
        const uniqueAnswers = new Set(Object.values(updatedPairs));
        if (uniqueAnswers.size !== Object.values(updatedPairs).length) {
          setFeedback('Cada respuesta solo puede estar conectada a una operación.');
          return prevPairs; // No permite la conexión
        }

        setFeedback(null);
        setSelectedOperation(null); // Deseleccionar operación después de conectar
        return updatedPairs;
      });
    }
  };

  const handleCheck = () => {
    // Validar conexiones
    const isCorrect = Object.entries(pairs).every(([operationId, answerId]) => {
      const operation = operations.find((op) => op.id === parseInt(operationId));
      const answer = answers.find((ans) => ans.id === answerId);
      return eval(operation.text) === answer.value;
    });

    if (isCorrect) {
      setFeedback('¡Correcto! Redirigiendo al siguiente juego...');
      setLocked(false);

      // Redirige al cuarto juego después de 2 segundos
      setTimeout(() => {
        navigate('/math-game-4');
      }, 2000);
    } else {
      setFeedback('Algunas respuestas están mal. Intenta de nuevo.');
    }
  };

  const handleRetry = () => {
    setPairs({});
    setFeedback(null);
    setLocked(true);
  };

  const handleNext = () => {
    navigate('/math-game-4'); // Redirige al juego 3
  };

  return (
    <div className="container my-5">
      <h1>Conecta las operaciones con sus respectivas respuestas</h1>
      <div className="row">
        <div className="col-md-6">
          {operations.map((op) => (
            <button
              key={op.id}
              className={`btn btn-secondary mb-3 ${selectedOperation === op.id ? 'btn-info' : ''}`}
              onClick={() => handleSelectOperation(op.id)}
            >
              {op.text}
            </button>
          ))}
        </div>
        <div className="col-md-6">
          {answers.map((ans) => (
            <button
              key={ans.id}
              className={`btn btn-primary mb-3 ${Object.values(pairs).includes(ans.id) ? 'btn-success' : ''}`}
              onClick={() => handleSelectAnswer(ans.id)}
            >
              {ans.value}
            </button>
          ))}
        </div>
      </div>
      {feedback && <p className="mt-3">{feedback}</p>}
      <div className="mt-3">
        <button className="btn btn-warning me-3" onClick={handleRetry}>
          Intentar de nuevo
        </button>
        <button className="btn btn-primary" onClick={handleCheck}>
          Comprobar
        </button>
        <button className="btn btn-success ms-3" onClick={handleNext} disabled={locked}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default MathGame3;

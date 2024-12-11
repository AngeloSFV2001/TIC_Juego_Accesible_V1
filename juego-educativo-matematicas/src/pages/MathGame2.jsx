// src/pages/MathGame2.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const getRandomNumber = () => Math.floor(Math.random() * 30) + 1; // Números pequeños para evitar resultados mayores a 999.

const MathGame2 = () => {
  const navigate = useNavigate(); // Hook para navegación
  const [num1, setNum1] = useState(getRandomNumber());
  const [num2, setNum2] = useState(getRandomNumber());
  const [centenas, setCentenas] = useState(0);
  const [decenas, setDecenas] = useState(0);
  const [unidades, setUnidades] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [locked, setLocked] = useState(true);

  const correctAnswer = num1 * num2;
  const correctCentenas = Math.floor(correctAnswer / 100);
  const correctDecenas = Math.floor((correctAnswer % 100) / 10);
  const correctUnidades = correctAnswer % 10;

  const handleCheck = () => {
    if (
      correctCentenas === centenas &&
      correctDecenas === decenas &&
      correctUnidades === unidades
    ) {
      setFeedback('Correcto, bien hecho!');
      setLocked(false); // Desbloquear botones al acertar
    } else {
      setFeedback(
        'Incorrecto. Recuerda cómo calcular centenas, decenas y unidades.'
      );
      setLocked(false); // Desbloquear para permitir el intento de nuevo
    }
  };

  const handleRetry = () => {
    setFeedback(null);
    setCentenas(0);
    setDecenas(0);
    setUnidades(0);
    setLocked(true);
  };

  const handleNext = () => {
    navigate('/math-game-3'); // Redirige al juego 3
  };

  return (
    <div className="container my-5">
      <h1>Coloque la cantidad de decenas, centenas y unidades que se necesita para resolver esta operación:</h1>
      <div className="row">
        <div className="col-md-6">
          <h2>{num1} x {num2}</h2>
        </div>
        <div className="col-md-6">
          <div className="d-flex flex-column align-items-center">
            <div>
              <label>Centenas:</label>
              <input
                type="number"
                className="form-control"
                value={centenas}
                onChange={(e) => setCentenas(parseInt(e.target.value, 10) || 0)}
              />
            </div>
            <div>
              <label>Decenas:</label>
              <input
                type="number"
                className="form-control"
                value={decenas}
                onChange={(e) => setDecenas(parseInt(e.target.value, 10) || 0)}
              />
            </div>
            <div>
              <label>Unidades:</label>
              <input
                type="number"
                className="form-control"
                value={unidades}
                onChange={(e) => setUnidades(parseInt(e.target.value, 10) || 0)}
              />
            </div>
          </div>
        </div>
      </div>
      <button className="btn btn-primary mt-3" onClick={handleCheck}>
        Comprobar
      </button>
      {feedback && <p className="mt-3">{feedback}</p>}
      <div className="mt-3">
        <button
          className="btn btn-warning"
          onClick={handleRetry}
          disabled={locked}
        >
          Intentar de nuevo
        </button>
        <button
          className="btn btn-primary ms-3"
          onClick={handleNext} // Llamar a handleNext al presionar
          disabled={locked}    // Se habilita solo si la respuesta fue verificada
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default MathGame2;

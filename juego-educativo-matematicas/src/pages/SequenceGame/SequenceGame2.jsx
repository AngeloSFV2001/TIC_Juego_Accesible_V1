// src/pages/SequenceGame2.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import arrow from "/images/flecha.png"; // Asegúrate de que la imagen está en esta ruta
import '../../index.css';

const SequenceGame2 = () => {
  const navigate = useNavigate();

  // Sucesión numérica y operación correcta
  const sequence = [35, 70, 105, 140, 175, 210];
  const correctOperation = "SUMAR 35";

  // Opciones del combo box
  const operations = ["SUMAR 20", "SUMAR 35", "MULTIPLICAR 2", "RESTAR 10"];

  const [selectedOperation, setSelectedOperation] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [locked, setLocked] = useState(true);

  const handleCheck = () => {
    if (selectedOperation === correctOperation) {
      setFeedback("¡Correcto! La sucesión es válida.");
      setLocked(false);
    } else {
      setFeedback("Incorrecto. Intenta nuevamente.");
    }
  };

  const handleRetry = () => {
    setSelectedOperation("");
    setFeedback(null);
    setLocked(true);
  };

  const handleNext = () => {
    navigate("/sequence-game-3"); // Redirige al siguiente juego
  };

  return (
    <div className="container my-5">
      <h1 className="text-center">
        ¿Qué operación permite que la sucesión sea correcta?
      </h1>
      <div  
      className="text-center my-4 position-relative" 
      style={{ fontSize: "1.5rem" }}
      
      >
        {sequence.map((num, index) => (
          <span key={index} className="position-relative mx-4" style={{ display: "inline-block" }}>
            <br></br>
            <br></br>
            <br></br>
            <div style={{ fontSize: "2rem", fontWeight: "bold" }}>{num}</div>
            {index < sequence.length - 1 && (
              
              <img
                src={arrow}
                alt="Arrow"
                style={{
                  position: "absolute",
                  top: "50%", // Ajusta la posición vertical
                  left: "100%", // Coloca la flecha al lado derecho del número
                  transform: "translate(-25%, -50%)", // Centra la flecha entre los números
                  
                  width: "100px", // Ajusta el tamaño de la flecha
                  padding: "10",
                }}
              />
            )}
          </span>
        ))}
      </div>

      <div className="text-center my-3">
        <select
          className="form-select w-50 mx-auto"
          value={selectedOperation}
          onChange={(e) => setSelectedOperation(e.target.value)}
        >
          <option value="">Seleccione una operación</option>
          {operations.map((op, index) => (
            <option key={index} value={op}>
              {op}
            </option>
          ))}
        </select>
      </div>

      <div className="text-center mt-4">
        <button
          className="btn btn-success me-3"
          onClick={handleCheck}
          disabled={!selectedOperation}
        >
          Comprobar
        </button>
        <button
          className="btn btn-warning me-3"
          onClick={handleRetry}
          disabled={locked}
        >
          Intentar de nuevo
        </button>
        <button
          className="btn btn-primary"
          onClick={handleNext}
          disabled={locked}
        >
          Siguiente
        </button>
      </div>

      {feedback && <p className="mt-3 text-center">{feedback}</p>}
    </div>
  );
};

export default SequenceGame2;

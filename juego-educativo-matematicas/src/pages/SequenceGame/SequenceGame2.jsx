import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import image1 from "/images/sucesion1.png"; // Imagen del primer ejercicio
import image2 from "/images/sucesion2.png"; // Imagen del segundo ejercicio
import image3 from "/images/sucesion3.png"; // Imagen del tercer ejercicio
import '../../index.css';

const SequenceGame2 = () => {
  const navigate = useNavigate();

  // Ejercicios de la sucesión
  const exercises = [
    { image: image1, correctOperation: "SUMAR 35",texto:"35, 70, 105, 140, 175" },
    { image: image2, correctOperation: "RESTAR 15" ,texto:"105, 90, 75, 60, 45"},
    { image: image3, correctOperation: "DIVIDIR 2" ,texto:"80, 40, 20, 10, 5"},
  ];

  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedOperation, setSelectedOperation] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [allowNext, setAllowNext] = useState(false);

  const handleCheck = () => {
    const isCorrect =
      selectedOperation === exercises[currentExercise].correctOperation;
    setFeedback(
      isCorrect
        ? "¡Correcto! La operación es válida."
        : "Incorrecto. Recuerda para resolver una sucesión, debes encontrar la relación entre los números presentes, estos pueden ser de suma, resta, multiplicación o división. Inténtalo de nuevo."
    );
    setShowModal(true);
    setAllowNext(isCorrect);
  };

  const handleRetry = () => {
    setSelectedOperation("");
    setFeedback(null);
    setAllowNext(false);
    setShowModal(false);
  };

  const handleNextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      handleRetry();
    } else {
      navigate('/sequence-game-3'); 
    }
  };

  const operations = ["SUMAR 35", "RESTAR 15", "DIVIDIR 2", "MULTIPLICAR 2"];

  return (
    <div className={`container-fluid bg-default-game vh-100`}>
      <div className="container my-5">
        <h1 className="text-center"
        tabIndex={'0'}>
          ¿Qué operación permite que <br />la sucesión sea correcta?
        </h1>
        <div className="text-center my-4">
          <img
            src={exercises[currentExercise].image}
            alt={`La secuencia de ejercicio es ${exercises[currentExercise].texto}, identifique la operación que hace verdadera la sucesión`}
            style={{ width: "90%", maxWidth: "550px", height: "auto" }}
            tabIndex={'0'}
          />
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
        </div>

        {/* Modal de retroalimentación */}
        <Modal
          show={showModal}
          onHide={handleRetry}
          centered
          aria-labelledby="resultado-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="resultado-modal">Resultado</Modal.Title>
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
              {currentExercise < exercises.length - 1 ? "Siguiente ejercicio" : "Finalizar"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default SequenceGame2;

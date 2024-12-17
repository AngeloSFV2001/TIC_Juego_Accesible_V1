// src/pages/SequenceGame3.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SequenceGame3 = () => {
  const navigate = useNavigate();

  const sequences = [
    { id: 1, text: "1 → 2 → 4 → 7 → 11 → ?", correct: 12 },
    { id: 2, text: "1 ; 2 ; 4 ; 4 ; 7 ; 6 ; 10 ; 8 ; ?", correct: 16 },
    { id: 3, text: "1 → 6 → 3 → 8 → 5 → 10 → 7 → ?", correct: 43 },
    { id: 4, text: "15 ; 17 ; 22 ; 15 ; 29 ; 13 ; 36 ; 11 ; ?", correct: 13 },
  ];

  const answers = [
    { id: 1, value: 12 },
    { id: 2, value: 16 },
    { id: 3, value: 43 },
    { id: 4, value: 13 },
  ];

  const [selectedSequence, setSelectedSequence] = useState(null);
  const [pairs, setPairs] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [locked, setLocked] = useState(true);

  const handleSelectSequence = (sequenceId) => {
    setSelectedSequence(sequenceId);
    setFeedback(null);
  };

  const handleSelectAnswer = (answerId) => {
    if (selectedSequence) {
      setPairs((prevPairs) => {
        const updatedPairs = { ...prevPairs, [selectedSequence]: answerId };
        const uniqueAnswers = new Set(Object.values(updatedPairs));
        if (uniqueAnswers.size !== Object.values(updatedPairs).length) {
          setFeedback("Cada respuesta solo puede estar conectada a una sucesión.");
          return prevPairs;
        }
        setSelectedSequence(null);
        return updatedPairs;
      });
    }
  };

  const handleCheck = () => {
    const isCorrect = Object.entries(pairs).every(([sequenceId, answerId]) => {
      const sequence = sequences.find((seq) => seq.id === parseInt(sequenceId));
      const answer = answers.find((ans) => ans.id === answerId);
      return sequence.correct === answer.value;
    });

    if (isCorrect) {
      setFeedback("¡Correcto! Todas las respuestas son correctas.");
      setLocked(false);
    } else {
      setFeedback("Algunas respuestas son incorrectas. Intenta nuevamente.");
    }
  };

  const handleRetry = () => {
    setPairs({});
    setFeedback(null);
    setLocked(true);
  };

  const handleNext = () => {
    navigate("/sequence-summary"); // Redirige al resumen
  };

  return (
    <div className="container my-5">
      <h1>¿Encuentra la respuesta a cada sucesión y conéctala con una línea?</h1>
      <div className="row">
        <div className="col-md-6">
          {sequences.map((seq) => (
            <button
              key={seq.id}
              className={`btn btn-secondary mb-3 ${selectedSequence === seq.id ? "btn-info" : ""}`}
              onClick={() => handleSelectSequence(seq.id)}
            >
              {seq.text}
            </button>
          ))}
        </div>
        <div className="col-md-6">
          {answers.map((ans) => (
            <button
              key={ans.id}
              className={`btn btn-primary mb-3 ${
                Object.values(pairs).includes(ans.id) ? "btn-success" : ""
              }`}
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
        <button className="btn btn-success" onClick={handleCheck}>
          Comprobar
        </button>
        <button className="btn btn-primary ms-3" onClick={handleNext} disabled={locked}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default SequenceGame3;

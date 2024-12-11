import React from 'react';
//import { useGameStats } from '../context/GameStatsContext';

const Summary = () => {
  const { gameStats } = useGameStats();

  // Calcular tiempo promedio
  const averageTime = gameStats.length
    ? (gameStats.reduce((sum, stat) => sum + parseFloat(stat.time), 0) / gameStats.length).toFixed(2)
    : 0;

  return (
    <div className="container my-5">
      <h1 className="mb-4">Resumen de Juegos</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Operación</th>
            <th>Intentos</th>
            <th>Tiempo (s)</th>
          </tr>
        </thead>
        <tbody>
          {gameStats.map((stat, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{stat.operation}</td>
              <td>{stat.attempts}</td>
              <td>{stat.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className="mt-4">Tiempo Promedio: {averageTime} segundos</h3>
    </div>
  );
};

export default Summary;

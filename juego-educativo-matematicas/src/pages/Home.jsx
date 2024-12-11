// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-4">
            <Link to="/math-games" className="btn btn-primary w-100">
              <img src="/images/math.jpg" alt="Math Games" className="img-fluid" />
              <p>Operaciones Matemáticas</p>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to="/sequence-games" className="btn btn-primary w-100">
              <img src="/images/sequence.jpg" alt="Sequence Games" className="img-fluid" />
              <p>Sucesión</p>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to="/geometry-games" className="btn btn-primary w-100">
              <img src="/images/geometry.jpg" alt="Geometry Games" className="img-fluid" />
              <p>Geometría</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
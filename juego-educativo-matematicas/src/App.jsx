import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MathIntro from './pages/MathIntro';
import MathGame1 from './pages/MathGame1';
import MathGame2 from './pages/MathGame2';
import MathGame3 from './pages/MathGame3';
import MathGame4 from './pages/MathGame4';
import Summary from './pages/Summary';
import SequenceIntro from './pages/SequenceIntro';
import SequenceGame1 from './pages/SequenceGame1';

const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/math-games" element={<MathIntro />} />
            <Route path="/math-game-1" element={<MathGame1 />} />
            <Route path="/math-game-2" element={<MathGame2 />} />
            <Route path="/math-game-3" element={<MathGame3 />} />
            <Route path="/math-game-4" element={<MathGame4 />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/sequence-games" element={<SequenceIntro />} />
            <Route path="/sequence-game-1" element={<SequenceGame1 />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

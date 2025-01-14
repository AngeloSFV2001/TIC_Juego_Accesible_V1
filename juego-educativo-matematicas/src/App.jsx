import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Home2 from './pages/Home';
import MathIntro from './pages/MathGames/MathIntro1';
import MathIntro2 from './pages/MathGames/MathIntro2';
import MathIntro3 from './pages/MathGames/MathIntro3';
import MathIntro4 from './pages/MathGames/MathIntro4';
import MathGame1Suma from './pages/MathGames/MathGame1Sum';
import MathGame1Resta from './pages/MathGames/MathGame1Rest';
import MathGame2 from './pages/MathGames/MathGame2';
import MathGame3 from './pages/MathGames/MathGame3';
import SequenceIntro from './pages/SequenceGame/SequenceIntro';
import SequenceGame1 from './pages/SequenceGame/SequenceGame1';
import SequenceGame2 from './pages/SequenceGame/SequenceGame2';
import SequenceGame3 from './pages/SequenceGame/SequenceGame3';
import GeometryIntro from './pages/GeometryGames/GeometryIntro';
import GeometryGame1 from './pages/GeometryGames/GeometryGame1';
import GeometryGame2 from './pages/GeometryGames/GeometryGame2';
import GeometryGame3 from './pages/GeometryGames/GeometryGame3';

const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path={"/inicio"} element={<Home />} />
            <Route path={"/"} element={<Home2 />} />
            <Route path="/intro-suma" element={<MathIntro />} />
            <Route path="/suma" element={<MathGame1Suma />} />

            <Route path="/intro-resta" element={<MathIntro2 />} />
            <Route path="/resta" element={<MathGame1Resta />} />
            
            <Route path="/intro-multiplicación" element={<MathIntro3 />} />
            <Route path="/math-game-2" element={<MathGame2 />} />

            <Route path="/intro-división" element={<MathIntro4 />} />
            <Route path="/math-game-3" element={<MathGame3 />} />
            
            <Route path="/sequence-games" element={<SequenceIntro />} />
            <Route path="/sequence-game-1" element={<SequenceGame1 />} />
            <Route path="/sequence-game-2" element={<SequenceGame2 />} />
            <Route path="/sequence-game-3" element={<SequenceGame3 />} />

            <Route path="/intro-figuras" element={<GeometryIntro />} />
            <Route path="/juego-figuras-1" element={<GeometryGame1 />} />
            <Route path="/juego-figuras-2" element={<GeometryGame2 />} />
            <Route path="/juego-figuras-3" element={<GeometryGame3 />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

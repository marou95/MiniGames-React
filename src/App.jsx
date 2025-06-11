import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeartsBackground from './components/HeartsBackground';
import AccessCode from './components/AccessCode';
import RealAccessCode from './components/RealAccessCode';

import Game from './components/Game';
import ImageCarousel from './components/ImageCarousel';

const App = () => {
  return (
    <Router>
      <HeartsBackground />
      <Routes>
        <Route path="/" element={<AccessCode />} />
        <Route path="/game" element={<Game />} />
        <Route path="/carousel" element={<ImageCarousel />} />
        <Route path="/accesscode" element={<RealAccessCode/>} />
      </Routes>
    </Router>
  );
};

export default App;
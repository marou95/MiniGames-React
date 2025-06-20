import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AccessCode from './components/AccessCode';
import Game from './components/Game';
import RealAccessCode from './components/RealAccessCode';
import Carousel from './components/ImageCarousel';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AccessCode />} />
      <Route
        path="/game"
        element={
          <ProtectedRoute requireAuth>
            <Game />
          </ProtectedRoute>
        }
      />
      <Route
        path="/accesscode"
        element={
          <ProtectedRoute requireCompletion>
            <RealAccessCode />
          </ProtectedRoute>
        }
      />
      <Route
        path="/carousel"
        element={
          <ProtectedRoute requireFinalCode>
            <Carousel />
          </ProtectedRoute>
        }
      />        
    </Routes>
  </BrowserRouter>
);

export default App;
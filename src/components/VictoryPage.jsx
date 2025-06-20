import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

const VictoryPage = () => {
  const [letters, setLetters] = useState([]);
  const [showConfetti, setShowConfetti] = useState(true);

  // Charger les lettres et gérer les confettis
  useEffect(() => {
    const savedLetters = localStorage.getItem('letters');
    if (savedLetters) {
      setLetters(JSON.parse(savedLetters));
    }
    const timer = setTimeout(() => setShowConfetti(false), 15000);
    return () => clearTimeout(timer);
  }, []);

  // Réinitialiser le jeu
  const handleReplay = () => {
    localStorage.clear();
    localStorage.setItem('appInitialized', 'true');
    window.location.href = '/';
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full bg-[radial-gradient(circle_at_center,rgba(17,24,39,0.9)_0%,rgba(55,65,81,0.9)_100%)] font-mono text-white overflow-hidden">
      {/* Confettis */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          colors={['#3b82f6', '#ef4444', '#d1d5db']}
          numberOfPieces={100}
          recycle={false}
          className="absolute inset-0"
        />
      )}

      {/* Message de victoire */}
      <h1 className="text-2xl sm:text-3xl font-bold text-blue-400 mb-4 animate-pulse">
        Mission Accomplished!
      </h1>
      <p className="text-base sm:text-lg text-gray-300 mb-4 text-center max-w-[90%]">
        You've conquered all challenges!
      </p>

      {/* Animation de trophée */}
      <div className="relative w-20 h-20 mb-4">
        <div className="absolute inset-0 bg-blue-100 rounded-full opacity-20 animate-ping" />
        <div className="absolute inset-0 flex items-center justify-center text-4xl animate-bounce">
          🏆
        </div>
      </div>

      {/* Bouton Replay */}
      <button
        onClick={handleReplay}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors duration-200"
      >
        Replay
      </button>
    </div>
  );
};

export default VictoryPage;
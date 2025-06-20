import { useState, useEffect } from 'react';

const BombDefusal = ({ onComplete, onNext, letters, gameName, completed }) => {
  const colors = ['red', 'blue', 'green', 'yellow', 'black', 'white'];
  const colorClasses = {
    red: 'bg-red-500 border-red-600',
    blue: 'bg-blue-500 border-blue-600',
    green: 'bg-green-500 border-green-600',
    yellow: 'bg-yellow-500 border-yellow-600',
    black: 'bg-gray-900 border-gray-950',
    white: 'bg-gray-100 border-gray-300',
  };
  const [wires, setWires] = useState([]);
  const [cutWires, setCutWires] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60000); // 60 seconds in milliseconds
  const [gameState, setGameState] = useState('playing'); // 'playing', 'won', 'lost'
  const [serialNumber, setSerialNumber] = useState('');
  const [isCompleted, setIsCompleted] = useState(false); // État pour bouton Next

  // Générer un numéro de série aléatoire (longueur 3–8, dernier caractère un chiffre)
  const generateSerialNumber = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const digits = '0123456789';
    const length = Math.floor(Math.random() * 6) + 3; // 3 à 8
    let result = '';
    for (let i = 0; i < length - 1; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    // Dernier caractère est un chiffre
    result += digits.charAt(Math.floor(Math.random() * digits.length));
    console.log('Generated serial:', result, 'Length:', result.length, 'Parity:', result.length % 2 === 0 ? 'even' : 'odd'); // Debug
    return result;
  };

  // Générer des fils aléatoires
  const initializeWires = () => {
    const numWires = [3, 4, 5, 6][Math.floor(Math.random() * 4)]; // 3 à 6 fils
    const newWires = Array.from({ length: numWires }, () =>
      colors[Math.floor(Math.random() * colors.length)]
    );
    console.log('New wires generated:', newWires); // Débogage
    setWires(newWires);
    setCutWires([]);
    setTimeLeft(60000);
    setGameState('playing');
    setIsCompleted(false); // Désactiver bouton Next
    setSerialNumber(generateSerialNumber());
  };

  // Initialiser au montage
  useEffect(() => {
    initializeWires();
  }, []);

  // Gérer le timer
  useEffect(() => {
    if (gameState !== 'playing' || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 10) {
          setGameState('lost');
          clearInterval(timer);
          return 0;
        }
        return prev - 10;
      });
    }, 10); // Update every 10ms
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  // Formater le temps en hh:mm:ss:ms
  const formatTime = (ms) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor(ms % 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
  };

  // Compter les fils par couleur
  const getWireCounts = () => {
    return wires.reduce((acc, color) => ({ ...acc, [color]: (acc[color] || 0) + 1 }), {});
  };

  // Vérifier si la longueur du numéro de série est impaire
  const isSerialLengthOdd = () => {
    return serialNumber.length % 2 === 1; // True si longueur impaire (3, 5, 7)
  };

  // Déterminer le fil à couper
  const getNextWireToCut = () => {
    if (!wires.length || cutWires.length > 0) {
      console.log('No wires to cut or already cut'); // Débogage
      return -1;
    }
    const wireCounts = getWireCounts();
    const totalWires = wires.length;
    const lastWireIndex = totalWires - 1;

    console.log('Evaluating rules:', { wireCounts, totalWires, serialLength: serialNumber.length }); // Débogage

    if (totalWires === 3) {
      if (isSerialLengthOdd()) {
        const blueIndex = wires.indexOf('blue');
        if (blueIndex !== -1) {
          console.log('3 wires, Rule 1: Serial odd, cut first blue wire');
          return blueIndex;
        }
      }
      if (!wireCounts.red) {
        console.log('3 wires, Rule 2: No red, cut second wire');
        return 1;
      }
      console.log('3 wires, Rule 3: Default, cut last wire');
      return lastWireIndex;
    }

    if (totalWires === 4) {
      if (!isSerialLengthOdd() && wireCounts.red > 1) {
        const lastRedIndex = wires.lastIndexOf('red');
        console.log('4 wires, Rule 1: Serial even and >1 red, cut last red wire');
        return lastRedIndex;
      }
      if (wireCounts.yellow > 0) {
        const yellowIndex = wires.indexOf('yellow');
        console.log('4 wires, Rule 2: Yellow exists, cut first yellow wire');
        return yellowIndex;
      }
      console.log('4 wires, Rule 3: Default, cut first wire');
      return 0;
    }

    if (totalWires === 5) {
      if (isSerialLengthOdd() && wires[lastWireIndex] === 'black') {
        console.log('5 wires, Rule 1: Serial odd and last black, cut second wire');
        return 1;
      }
      if (wireCounts.green > 1) {
        const lastGreenIndex = wires.lastIndexOf('green');
        console.log('5 wires, Rule 2: >1 green, cut last green wire');
        return lastGreenIndex;
      }
      console.log('5 wires, Rule 3: Default, cut third wire');
      return 2;
    }

    if (totalWires === 6) {
      if (!isSerialLengthOdd() && !wireCounts.white) {
        console.log('6 wires, Rule 1: Serial even and no white, cut fourth wire');
        return 3;
      }
      if (wireCounts.blue > 1) {
        const blueIndex = wires.indexOf('blue');
        console.log('6 wires, Rule 2: >1 blue, cut first blue wire');
        return blueIndex;
      }
      console.log('6 wires, Rule 3: Default, cut last wire');
      return lastWireIndex;
    }

    console.log('No rule matched');
    return -1;
  };

  // Gérer la coupe d’un fil
  const handleCut = (index) => {
    if (gameState !== 'playing' || cutWires.includes(index)) return;

    const correctWireIndex = getNextWireToCut();
    console.log('Cutting wire:', index, 'Correct wire:', correctWireIndex); // Débogage

    if (correctWireIndex === -1) return; // Pas de fil à couper

    if (index === correctWireIndex) {
      const newCutWires = [...cutWires, index];
      setCutWires(newCutWires);
      console.log('Correct cut, new cutWires:', newCutWires);
      setGameState('won');
      setIsCompleted(true); // Activer bouton Next
      onComplete('Q'); // Passer la lettre 'Q'
    } else {
      console.log('Explosion: Incorrect wire cut');
      setGameState('lost');
    }
  };

  // Réessayer
  const handleRetry = () => {
    initializeWires();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[radial-gradient(circle_at_center,rgba(17,24,39,0.9)_0%,rgba(55,65,81,0.9)_100%)] font-mono">
      {/* Titre */}
      <h2 className="text-2xl font-bold font-stretch-expanded leading-none text-white md:text-2xl lg:text-2xl mb-6 p-4">
        💣 {gameName} 💣
      </h2>
      <div className="w-full md:w-full lg:w-full max-w-[90%] sm:max-w-2xl">
        {/* Boîtier de la bombe */}
        <div className={`bg-gradient-to-br from-gray-700 to-gray-900 border-4 border-gray-600 rounded-xl p-8 w-full max-w-md relative mx-auto ${gameState === 'lost' ? 'animate-shake' : ''}`}>
          {/* Vis aux coins */}
          <div className="absolute top-2 left-2 w-2 h-2 bg-gray-500 rounded-full"></div>
          <div className="absolute top-2 right-2 w-2 h-2 bg-gray-500 rounded-full"></div>
          <div className="absolute bottom-2 left-2 w-2 h-2 bg-gray-500 rounded-full"></div>
          <div className="absolute bottom-2 right-2 w-2 h-2 bg-gray-500 rounded-full"></div>

          {/* Numéro de série */}
          <div className="bg-gray-800 text-gray-300 font-mono text-lg p-2 rounded border border-gray-600 mb-4">
            Serial: {serialNumber}
          </div>

          {/* Timer à 7 segments */}
          <div className={`bg-gray-900 text-red-600 font-mono text-2xl p-2 rounded border border-gray-600 mb-4 ${timeLeft <= 10000 ? 'animate-pulse' : 'animate-blink'}`}>
            {formatTime(timeLeft)}
          </div>

          {/* Règles */}
          <div className="mb-6 bg-gray-700 text-gray-300 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-100 mb-2">Defusal Rules:</h3>
            <p className="mb-2 text-sm">Check if serial number length is odd (3,5,7) or even (4,6,8).</p>
            <ol className="list-decimal pl-5 text-xs space-y-1">
              <li><strong>3 Wires:</strong> Odd serial → cut first blue if exists. No red → cut 2nd. Else, cut last.</li>
              <li><strong>4 Wires:</strong> Even serial & >1 red → cut last red. Yellow exists → cut first yellow. Else, cut 1st.</li>
              <li><strong>5 Wires:</strong> Odd serial & last black → cut 2nd. >1 green → cut last green. Else, cut 3rd.</li>
              <li><strong>6 Wires:</strong> Even serial & no white → cut 4th. >1 blue → cut first blue. Else, cut last.</li>
            </ol>
          </div>

          {/* Fils */}
          <div className="flex flex-col gap-2 mb-6 bg-gray-800 p-4 rounded-lg">
            {!wires || wires.length === 0 ? (
              <div className="text-red-600">Loading wires...</div>
            ) : (
              wires.map((color, index) => (
                <button
                  key={index}
                  onClick={() => handleCut(index)}
                  className={`w-full max-w-[calc(100%-2rem)] h-4 ${colorClasses[color]} ${cutWires.includes(index) ? 'opacity-30 cursor-not-allowed' : 'hover:shadow-[0_0_8px_rgba(255,0,0,0.6)]'} transition-all duration-200 flex items-center justify-between pl-2 pr-4 text-sm ${color === 'white' ? 'text-gray-900' : 'text-white'} font-bold rounded bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(0,0,0,0.2)_2px,rgba(0,0,0,0.2)_4px)]`}
                  disabled={cutWires.includes(index) || gameState !== 'playing' || !wires}
                  title={`Wire ${index + 1}: ${color.charAt(0).toUpperCase() + color.slice(1)}`}
                >
                  <span> </span>
                  {!cutWires.includes(index) && gameState === 'playing' && (
                    <span className="text-lg">✂️</span>
                  )}
                </button>
              ))
            )}
          </div>

          {/* Résultat */}
          {gameState === 'won' && (
            <div className="text-green-600 font-bold text-lg mb-4">Bomb Defused! Access Granted.</div>
          )}
          {gameState === 'lost' && (
            <div className="text-red-600 font-bold text-lg mb-4">Bomb Exploded! Try Again.</div>
          )}
          {gameState === 'lost' && (
            <button
              onClick={handleRetry}
              className="w-full py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all duration-200"
            >
              Retry
            </button>
          )}
        </div>

        {/* Lettres collectées et bouton Next */}
        <div className="mt-6 flex flex-col items-center">
          {letters && letters.length > 0 && (
            <h3 className="text-xl text-gray-300 mb-4">
              Letters obtained: {letters.join('')}
            </h3>
          )}
          <button
            onClick={onNext}
            className={`px-6 py-3 mb-10 bg-gray-900 text-white rounded-lg font-semibold transition-all duration-200 ${isCompleted ? 'hover:bg-blue-600' : 'opacity-50 cursor-not-allowed'}`}
            disabled={!isCompleted}
          >
            Next
          </button>
        </div>
      </div>

      {/* Styles d'animation */}
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
        .animate-shake {
          animation: shake 0.3s;
        }
      `}</style>
    </div>
  );
};

export default BombDefusal;
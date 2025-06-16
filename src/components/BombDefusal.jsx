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
  const [timeLeft, setTimeLeft] = useState(60000); // 90 seconds in milliseconds
  const [gameState, setGameState] = useState('playing'); // 'playing', 'won', 'lost'
  const [attempts, setAttempts] = useState(0);

  // Générer des fils aléatoires
  const initializeWires = () => {
    const numWires = Math.floor(Math.random() * 5) + 2; // 2 à 6
    const newWires = Array.from({ length: numWires }, () =>
      colors[Math.floor(Math.random() * colors.length)]
    );
    console.log('New wires generated:', newWires); // Débogage
    setWires(newWires);
    setCutWires([]);
    setTimeLeft(60000);
    setGameState('playing');
    setAttempts((prev) => prev + 1);
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
  }, [gameState, timeLeft, attempts]);

  // Formater le temps en hh:mm:ss:ms
  const formatTime = (ms) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor(ms % 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
  };

  // Évaluer la règle à appliquer
  const getNextWireToCut = () => {
    if (!wires || !wires.length) {
      console.log('No wires available'); // Débogage
      return -1;
    }
    const wireCounts = wires.reduce(
      (acc, color) => ({ ...acc, [color]: (acc[color] || 0) + 1 }),
      {}
    );
    const totalWires = wires.length;

    console.log('Wire counts:', wireCounts, 'Total wires:', totalWires, 'Cut wires:', cutWires); // Débogage

    // Règle 1: Si exactement deux fils rouges, couper les deux fils rouges dans l’ordre
    if (wireCounts.red === 2) {
      const redIndices = wires
        .map((color, i) => (color === 'red' ? i : -1))
        .filter((i) => i !== -1);
      const nextRedIndex = redIndices.find((i) => !cutWires.includes(i));
      if (nextRedIndex !== undefined) {
        console.log('Rule 1 applied: Cut red wire at', nextRedIndex);
        return nextRedIndex;
      }
    }

    // Règle 2: S’il y a un fil bleu, couper le premier fil bleu
    if (wireCounts.blue > 0) {
      const firstBlueIndex = wires.findIndex((color) => color === 'blue');
      if (firstBlueIndex !== -1 && !cutWires.includes(firstBlueIndex)) {
        console.log('Rule 2 applied: Cut first blue wire at', firstBlueIndex);
        return firstBlueIndex;
      }
    }

    // Règle 3: Si nombre total de fils impair, couper le 3e fil
    if (totalWires % 2 === 1 && totalWires >= 3 && !cutWires.includes(2)) {
      console.log('Rule 3 applied: Cut third wire at 2');
      return 2;
    }

    // Règle 4: Par défaut, couper le 1er fil
    if (!cutWires.includes(0)) {
      console.log('Rule 4 applied: Cut first wire at 0');
      return 0;
    }

    console.log('No more wires to cut');
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

      // Vérifier si victoire
      const wireCounts = wires.reduce(
        (acc, color) => ({ ...acc, [color]: (acc[color] || 0) + 1 }),
        {}
      );
      const isRule1Active = wireCounts.red === 2;
      const isRule1Complete = isRule1Active && newCutWires.length === 2;
      const isOtherRuleComplete = !isRule1Active && newCutWires.length === 1;

      if (isRule1Complete || isOtherRuleComplete) {
        console.log('Victory: All required wires cut');
        setGameState('won');
        onComplete();
      }
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
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[radial-gradient(circle_at_center,rgba(03,10,19,0.7)_0%,#0a0a0a_70%)] font-mono">
      {/* Titre */}
      <h2 className="text-l font-bold leading-none tracking-tight text-white md:text-2xl lg:text-2xl mb-6 p-10">
        {/* mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900  dark:text-white */}
        Mini-Games Adventure : {gameName}
      </h2>
      <div className="w-full md:w-full lg:w-full max-w-[90%] sm:max-w-2xl">
        {/* Boîtier de la bombe */}
        <div className={`bg-gradient-to-br from-gray-700 to-gray-900 border-4 border-gray-600 rounded-xl p-8 w-full max-w-md relative mx-auto ${gameState === 'lost' ? 'animate-shake' : ''
          }`}>
          {/* Vis aux coins */}
          <div className="absolute top-2 left-2 w-2 h-2 bg-gray-500 rounded-full"></div>
          <div className="absolute top-2 right-2 w-2 h-2 bg-gray-500 rounded-full"></div>
          <div className="absolute bottom-2 left-2 w-2 h-2 bg-gray-500 rounded-full"></div>
          <div className="absolute bottom-2 right-2 w-2 h-2 bg-gray-500 rounded-full"></div>

          {/* Timer à 7 segments */}
          <div className={`bg-gray-900 text-red-600 font-mono text-2xl p-2 rounded border border-gray-600 mb-4 ${timeLeft <= 10000 ? 'animate-pulse' : 'animate-blink'
            }`}>
            {formatTime(timeLeft)}
          </div>

          {/* Règles */}
          <div className="mb-6 bg-gray-700 text-gray-300 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-100 mb-2">Defusal Rules:</h3>
            <ol className="list-decimal pl-5 text-sm space-y-1">
              <li>If exactly two red wires exist, cut both red wires in order (first, then second).</li>
              <li>If there is a blue wire, cut the first blue wire.</li>
              <li>If the total number of wires is odd, cut the third wire (if it exists).</li>
              <li>Otherwise, cut the first wire.</li>
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
                  className={`w-full max-w-[calc(100%-2rem)] h-4 ${colorClasses[color]} ${cutWires.includes(index) ? 'opacity-30 cursor-not-allowed' : 'hover:shadow-[0_0_8px_rgba(255,0,0,0.6)]'
                    } transition-all duration-200 flex items-center justify-between pl-2 pr-4 text-sm ${color === 'white' ? 'text-gray-900' : 'text-white'
                    } font-bold rounded bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(0,0,0,0.2)_2px,rgba(0,0,0,0.2)_4px)]`}
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
              Letters obtained: {letters.join("")}
            </h3>
          )}
          <button
            onClick={onNext}
            className={`px-6 py-3 mb-10 bg-gray-900 text-white rounded-lg font-semibold transition-all duration-200 ${completed ? 'hover:bg-blue-600' : 'opacity-50 cursor-not-allowed'
              }`}
            disabled={!completed}
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
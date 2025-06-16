import { useState, useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const Labyrinthe = ({ onComplete, onNext, letters, gameName, completed }) => {
  const grid = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1],
  ];

  const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 });
  const [gameOver, setGameOver] = useState(false);
  const [moveCount, setMoveCount] = useState(0);

  const handleKeyDown = (e) => {
    if (gameOver || completed) return;

    const { x, y } = playerPosition;
    let newX = x;
    let newY = y;

    switch (e.key) {
      case 'ArrowUp':
        newY = Math.max(y - 1, 0);
        e.preventDefault();
        break;
      case 'ArrowDown':
        newY = Math.min(y + 1, 14);
        e.preventDefault();
        break;
      case 'ArrowLeft':
        newX = Math.max(x - 1, 0);
        e.preventDefault();
        break;
      case 'ArrowRight':
        newX = Math.min(x + 1, 14);
        e.preventDefault();
        break;
      default:
        return;
    }

    if (grid[newY][newX] !== 1) {
      setPlayerPosition({ x: newX, y: newY });
      setMoveCount(moveCount + 1);

      if (grid[newY][newX] === 3) {
        setGameOver(true);
        onComplete();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerPosition, gameOver, completed]);

  const handleButtonClick = (direction) => {
    if (gameOver || completed) return;

    const { x, y } = playerPosition;
    let newX = x;
    let newY = y;

    switch (direction) {
      case 'up':
        newY = Math.max(y - 1, 0);
        break;
      case 'down':
        newY = Math.min(y + 1, 14);
        break;
      case 'left':
        newX = Math.max(x - 1, 0);
        break;
      case 'right':
        newX = Math.min(x + 1, 14);
        break;
      default:
        return;
    }

    if (grid[newY][newX] !== 1) {
      setPlayerPosition({ x: newX, y: newY });
      setMoveCount(moveCount + 1);

      if (grid[newY][newX] === 3) {
        setGameOver(true);
        onComplete();
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[linear-gradient(to_bottom,rgba(17,24,39,0.9),rgba(55,65,81,0.9))] bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22 viewBox=%220 0 100 100%22%3E%3Cpath d=%22M0 100 L100 0%22 stroke=%22rgba(255,255,255,0.05)%22 stroke-width=%221%22/%3E%3C/svg%3E')] bg-[length:100px_100px] font-mono">
      {/* Titre */}
      <h2 className="text-4xl font-extrabold text-white mt-12 mb-8 font-mono">
        Mini-Games Adventure: {gameName}
      </h2>
      <div className="bg-gray-900 border-4 border-gray-700 rounded-xl p-6 w-full max-w-md mx-auto flex flex-col items-center">
        <p className="text-gray-300 mb-4">Movements: {moveCount}</p>
        <div className="flex justify-center">
          <div className="border-4 border-gray-800 bg-gray-800 rounded-lg">
            {grid.map((row, y) => (
              <div key={y} className="flex">
                {row.map((cell, x) => (
                  <div
                    key={x}
                    className={`w-[28px] h-[28px] md:w-[20px] md:h-[20px] border border-gray-700 relative ${
                      cell === 1 ? 'bg-gray-600' : cell === 3 ? 'bg-gray-300' : 'bg-gray-800'
                    }`}
                  >
                    {playerPosition.x === x && playerPosition.y === y && (
                      <div
                        className="w-[20px] h-[20px] md:w-[14px] md:h-[14px] bg-blue-600 rounded-full absolute top-1 left-1 animate-bounce"
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center">
          <button
            onClick={() => handleButtonClick('up')}
            className="bg-gray-800 text-white px-4 py-2 m-1 rounded-md hover:bg-gray-700 transition-all duration-200"
          >
            ↑
          </button>
          <div className="flex">
            <button
              onClick={() => handleButtonClick('left')}
              className="bg-gray-800 text-white px-4 py-2 m-1 rounded-md hover:bg-gray-700 transition-all duration-200"
            >
              ←
            </button>
            <button
              onClick={() => handleButtonClick('right')}
              className="bg-gray-800 text-white px-4 py-2 m-1 rounded-md hover:bg-gray-700 transition-all duration-200"
            >
              →
            </button>
          </div>
          <button
            onClick={() => handleButtonClick('down')}
            className="bg-gray-800 text-white px-4 py-2 m-1 rounded-md hover:bg-gray-700 transition-all duration-200"
          >
            ↓
          </button>
        </div>
        {gameOver && (
          <p className="text-gray-300 mt-4">
            Congratulations! You found the exit in {moveCount} movements!
          </p>
        )}
      </div>
      {/* Lettres collectées et bouton Next */}
      <div className="mt-6 flex flex-col items-center mb-6">
        {letters && letters.length > 0 && (
          <h3 className="text-xl text-gray-300 mb-4 font-mono">
            Letters obtained: {letters.join('')}
          </h3>
        )}
        <button
          onClick={onNext}
          className={`px-6 py-3 bg-gray-900 text-white border border-gray-700 rounded-lg font-semibold transition-all duration-200 font-mono ${
            completed ? 'hover:bg-gray-700 hover:text-gray-300' : 'opacity-50 cursor-not-allowed'
          }`}
          disabled={!completed}
        >
          Next
        </button>
      </div>

      <style jsx>{`
        @keyframes bounce {
          from { transform: translateY(0); }
          to { transform: translateY(-3px); }
        }
      `}</style>
    </div>
  );
};

export default Labyrinthe;
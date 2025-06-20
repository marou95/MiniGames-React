import { useState, useEffect, useRef } from 'react';

// eslint-disable-next-line react/prop-types
const MemoryGame = ({ onComplete, onNext, letters, gameName, completed }) => {
  const cards = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta'];
  const [shuffledCards, setShuffledCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const hasCompleted = useRef(false);

  // Mélanger les cartes au démarrage
  useEffect(() => {
    const doubledCards = [...cards, ...cards];
    setShuffledCards(doubledCards.sort(() => Math.random() - 0.5));
  }, []);

  // Gérer le clic sur une carte
  const handleClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index) || completed) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [firstIndex, secondIndex] = newFlipped;
      if (shuffledCards[firstIndex] === shuffledCards[secondIndex]) {
        setMatched([...matched, firstIndex, secondIndex]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  // Vérifier si toutes les paires ont été trouvées
  useEffect(() => {
    if (matched.length === shuffledCards.length && shuffledCards.length > 0 && !hasCompleted.current) {
      hasCompleted.current = true;
      onComplete();
    }
  }, [matched, shuffledCards, onComplete]);

  return (
<div className="flex flex-col items-center justify-center min-h-screen w-full bg-[radial-gradient(circle_at_center,rgba(17,24,39,0.9)_0%,rgba(55,65,81,0.9)_100%)] font-mono">      <h2 className="text-2xl font-bold font-stretch-expanded leading-none  text-white md:text-2xl lg:text-2xl mb-6 p-4 ">
       🧩 {gameName} 🧩
      </h2>
      <div className="bg-gray-900 border-4 border-gray-700 rounded-xl p-6 w-full max-w-md mx-auto flex flex-col items-center">
        <div className="grid grid-cols-4 gap-2 justify-center mb-4">
          {shuffledCards.map((card, index) => (
            <div
              key={index}
              className={`w-20 h-20 sm:w-16 sm:h-16 flex items-center justify-center text-lg cursor-pointer border-2 border-gray-600 rounded-lg transition-transform duration-600 transform-style-preserve-3d relative ${
                flipped.includes(index) || matched.includes(index) ? 'rotate-y-180' : 'rotate-y-0'
              }`}
              onClick={() => handleClick(index)}
            >
              <div className="absolute w-full h-full flex items-center justify-center backface-hidden">
                <span className="text-gray-300 text-2xl">?</span>
              </div>
              <div className="absolute w-full h-full flex items-center justify-center backface-hidden bg-gray-700 text-white rotate-y-180">
                {card}
              </div>
            </div>
          ))}
        </div>
        {matched.length === shuffledCards.length && (
          <p className="text-gray-300 mt-4 text-sm">
            Well done! You have succeeded!
          </p>
        )}
      </div>
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
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-0 {
          transform: rotateY(0deg);
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default MemoryGame;
import { useState, useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const Cryptogramme = ({ onComplete, onNext, letters, gameName, completed }) => {
  const encodedMessage = "WKLV LV D WHVW"; // "THIS IS A TEST"
  const decodedMessage = "THIS IS A TEST";
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const [mapping, setMapping] = useState({});
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    const decoded = encodedMessage
      .split('')
      .map(char => mapping[char] || char)
      .join('');
    if (decoded === decodedMessage && !gameWon) {
      setGameWon(true);
      onComplete();
    }
  }, [mapping, gameWon, onComplete]);

  const handleSelect = (encodedChar, decodedChar) => {
    const isAlreadyMapped = Object.values(mapping).includes(decodedChar);
    if (isAlreadyMapped) {
      alert(`The letter "${decodedChar}" is already mapped to another character.`);
      return;
    }
    setMapping(prev => ({ ...prev, [encodedChar]: decodedChar }));
  };

  const isCorrect = (encodedChar, decodedChar) => {
    const positions = [];
    for (let i = 0; i < encodedMessage.length; i++) {
      if (encodedMessage[i] === encodedChar) {
        positions.push(i);
      }
    }
    return positions.every(pos => decodedMessage[pos] === decodedChar);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[linear-gradient(to_bottom,rgba(20,20,20,0.9),rgba(40,40,40,0.9))] bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2250%22 height=%2250%22 viewBox=%220 0 50 50%22%3E%3Cpath d=%22M0 50 Q25 25 50 50 T100 50%22 stroke=%22rgba(100,100,100,0.05)%22 stroke-width=%221%22 fill=%22none%22/%3E%3C/svg%3E')] bg-[length:50px_50px] font-mono">
      <h2 className="text-4xl font-extrabold text-gray-300 mt-12 mb-8 font-mono">
        Mini-Games Adventure: {gameName}
      </h2>
      <div className="bg-gray-900 border-4 border-gray-800 rounded-xl p-6 w-full max-w-md mx-auto flex flex-col items-center">
        <p className="text-gray-400 mb-4 text-sm">Decode the cryptic message to reveal the truth.</p>
        <div className="text-2xl font-mono bg-gray-800 text-gray-300 p-4 rounded-lg mb-4 inline-block">
          {encodedMessage.split('').map((char, index) => (
            <span
              key={index}
              className={`mx-1 ${mapping[char] && isCorrect(char, mapping[char]) ? 'text-red-500' : 'text-gray-300'}`}
            >
              {mapping[char] || char}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-6 gap-2 justify-center mb-4">
          {encodedMessage
            .split('')
            .filter((char, index, self) => alphabet.includes(char) && self.indexOf(char) === index)
            .map(encodedChar => (
              <div key={encodedChar} className="text-center">
                <div className="text-xl text-red-600 mb-1">{encodedChar}</div>
                <select
                  className={`p-1 rounded bg-gray-800 text-gray-300 border ${mapping[encodedChar] && isCorrect(encodedChar, mapping[encodedChar]) ? 'border-red-500' : 'border-gray-600'} cursor-pointer text-sm`}
                  onChange={(e) => handleSelect(encodedChar, e.target.value)}
                  value={mapping[encodedChar] || ''}
                  disabled={completed}
                >
                  <option value="">?</option>
                  {alphabet.split('').map(letter => (
                    <option
                      key={letter}
                      value={letter}
                      disabled={Object.values(mapping).includes(letter)}
                    >
                      {letter}
                    </option>
                  ))}
                </select>
              </div>
            ))}
        </div>
        {gameWon && (
          <p className="text-gray-400 mt-4 text-sm">
            Success! The message reads: {decodedMessage}
          </p>
        )}
      </div>
      <div className="mt-6 flex flex-col items-center mb-6">
        {letters && letters.length > 0 && (
          <h3 className="text-xl text-gray-400 mb-4 font-mono">
            Letters obtained: {letters.join('')}
          </h3>
        )}
        <button
          onClick={onNext}
          className={`px-6 py-3 bg-gray-900 text-gray-300 border border-gray-800 rounded-lg font-semibold transition-all duration-200 font-mono ${completed ? 'hover:bg-gray-800 hover:text-red-500' : 'opacity-50 cursor-not-allowed'}`}
          disabled={!completed}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Cryptogramme;
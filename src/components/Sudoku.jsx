import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const Sudoku = ({ onComplete, onNext, letters, gameName, completed }) => {
  // Grille initiale (4x4)
  const initialGrid = [
    [1, null, null, 4],
    [null, 4, 1, null],
    [null, 1, null, 3],
    [2, null, 4, null],
  ];

  const [grid, setGrid] = useState(initialGrid);
  const [error, setError] = useState('');

  // Vérifie si un chiffre est valide dans la grille
  const isValid = (row, col, num) => {
    // Vérifie la ligne
    for (let i = 0; i < 4; i++) {
      if (grid[row][i] === num && i !== col) return false;
    }

    // Vérifie la colonne
    for (let i = 0; i < 4; i++) {
      if (grid[i][col] === num && i !== row) return false;
    }

    // Vérifie le sous-carré 2x2
    const startRow = Math.floor(row / 2) * 2;
    const startCol = Math.floor(col / 2) * 2;
    for (let i = startRow; i < startRow + 2; i++) {
      for (let j = startCol; j < startCol + 2; j++) {
        if (grid[i][j] === num && (i !== row || j !== col)) return false;
      }
    }

    return true;
  };

  // Vérifie si la grille est complète et correcte
  const checkSolution = () => {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (grid[row][col] === null || !isValid(row, col, grid[row][col])) {
          return false; // La grille n'est pas complète ou contient des erreurs
        }
      }
    }
    // Si la grille est complète et correcte, déclenche la complétion
    if (!completed) {
      onComplete();
    }
  };

  // Gère le changement de valeur dans une cellule
  const handleChange = (row, col, value) => {
    const num = value === '' ? null : parseInt(value, 10);

    if (num !== null && (num < 1 || num > 4)) {
      setError('The number must be between 1 and 4.');
      return;
    }

    if (num !== null && !isValid(row, col, num)) {
      setError('This number does not follow the rules of Sudoku.');
      return;
    }

    setError(''); // Réinitialise l'erreur si tout est valide

    const newGrid = [...grid];
    newGrid[row][col] = num;
    setGrid(newGrid);

    checkSolution();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,20,0,0.9))] bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22%3E%3Ctext x=%220%22 y=%2215%22 font-size=%2212%22 fill=%22rgba(0,255,0,0.05)%22 font-family=%22monospace%22%3E01%3C/text%3E%3C/svg%3E')] bg-[length:20px_20px] font-mono">
      {/* Titre */}
      <h2 className="text-2xl font-bold font-stretch-expanded leading-none  text-white md:text-2xl lg:text-2xl mb-6 p-4 ">
        🔢 {gameName} 🔢
      </h2>
      <div className="bg-black border-4 border-green-700 rounded-xl p-8 w-full max-w-md mx-auto flex justify-center" style={{ boxShadow: '0 0 10px rgba(0,255,0,0.3)' }}>
        <div className="flex flex-col items-center border-2 border-green-800 p-2 rounded">
          {error && <p className="text-green-300 mb-4">{error}</p>}
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center">
              {row.map((cell, colIndex) => (
                <input
                  key={colIndex}
                  type="number"
                  min="1"
                  max="4"
                  value={cell || ''}
                  onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                  className={`w-10 h-10 text-center border border-green-800 text-lg font-mono ${initialGrid[rowIndex][colIndex] ? 'bg-gray-900 text-green-400 cursor-not-allowed' : 'bg-black text-green-500'
                    } focus:outline-none focus:ring-2 focus:ring-green-600 rounded-sm disabled:opacity-50`}
                  disabled={initialGrid[rowIndex][colIndex] !== null}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* Lettres collectées et bouton Next */}
      <div className="mt-6 flex flex-col items-center mb-6">
        {letters && letters.length > 0 && (
          <h3 className="text-xl text-green-300 mb-4 font-mono">
            Letters obtained: {letters.join("")}
          </h3>
        )}
        <button
          onClick={onNext}
          className={`px-6 py-3 bg-black text-green-500 border border-green-700 rounded-lg font-semibold transition-all duration-200 font-mono ${completed ? 'hover:bg-green-900 hover:text-green-300' : 'opacity-50 cursor-not-allowed'
            }`}
          disabled={!completed}
        >
          Next
        </button>
      </div>

      {/* Styles pour supprimer les flèches des inputs */}
      <style jsx>{`
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
          appearance: textfield;
        }
      `}</style>
    </div>
  );
};

export default Sudoku;
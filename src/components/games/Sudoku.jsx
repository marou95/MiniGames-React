import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const Sudoku = ({ onComplete, onNext, letters, gameName, completed }) => {
  // Grille initiale 9x9 (environ 40% de cases remplies pour une difficulté élevée)
  const initialGrid = [
    [5, 3, null, null, 7, null, null, null, null],
    [6, null, null, 1, 9, 5, null, null, null],
    [null, 9, 8, null, null, null, null, 6, null],
    [8, null, null, null, 6, null, null, null, 3],
    [4, null, null, 8, null, 3, null, null, 1],
    [7, null, null, null, 2, null, null, null, 6],
    [null, 6, null, null, null, null, 2, 8, null],
    [null, null, null, 4, 1, 9, null, null, 5],
    [null, null, null, null, 8, null, null, 7, 9],
  ];

  const [grid, setGrid] = useState(initialGrid);
  const [error, setError] = useState('');

  // Vérifie si un chiffre est valide dans la grille
  const isValid = (row, col, num) => {
    // Vérifie la ligne
    for (let i = 0; i < 9; i++) {
      if (grid[row][i] === num && i !== col) return false;
    }

    // Vérifie la colonne
    for (let i = 0; i < 9; i++) {
      if (grid[i][col] === num && i !== row) return false;
    }

    // Vérifie le sous-carré 3x3
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (grid[i][j] === num && (i !== row || j !== col)) return false;
      }
    }

    return true;
  };

  // Vérifie si la grille est complète et correcte
  const checkSolution = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
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

    if (num !== null && (num < 1 || num > 9)) {
      setError('The number must be between 1 and 9.');
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
      <h2 className="text-xl font-bold font-stretch-expanded leading-none text-white mb-4 p-4 sm:text-2xl">
        🔢 {gameName} 🔢
      </h2>
      <div className="bg-black border-4 border-green-700 rounded-xl p-4 w-full max-w-[90%] mx-auto flex justify-center" style={{ boxShadow: '0 0 10px rgba(0,255,0,0.3)' }}>
        <div className="flex flex-col items-center border-2 border-green-800 p-2 rounded">
          {error && <p className="text-base text-green-300 mb-2">{error}</p>}
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center">
              {row.map((cell, colIndex) => (
                <input
                  key={colIndex}
                  type="number"
                  min="1"
                  max="9"
                  value={cell || ''}
                  onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                  className={`w-8 h-8 text-center border border-green-800 text-base font-mono sm:w-9 sm:h-9 sm:text-lg ${
                    initialGrid[rowIndex][colIndex] ? 'bg-gray-900 text-green-400 cursor-not-allowed' : 'bg-black text-green-500'
                  } focus:outline-none focus:ring-2 focus:ring-green-600 rounded-sm disabled:opacity-50`}
                  disabled={initialGrid[rowIndex][colIndex] !== null}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* Lettres collectées et bouton Next */}
      <div className="mt-4 flex flex-col items-center mb-4">
        {letters && letters.length > 0 && (
          <h3 className="text-base text-green-300 mb-2 font-mono">
            Letters obtained: {letters.join(' ')}
          </h3>
        )}
        <button
          onClick={onNext}
          className={`px-6 py-2 bg-black text-green-500 border border-green-700 rounded-lg font-semibold text-sm transition-colors duration-200 font-mono ${
            completed ? 'hover:bg-green-900 hover:text-green-300' : 'opacity-50 cursor-not-allowed'
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
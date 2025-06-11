import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const Sudoku = ({ onComplete }) => {
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
    onComplete();
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
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Sudoku</h2>
      <p>Complete the grid to get the letter S.</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ display: 'inline-block', border: '2px solid #000', padding: '10px' }}>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex' }}>
            {row.map((cell, colIndex) => (
              <input
                key={colIndex}
                type="number"
                min="1"
                max="4"
                value={cell || ''}
                onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                style={{
                  width: '40px',
                  height: '40px',
                  textAlign: 'center',
                  border: '1px solid #ccc',
                  fontSize: '18px',
                  backgroundColor: initialGrid[rowIndex][colIndex] ? '#f0f0f0' : '#fff',
                  cursor: initialGrid[rowIndex][colIndex] ? 'not-allowed' : 'pointer',
                }}
                disabled={initialGrid[rowIndex][colIndex] !== null} // Désactive les cellules pré-remplies
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sudoku;
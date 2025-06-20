import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BombDefusal from './BombDefusal';
import Sudoku from './Sudoku';
import Labyrinthe from './Labyrinthe';
import MemoryGame from './MemoryGame';
import Cryptogramme from './Cryptogramme';

const Game = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(() => {
    const savedStep = localStorage.getItem('gameStep');
    return savedStep ? parseInt(savedStep, 10) : 1;
  });
  const [letters, setLetters] = useState(() => {
    const savedLetters = localStorage.getItem('gameLetters');
    return savedLetters ? JSON.parse(savedLetters) : [];
  });
  const [completedSteps, setCompletedSteps] = useState(() => {
    const savedCompleted = localStorage.getItem('completedSteps');
    return savedCompleted ? new Set(JSON.parse(savedCompleted)) : new Set();
  });

  const games = [
    { component: Sudoku, name: 'Sudoku', letter: 'Q' },
    { component: Labyrinthe, name: 'Maze Challenge', letter: 'U' },
    // { component: MemoryGame, name: 'Memory Challenge', letter:'E' },
    { component: Cryptogramme, name: 'Cipher Challenge', letter: 'S' },
    { component: BombDefusal, name: 'Bomb Defusal', letter: 'T' },

  ];

  useEffect(() => {
    localStorage.setItem('gameStep', step);
  }, [step]);

  useEffect(() => {
    localStorage.setItem('gameLetters', JSON.stringify(letters));
  }, [letters]);

  useEffect(() => {
    localStorage.setItem('completedSteps', JSON.stringify([...completedSteps]));
  }, [completedSteps]);

  const handleComplete = (letter) => {
    setLetters([...letters, letter]);
    setCompletedSteps(new Set([...completedSteps, step]));
  };

  const handleNext = () => {
    if (step < games.length) {
      setStep(step + 1);
    } else {
      localStorage.setItem('gamesCompleted', 'true');
      console.log('Navigating to /accesscode'); // Debug
      navigate('/accesscode');
    }
  };

  const CurrentGame = games[step - 1].component;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-900 font-mono">
      <CurrentGame
        onComplete={() => handleComplete(games[step - 1].letter)}
        onNext={handleNext}
        letters={letters}
        gameName={games[step - 1].name}
        completed={completedSteps.has(step)}
      />
    </div>
  );
};

export default Game;
import { useState } from "react";
import Sudoku from "./Sudoku";
import MemoryGame from "./MemoryGame";
import Cryptogramme from "./Cryptogramme";
import Labyrinthe from "./Labyrinthe";
import ImageCarousel from './ImageCarousel';
import BombDefusal from "./BombDefusal";

const Game = () => {
  const [step, setStep] = useState(1);
  const [letters, setLetters] = useState([]);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  // Fonction pour gérer la complétion d'un mini-jeu
  const handleComplete = (letter) => {
    if (!letters.includes(letter)) {
      setLetters([...letters, letter]);
    }
    setCompletedSteps(new Set(completedSteps).add(step));
  };

  // Fonction pour passer au mini-jeu suivant
  const handleNext = () => {
    console.log('Step:', step, 'Games length:', games.length);
    if (step < games.length) {
      setStep(step + 1);
    } else {
      navigate("/accesscode"); // Débloquer vers le vrai Access Code
    }
  };

  // Liste des mini-jeux avec leurs composants, lettres, et noms
  const games = [
    {
      component: (
        <BombDefusal
          onComplete={() => handleComplete('Q')}
          onNext={handleNext}
          letters={letters}
          gameName="Bomb Defusal"
          completed={completedSteps.has(1)}
        />
      ),
    },
    {
      component: (
        <Sudoku
          onComplete={() => handleComplete("U")}
          onNext={handleNext}
          letters={letters}
          gameName="Sudoku "
          completed={completedSteps.has(2)}
        />
      ),
    },
    {
      component: (
        <Labyrinthe
          onComplete={() => handleComplete("E")}
          onNext={handleNext}
          letters={letters}
          gameName="Maze Runner"
          completed={completedSteps.has(3)}
        />
      ),
    },
    {
      component: (
        <MemoryGame
          onComplete={() => handleComplete("S")}
          onNext={handleNext}
          letters={letters}
          gameName="Memory Match"
          completed={completedSteps.has(4)}
        />
      ),
    },
    {
      component: (
        <Cryptogramme
          onComplete={() => handleComplete("T")}
          onNext={handleNext}
          letters={letters}
          gameName="Code Breaker"
          completed={completedSteps.has(5)}
        />
      ),
    },
    {
      component: (
        <ImageCarousel/>
      ),
    },
  ];

  return (
    <div className="min-h-screen w-full bg-transparent">
      {games[step - 1].component}
    </div>
  );
};

export default Game;
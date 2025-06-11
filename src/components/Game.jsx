import { useState } from "react";
import Devinettes from "./Devinettes";
import Sudoku from "./Sudoku";
import MemoryGame from "./MemoryGame";
import Cryptogramme from "./Cryptogramme";
import Labyrinthe from "./Labyrinthe";
import ImageCarousel from './ImageCarousel'

const Game = () => {
  const [step, setStep] = useState(1);
  const [letters, setLetters] = useState([]);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  // Liste des mini-jeux avec leurs composants et leurs lettres respectives
  const games = [
    { component: <Devinettes onComplete={() => handleComplete('A')} /> },
    { component: <Sudoku onComplete={() => handleComplete("S")} /> },
    { component: <Labyrinthe onComplete={() => handleComplete("K")} /> },
    { component: <MemoryGame onComplete={() => handleComplete("I")} /> },
    { component: <Cryptogramme onComplete={() => handleComplete("M")} /> },
    { component: <ImageCarousel/> },
  ];

  // Fonction pour gérer la complétion d'un mini-jeu
  const handleComplete = (letter) => {
    if (!letters.includes(letter)) {
      setLetters([...letters, letter]);
    }
    setCompletedSteps(new Set(completedSteps).add(step)); // Ajoute l'étape actuelle comme complétée
  };

  const buttonEnabled = completedSteps.has(step);

  // Fonction pour passer au mini-jeu suivant
  const handleNext = () => {
    if (step < games.length) {
      setStep(step + 1);
    }
    // } else {
    //   navigate("/accesscode"); // Débloquer vers le vrai Access Code
    // }
  };

  // Style du bouton Next
  const buttonStyle = {
    padding: "10px 25px",
    fontSize: "14px",
    backgroundColor: "#ff69b4",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "15px",
    opacity: letters.length > 0 ? 1 : 0.5, // Opacité réduite si désactivé
    pointerEvents: letters.length > 0 ? "all" : "none", // Désactivé si aucune lettre n'est obtenue
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {/* On enlève le titre si on est a la dernière étape */}
      <h2> {games.length === step ? '' : `Askim's Love Adventure:  Chapter ${step}`}</h2>

      {games[step - 1].component}
      <div>
        {/* Afficher "Lettres obtenues" uniquement si des lettres ont été obtenues */}
        {letters.length > 0 && <h3>Letters obtained: {letters.join("")}</h3>}
        <button
          onClick={handleNext}
          style={{ ...buttonStyle, opacity: buttonEnabled ? 1 : 0.5 }}
          disabled={!buttonEnabled}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Game;

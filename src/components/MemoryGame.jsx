import { useState, useEffect, useRef } from 'react';

// eslint-disable-next-line react/prop-types
const MemoryGame = ({ onComplete }) => {
  const cards = ['Kusum', 'Bitanem', 'Yavrum', 'Hayatim', 'Gulum', 'Sultanim', 'Prensesim', 'Bebegim'];
  const [shuffledCards, setShuffledCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const hasCompleted = useRef(false);

  // Styles optimisés
  const styles = {
    container: {
      textAlign: 'center',
      marginTop: '20px',
    },
    card: {
      width: '100px',
      height: '100px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      cursor: 'pointer',
      border: '2px solid #ff69b4',
      borderRadius: '10px',
      transition: 'transform 0.6s',
      transformStyle: 'preserve-3d',
      position: 'relative',
      backgroundColor: '#fff',
    },
    cardContent: {
      position: 'absolute',
      backfaceVisibility: 'hidden',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 100px)',
      gap: '10px',
      justifyContent: 'center',
      margin: '20px 0',
    }
  };

  // Mélanger les cartes au démarrage
  useEffect(() => {
    const doubledCards = [...cards, ...cards];
    setShuffledCards(doubledCards.sort(() => Math.random() - 0.5));
  }, []);

  // Gérer le clic sur une carte
  const handleClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

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
      hasCompleted.current = true; // Marque le jeu comme terminé
      onComplete(); // Appelle onComplete pour signaler la réussite
    }
  }, [matched, shuffledCards, onComplete]);

  return (
    <div style={styles.container}>
      <h2>Love Memory Game</h2>
      <p>Find all the pairs to unlock the sequel</p>
      
      {/* Grille de cartes */}
      <div style={styles.grid}>
        {shuffledCards.map((card, index) => (
          <div
            key={index}
            style={{
              ...styles.card,
              transform: flipped.includes(index) || matched.includes(index) 
                ? 'rotateY(180deg)'
                : 'rotateY(0deg)'
            }}
            onClick={() => handleClick(index)}
          >
            {/* Face avant */}
            <div style={{ ...styles.cardContent, transform: 'rotateY(0deg)' }}>
              <span style={{ color: '#ff69b4' }}>?</span>
            </div>
            
            {/* Face arrière */}
            <div style={{ 
              ...styles.cardContent, 
              transform: 'rotateY(180deg)',
              color: '#fff',
              backgroundColor: '#ff69b4'
            }}>
              {card}
            </div>
          </div>
        ))}
      </div>

      {/* Message de réussite */}
      {matched.length === shuffledCards.length && (
        <p style={{ color: '#ff69b4', marginTop: '10px' }}>Well done ! You have succeeded!</p>
      )}
    </div>
  );
};

export default MemoryGame;
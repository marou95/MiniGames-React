import { useState, useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const Cryptogramme = ({ onComplete }) => {
  // Encrypted message using a substitution cipher
  const encodedMessage = "GXVK YXJ HXR KVKR"; // "LOVE YOU FOR EVER"
  const decodedMessage = "LOVE YOU FOR EVER"; // Message to decode
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // State to store the mapping between encrypted and decoded letters
  const [mapping, setMapping] = useState({});
  const [gameWon, setGameWon] = useState(false); // État pour gérer la réussite du jeu

  // Check if the message is fully decoded
  useEffect(() => {
    const decoded = encodedMessage
      .split('')
      .map(char => mapping[char] || char)
      .join('');
    if (decoded === decodedMessage) {
      setGameWon(true); // Marque le jeu comme terminé
      onComplete();
    }
  }, [mapping]);

  // Handle selecting a letter for an encrypted character
  const handleSelect = (encodedChar, decodedChar) => {
    // Ensure the decodedChar is not already mapped to another encodedChar
    const isAlreadyMapped = Object.values(mapping).includes(decodedChar);
    if (isAlreadyMapped) {
      alert(`The letter "${decodedChar}" is already mapped to another character.`);
      return;
    }
    setMapping(prev => ({ ...prev, [encodedChar]: decodedChar }));
  };

  // Frequency of letters in the encrypted message (for hints)
  const frequency = {};
  encodedMessage.split('').forEach(char => {
    if (alphabet.includes(char)) {
      frequency[char] = (frequency[char] || 0) + 1;
    }
  });

  // Function to check if a letter is correctly guessed
  const isCorrect = (encodedChar, decodedChar) => {
    // Find all positions of the encodedChar in the encodedMessage
    const positions = [];
    for (let i = 0; i < encodedMessage.length; i++) {
      if (encodedMessage[i] === encodedChar) {
        positions.push(i);
      }
    }
    // Check if all corresponding letters in the decodedMessage match the decodedChar
    return positions.every(pos => decodedMessage[pos] === decodedChar);
  };

  // Styles
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
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 100px)',
      gap: '10px',
      justifyContent: 'center',
      margin: '20px 0',
    },
    button: {
      padding: '10px 25px',
      fontSize: '14px',
      backgroundColor: '#ff69b4',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '20px',
      marginBottom:'200px',
      opacity: gameWon ? 1 : 0.5,
      pointerEvents: gameWon ? 'all' : 'none'
    }
  };

  return (
    <div style={styles.container}>
      <h2>Cryptogram Game</h2>
      <p>Decode the secret message by guessing the letter substitutions.</p>
      <p>The most frequent letters are often vowels (E, A, I, etc.).</p>

      {/* Display the encrypted message with decoded letters */}
      <div style={{ 
        fontSize: '24px', 
        margin: '20px 0', 
        fontFamily: 'monospace',
        backgroundColor: '#fff5f8',
        padding: '15px',
        borderRadius: '10px',
        display: 'inline-block'
      }}>
        {encodedMessage.split('').map((char, index) => (
          <span 
            key={index} 
            style={{ 
              margin: '0 3px',
              color: mapping[char] && isCorrect(char, mapping[char]) ? '#28a745' : '#000'
            }}
          >
            {mapping[char] || char}
          </span>
        ))}
      </div>

      {/* Frequency hints */}
      <div style={{ margin: '20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          {/* {Object.entries(frequency).map(([char, count]) => (
            <div key={char}>
              {char}: {count}
            </div>
          ))} */}
        </div>
      </div>

      {/* Interface for selecting letters */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(6, 50px)', 
        gap: '10px', 
        justifyContent: 'center',
        outline:'none',
        margin: '20px auto'
      }}>
        {encodedMessage.split('').filter((char, index, self) => 
          alphabet.includes(char) && self.indexOf(char) === index
        ).map(encodedChar => (
          <div key={encodedChar} style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '24px', 
              marginBottom: '5px',
              color: '#ff69b4'
            }}>
              {encodedChar}
            </div>
            <select
              style={{ 
                padding: '5px', 
                borderRadius: '5px', 
                border: `1px solid ${mapping[encodedChar] && isCorrect(encodedChar, mapping[encodedChar]) ? '#28a745' : '#ff69b4'}`,
                cursor: 'pointer'
              }}
              onChange={(e) => handleSelect(encodedChar, e.target.value)}
              value={mapping[encodedChar] || ''}
            >
              <option value="">?</option>
              {alphabet.split('').map(letter => (
                <option key={letter} value={letter} disabled={Object.values(mapping).includes(letter)}>
                  {letter}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>


      {gameWon && (
        <p style={{ color: '#ff69b4', marginTop: '10px' }}>
          Congratulations! You decoded the message: {decodedMessage}
        </p>
      )}
    </div>
  );
};

export default Cryptogramme;
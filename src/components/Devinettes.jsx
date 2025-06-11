import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const Devinettes = ({ onComplete }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.toLowerCase() === "tricky towers") {
      onComplete(); // Appelle onComplete pour signaler la réussite
    } else {
      alert("Try again !");
    }
  };

  // Styles
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      height: 'vh', // Utilisation de 100vh pour que l'élément prenne toute la hauteur de la page
      textAlign: 'center',
      marginTop: '20px',
    },
    input: {
      padding: '10px',
      fontSize: '16px',
      borderRadius: '5px',
      border: '1px solid #ff69b4',
      marginRight: '10px',
      outline: 'none',
    },
    button: {
      padding: '10px 25px',
      fontSize: '14px',
      backgroundColor: '#ff69b4',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '10px',
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={{ color: '#ff69b4', marginBottom: '20px' }}>Riddle of love</h2>
      <p>What is our favorite Switch game?</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Devinettes;

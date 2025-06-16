import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import hackingSound from './hacking-sound.mp3';
import ambienceMusic from './Void Ambience.mp3';
import morseSound from './morse.wav';

// Animations pour les mots flottants
const floatAnimation = keyframes`
  0% { transform: translateY(0); opacity: 0.6; }
  50% { transform: translateY(-10px); opacity: 1; }
  100% { transform: translateY(0); opacity: 0.6; }
`;

const glitchAnimation = keyframes`
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(2px, -2px); }
  60% { transform: translate(-2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #000;
  color: #0f0;
  font-family: 'Courier New', Courier, monospace;
  overflow: hidden;
  position: relative;
`;

const FloatingWords = styled.div`
  position: absolute;
  font-size: 1rem;
  color: #0f0;
  opacity: 0.7;
  animation: ${floatAnimation} 3s infinite ease-in-out;
  left: ${(props) => props.left}%;
  top: ${(props) => props.top}%;
`;

const MorseCode = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: black;
`;

const GlitchText = styled.h1`
  font-size: 1.5rem;
  margin: 10px 0;
  position: relative;
  animation: ${glitchAnimation} 1.5s infinite;
  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0.8;
    color: #0f0;
    background: transparent;
    clip: rect(0, 900px, 0, 0);
  }
  &::before {
    animation: ${glitchAnimation} 1s infinite;
    left: 2px;
    text-shadow: -2px 0 red;
  }
  &::after {
    animation: ${glitchAnimation} 1s infinite;
    left: -2px;
    text-shadow: 2px 0 blue;
  }
`;

const Input = styled.input`
  padding: 15px;
  font-size: 1.5rem;
  width: 380px;
  border: 2px solid #0f0;
  background: transparent;
  color: #0f0;
  border-radius: 5px;
  text-align: center;
  outline: none;
  font-family: 'Courier New', Courier, monospace;
  position: relative;
  z-index: 1;
  &::placeholder {
    color: rgba(0, 255, 0, 0.7);
  }
  &:focus {
    box-shadow: 0 0 10px #0f0;
  }
`;

const HackedMessage = styled.div`
  text-align: center;
  font-size: 1.5rem;
  line-height: 1.5;
  animation: ${glitchAnimation} 1s infinite;
`;

const AccessCode = () => {
  const [code, setCode] = useState('');
  const [hacked, setHacked] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const enableAudio = () => setCanPlay(true);
    document.addEventListener('click', enableAudio);
    document.addEventListener('keydown', enableAudio);

    return () => {
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('keydown', enableAudio);
    };
  }, []);

  useEffect(() => {
    if (canPlay) {
      const ambience = new Audio(ambienceMusic);
      ambience.loop = true;
      ambience.volume = 0.5;
      ambience.play();

      const morse = new Audio(morseSound);
      morse.loop = true;
      morse.volume = 0.3;
      morse.play();

      return () => {
        ambience.pause();
        ambience.currentTime = 0;
        morse.pause();
        morse.currentTime = 0;
      };
    }
  }, [canPlay]);

  useEffect(() => {
    if (hacked) {
      const audio = new Audio(hackingSound);
      audio.play();
    }
  }, [hacked]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code === 'ENTER THE MATRIX') {
      setHacked(true);
      setTimeout(() => {
        navigate('/game');
      }, 5000);
    } else {
      alert('Incorrect code!');
    }
  };

  // Utilisation de useMemo pour mémoriser les mots flottants
  const floatingWords = useMemo(() => {
    return [...Array(10)].map((_, i) => (
      <FloatingWords key={i} left={Math.random() * 100} top={Math.random() * 100}>
        {[
          'ENCRYPTING',
          'DECRYPTION',
          'FIREWALL_BYPASSED',
          'TRACING_DISABLED',
          '0101010101010101',
          'QUANTUM_ENCRYPTION',
          'ZERO_DAY_EXPLOIT',
          'ADVERSARIAL_MACHINE_LEARNING',
          'HOMOMORPHIC_ENCRYPTION',
          'SIDE_CHANNEL_ATTACK',
          'DIFFERENTIAL_PRIVACY',
          'BLOCKCHAIN_SHARDING',
          'POST_QUANTUM_CRYPTOGRAPHY',
          'NEURAL_CRYPTOGRAPHY',
          'BYZANTINE_FAULT_TOLERANCE',
          'ADVANCED_PERSISTENT_THREAT',
          'MEMORY_SCRAMBLING',
          'HONEYPOT_DEPLOYMENT',
          'SYBIL_ATTACK_MITIGATION',
          'FEDERATED_LEARNING_SECURITY'
        ][i % 20]}
      </FloatingWords>

    ));
  }, []);

  return (
    <Container>
      {floatingWords}
      <MorseCode>· -· - · ·-· / - ···· · / -- ·- - ·-· ·· -··-</MorseCode>
      {!hacked ? (
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter the secret code..."
            autoFocus
            background="black"
          />
        </form>
      ) : (
        <HackedMessage>
          <GlitchText data-text="SYSTEM HACKED">SYSTEM HACKED</GlitchText>
          <GlitchText data-text="Complete the 5 mini games to get the access">
            Solve the puzzles to regain control of the system
          </GlitchText>
        </HackedMessage>
      )}
    </Container>
  );
};

export default AccessCode;

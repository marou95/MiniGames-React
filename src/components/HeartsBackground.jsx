// import React from 'react';
import styled, { keyframes } from 'styled-components';

// Animation flottante + 3D
const float = keyframes`
  0% { transform: translateY(0) rotate(45deg) scale(1); }
  50% { transform: translateY(-20px) rotate(45deg) scale(1.1); }
  100% { transform: translateY(0) rotate(45deg) scale(1); }
`;

// Effet lumineux
const glow = keyframes`
  0% { filter: drop-shadow(0 0 5px #ff69b4); }
  50% { filter: drop-shadow(0 0 20px #ff1493); }
  100% { filter: drop-shadow(0 0 5px #ff69b4); }
`;

const Heart = styled.div`
  width: 20px;
  height: 20px;
  background-color: #ff69b4;
  position: absolute;
  transform: rotate(45deg);
  animation: ${float} 4s ease-in-out infinite, ${glow} 2s ease-in-out infinite;
  
  &::before, &::after {
    content: '';
    width: 20px;
    height: 20px;
    background-color: #ff69b4;
    border-radius: 50%;
    position: absolute;
  }
  
  &::before { top: -10px; left: 0; }
  &::after { top: 0; left: -10px; }
`;

const HeartsBackground = () => {
  return (
    <div style={{ position: 'fixed', width: '100%', height: '100%', pointerEvents: 'none', zIndex:0 }}>
      {[...Array(30)].map((_, i) => (
        <Heart
          key={i}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 1}s`,
            scale: `${0.5 + Math.random() * 0.5}`
          }}
        />
      ))}
    </div>
  );
};

export default HeartsBackground;
import styled, { keyframes } from 'styled-components';

const fall = keyframes`
  to {
    transform: translateY(100vh);
  }
`;

const MatrixContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
`;

const Column = styled.div`
  position: absolute;
  top: -100vh;
  left: ${({ left }) => left}%;
  width: 2px;
  height: 200vh;
  background: linear-gradient(to bottom, transparent, #0f0, transparent);
  animation: ${fall} ${({ duration }) => duration}s linear infinite;
`;

const MatrixEffect = () => {
  // eslint-disable-next-line no-unused-vars
  const columns = Array.from({ length: 50 }, (_, i) => ({
    left: Math.random() * 100,
    duration: 5 + Math.random() * 10,
  }));

  return (
    <MatrixContainer>
      {columns.map((col, i) => (
        <Column key={i} left={col.left} duration={col.duration} />
      ))}
    </MatrixContainer>
  );
};

export default MatrixEffect;
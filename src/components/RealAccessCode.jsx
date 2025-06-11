import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Container avec un fond girly
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(45deg, #ff9a9e, #fad0c4);
  color: #333;
  font-family: 'Courier New', Courier, monospace;
`;

// Input stylisé en rose
const Input = styled.input`
  padding: 15px;
  font-size: 20px;
  width: 320px;
  border: 2px solid #ff69b4;
  background: rgba(255, 255, 255, 0.8);
  color: #333;
  border-radius: 10px;
  text-align: center;
  outline: none;
  margin-bottom: 20px;
  &::placeholder {
    color: #ff69b4;
  }
  &:focus {
    box-shadow: 0 0 10px #ff69b4;
  }
`;

const AccessCode = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code === 'ASKIM') {
      navigate('/carousel');
    } else {
      alert('Incorrect code!');
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="🎀 Enter the secret code 🎀"
          maxLength="5"
          autoFocus
        />
      </form>
    </Container>
  );
};

export default AccessCode;

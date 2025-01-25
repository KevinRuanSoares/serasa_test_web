// src/styles/public/Login/index.ts
import styled from 'styled-components';

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #057C3D;
  font-family: 'Poppins', sans-serif;
`;

export const LoginCard = styled.div`
  background: #2c2c2c;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  text-align: center;
  position: relative;
`;

export const ProfileIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #3d3d3d;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid #057C3D;
`;

export const LoginForm = styled.form`
  margin-top: 2rem;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    color: #cccccc;
    text-align: left;
  }

  input {
    width: 100%;
    padding: 0.8rem;
    font-size: 0.95rem;
    border: 1px solid #444444;
    border-radius: 8px;
    background: #3d3d3d;
    color: #ffffff;
    outline: none;
    transition: all 0.3s;

    &:focus {
      border-color: #057C3D;
      box-shadow: 0 0 6px rgba(5, 124, 61, 0.5);
    }
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.9rem;
  font-size: 1.1rem;
  font-weight: bold;
  color: #ffffff;
  background: #057C3D;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #04562F;
    transform: translateY(-2px);
  }

  &:disabled {
    background: #444444;
    cursor: not-allowed;
  }
`;

export const FormFooter = styled.div`
  margin-top: 1rem;
  text-align: center;
  font-size: 0.85rem;
  color: #cccccc;

  a {
    color: #057C3D;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s;

    &:hover {
      color: #04562F;
    }
  }
`;

export const Title = styled.h1`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 1.8rem;
  color: #ffffff;
`;

export const TabSwitch = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 1rem;

  span {
    font-size: 1rem;
    font-weight: bold;
    color: #cccccc;
    margin: 0 1rem;
    cursor: pointer;
    transition: color 0.3s;

    &.active {
      color: #057C3D;
      border-bottom: 2px solid #057C3D;
    }

    &:hover {
      color: #057C3D;
    }
  }
`;

// Responsividade
export const ResponsiveContainer = styled.div`
  @media (max-width: 768px) {
    padding: 1rem;

    ${LoginCard} {
      padding: 2rem;
    }
  }
`;
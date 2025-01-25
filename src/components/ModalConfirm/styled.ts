// src/styles/public/Login/ModalConfirmAlert.ts
import styled from 'styled-components';

export const ModalConfirmAlertOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalConfirmAlertContainer = styled.div`
  background: #2c2c2c;
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  width: 90%;
  max-width: 400px;
  color: #ffffff;

  h2 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    color: #ffffff;
  }

  p {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    color: #cccccc;
  }

  .buttons {
    display: flex;
    justify-content: space-around;
    gap: 1rem;

    button {
      padding: 0.8rem 1.2rem;
      font-size: 1rem;
      color: #ffffff;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
    }

    .confirm {
      background: #057C3D;

      &:hover {
        background: #04562F;
      }
    }

    .cancel {
      background: #B22222;

      &:hover {
        background: #8B1A1A;
      }
    }
  }
`;
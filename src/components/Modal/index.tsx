// src/components/Modal/index.tsx
import React from 'react';
import { ModalOverlay, ModalContainer } from './styled';

interface ModalProps {
  title: string; // Modal title
  message: string; // Modal message
  onClose: () => void; // Function to close the modal
}

const Modal: React.FC<ModalProps> = ({ title, message, onClose }) => {
  return (
    <ModalOverlay>
      <ModalContainer>
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={onClose}>Fechar</button>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
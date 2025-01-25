// src/components/ModalConfirmAlert/index.tsx
import React from 'react';
import { ModalConfirmAlertOverlay, ModalConfirmAlertContainer } from './styled';

interface ModalConfirmAlertProps {
  title: string; // ModalConfirmAlert title
  message: string; // ModalConfirmAlert message
  onConfirm: () => void; // Function to handle confirmation
  onCancel: () => void; // Function to handle cancellation
}

const ModalConfirmAlert: React.FC<ModalConfirmAlertProps> = ({ title, message, onConfirm, onCancel }) => {
  return (
    <ModalConfirmAlertOverlay>
      <ModalConfirmAlertContainer>
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="buttons">
          <button className="confirm" onClick={onConfirm}>Confirmar</button>
          <button className="cancel" onClick={onCancel}>Cancelar</button>
        </div>
      </ModalConfirmAlertContainer>
    </ModalConfirmAlertOverlay>
  );
};

export default ModalConfirmAlert;
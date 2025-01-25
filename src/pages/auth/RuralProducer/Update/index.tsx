// src/pages/RuralProducerUpdate/index.tsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../../redux/store';
import { useNavigate } from "react-router-dom";
import TopBar from "../../../../components/TopBar";
import Sidebar from "../../../../components/Sidebar";
import {
  RuralProducerUpdateContainer,
  ContentArea,
  MainContent,
  ButtonContainer,
} from "./styles";
import { setCurrentPageTitle } from "../../../../redux/slices/themeSlice";
import { ProducerService } from "../../../../services/producers";
import Modal from "../../../../components/Modal";
import {
  FormContainer,
  FormField,
  FormInput,
  FormLabel,
  FormTitle,
} from "./styledForm";

const RuralProducerUpdate: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const userAuth = useSelector((state: IRootState) => state.auth);
  const token = userAuth.token;

  useEffect(() => {
    dispatch(setCurrentPageTitle({ title: "Editar Produtor Rural" }));
  }, [dispatch]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!cpfCnpj || !name) {
        setError("Todos os campos são obrigatórios.");
        return;
    }

    setLoading(true);

    try {
        if (!token) {
            setError("Usuário não autenticado.");
            return;
        }
        const producer = await ProducerService.createProducer({
            token,
            producer: {
                cpf_cnpj: cpfCnpj,
                name,
            },
        });

        if (producer) {
            setSuccessMessage("Produtor cadastrado com sucesso!");
            navigate("/rural-producer-list");
        }
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("An unknown error occurred.");
        }
    } finally {
        setLoading(false);
    }
  };

  return (
    <RuralProducerUpdateContainer>
      <Sidebar />
      <ContentArea>
        <TopBar />
        <MainContent>
          <FormContainer>
            <FormTitle>Editar Produtor Rural</FormTitle>
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            <form onSubmit={handleFormSubmit}>
              <FormField>
                <FormLabel htmlFor="cpfCnpj">CPF/CNPJ:</FormLabel>
                <FormInput
                  id="cpfCnpj"
                  type="text"
                  value={cpfCnpj}
                  onChange={(e) => setCpfCnpj(e.target.value)}
                  placeholder="Digite o CPF ou CNPJ"
                />
              </FormField>
              <FormField>
                <FormLabel htmlFor="name">Nome:</FormLabel>
                <FormInput
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Digite o nome"
                />
              </FormField>
              <ButtonContainer>
                <button type="submit" disabled={loading}>
                  {loading ? "Salvando..." : "Editar"}
                </button>
              </ButtonContainer>
            </form>
          </FormContainer>
        </MainContent>
      </ContentArea>
      {error && <Modal title="Ops!" message={error} onClose={() => setError(null)} />}
    </RuralProducerUpdateContainer>
  );
};

export default RuralProducerUpdate;
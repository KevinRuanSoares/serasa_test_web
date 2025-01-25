// src/pages/RuralProducerCreate/index.tsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../../redux/store';
import { useNavigate } from "react-router-dom";
import TopBar from "../../../../components/TopBar";
import Sidebar from "../../../../components/Sidebar";
import {
  RuralProducerListContainer,
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

const RuralProducerCreate: React.FC = () => {
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
    dispatch(setCurrentPageTitle({ title: "Cadastrar Produtor Rural" }));
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
        setError(err.message);
    } finally {
        setLoading(false);
    }
  };

  return (
    <RuralProducerListContainer>
      <Sidebar />
      <ContentArea>
        <TopBar />
        <MainContent>
          <FormContainer>
            <FormTitle>Cadastrar Produtor Rural</FormTitle>
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
                  {loading ? "Salvando..." : "Cadastrar"}
                </button>
              </ButtonContainer>
            </form>
          </FormContainer>
        </MainContent>
      </ContentArea>
      {error && <Modal title="Ops!" message={error} onClose={() => setError(null)} />}
    </RuralProducerListContainer>
  );
};

export default RuralProducerCreate;
// src/pages/FarmCreate/index.tsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../../redux/store";
import { useNavigate } from "react-router-dom";
import TopBar from "../../../../components/TopBar";
import Sidebar from "../../../../components/Sidebar";
import {
  FarmCreateContainer,
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

const FarmCreate: React.FC = () => {
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
    dispatch(setCurrentPageTitle({ title: "Cadastrar Fazenda" }));
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
        setSuccessMessage("Fazenda cadastrada com sucesso!");
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

  const handleCpfCnpjChange = (value: string) => {
    // Remove caracteres não numéricos
    const numericValue = value.replace(/\D/g, "");

    // Aplica máscara de CPF ou CNPJ
    let formattedValue = numericValue;
    if (numericValue.length <= 11) {
      // CPF: 000.000.000-00
      formattedValue = numericValue
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
      // CNPJ: 00.000.000/0000-00
      formattedValue = numericValue
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,4})$/, "$1/$2")
        .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    }

    setCpfCnpj(formattedValue);
  };

  return (
    <FarmCreateContainer>
      <Sidebar />
      <ContentArea>
        <TopBar />
        <MainContent>
          <FormContainer>
            <FormTitle>Cadastrar Fazenda</FormTitle>
            {successMessage && (
              <p style={{ color: "green" }}>{successMessage}</p>
            )}
            <form onSubmit={handleFormSubmit}>
              <FormField>
                <FormLabel htmlFor="cpfCnpj">CPF/CNPJ:</FormLabel>
                <FormInput
                  id="cpfCnpj"
                  type="text"
                  value={cpfCnpj}
                  onChange={(e) => handleCpfCnpjChange(e.target.value)}
                  placeholder="Digite o CPF ou CNPJ"
                  maxLength={18} // Limita o tamanho máximo da máscara
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
      {error && (
        <Modal
          title="Ops!"
          message={error}
          onClose={() => setError(null)}
        />
      )}
    </FarmCreateContainer>
  );
};

export default FarmCreate;
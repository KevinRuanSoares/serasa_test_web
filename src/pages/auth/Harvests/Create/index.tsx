import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../../redux/store";
import { useNavigate } from "react-router-dom";
import TopBar from "../../../../components/TopBar";
import Sidebar from "../../../../components/Sidebar";
import {
  HarvestsCreateContainer,
  ContentArea,
  MainContent,
  ButtonContainer,
} from "./styles";
import { setCurrentPageTitle } from "../../../../redux/slices/themeSlice";
import { HarvestService } from "../../../../services/harvests";
import Modal from "../../../../components/Modal";
import {
  FormContainer,
  FormField,
  FormInput,
  FormLabel,
  FormTitle,
  FormRow,
  FormSelect,
} from "./styledForm";

const HarvestsCreate: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [year, setYear] = useState("");
  const [farm, setFarm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const userAuth = useSelector((state: IRootState) => state.auth);
  const token = userAuth.token;

  useEffect(() => {
    dispatch(setCurrentPageTitle({ title: "Cadastrar Colheita" }));
  }, [dispatch]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!year || !farm) {
      setError("Os campos Ano e Fazenda são obrigatórios.");
      return;
    }

    setLoading(true);

    try {
      if (!token) {
        setError("Usuário não autenticado.");
        return;
      }

      const harvest = await HarvestService.createHarvest({
        token,
        harvest: { year, farm },
      });

      if (harvest) {
        setSuccessMessage("Colheita cadastrada com sucesso!");
        navigate("/harvest-list");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocorreu um erro desconhecido.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <HarvestsCreateContainer>
      <Sidebar />
      <ContentArea>
        <TopBar />
        <MainContent>
          <FormContainer>
            <FormTitle>Cadastrar Colheita</FormTitle>
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            <form onSubmit={handleFormSubmit}>
              <FormRow>
                <FormField>
                  <FormLabel htmlFor="year">Ano:</FormLabel>
                  <FormInput
                    id="year"
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="Digite o ano da colheita"
                  />
                </FormField>
              </FormRow>
              <FormRow>
                <FormField>
                  <FormLabel htmlFor="farm">Fazenda:</FormLabel>
                  <FormInput
                    id="farm"
                    type="text"
                    value={farm}
                    onChange={(e) => setFarm(e.target.value)}
                    placeholder="Digite o ID da fazenda"
                  />
                </FormField>
              </FormRow>
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
    </HarvestsCreateContainer>
  );
};

export default HarvestsCreate;
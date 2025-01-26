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
import { FarmService, Farm } from "../../../../services/farms";
import Modal from "../../../../components/Modal";
import {
  FormContainer,
  FormField,
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
  const [farms, setFarms] = useState<Farm[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const userAuth = useSelector((state: IRootState) => state.auth);
  const token = userAuth.token;

  // Define anos disponíveis
  const years = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() - i
  ).map((year) => year.toString());

  useEffect(() => {
    dispatch(setCurrentPageTitle({ title: "Cadastrar Colheita" }));
  }, [dispatch]);

  // Carrega fazendas ao montar o componente
  useEffect(() => {
    const fetchFarms = async () => {
      try {
        if (!token) {
          setError("Usuário não autenticado.");
          return;
        }

        const response = await FarmService.getFarms({ token });
        if (response) {
          setFarms(response.results);
        }
      } catch (err) {
        setError("Erro ao carregar as fazendas.");
      }
    };

    fetchFarms();
  }, [token]);

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
                  <FormSelect
                    id="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  >
                    <option value="" disabled>
                      Selecione o ano
                    </option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </FormSelect>
                </FormField>
              </FormRow>
              <FormRow>
                <FormField>
                  <FormLabel htmlFor="farm">Fazenda:</FormLabel>
                  <FormSelect
                    id="farm"
                    value={farm}
                    onChange={(e) => setFarm(e.target.value)}
                  >
                    <option value="" disabled>
                      Selecione a fazenda
                    </option>
                    {farms.map((farm) => (
                      <option key={farm.id} value={farm.id}>
                        {farm.name} - {farm.city}, {farm.state}
                      </option>
                    ))}
                  </FormSelect>
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
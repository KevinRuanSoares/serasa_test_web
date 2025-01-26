// src/pages/FarmUpdate/index.tsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../../redux/store";
import { useNavigate, useLocation } from "react-router-dom";
import TopBar from "../../../../components/TopBar";
import Sidebar from "../../../../components/Sidebar";
import {
  FarmUpdateContainer,
  ContentArea,
  MainContent,
  ButtonContainer,
} from "./styles";
import { setCurrentPageTitle } from "../../../../redux/slices/themeSlice";
import { FarmService } from "../../../../services/farms";
import { ProducerService, Producer } from "../../../../services/producers";
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

const FarmUpdate: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [farmId, setFarmId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [totalArea, setTotalArea] = useState("");
  const [arableArea, setArableArea] = useState("");
  const [vegetationArea, setVegetationArea] = useState("");
  const [producerId, setProducerId] = useState("");
  const [producers, setProducers] = useState<Producer[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const userAuth = useSelector((state: IRootState) => state.auth);
  const token = userAuth.token;

  useEffect(() => {
    dispatch(setCurrentPageTitle({ title: "Editar Fazenda" }));
  }, [dispatch]);


  useEffect(() => {
    const fetchProducers = async () => {
      if (!token) return;
      try {
        const response = await ProducerService.getProducers({ token });
        if (response && response.results) {
          setProducers(response.results);
        }
      } catch (err) {
        console.error("Erro ao buscar produtores:", err);
        setError("Erro ao carregar a lista de produtores.");
      }
    };

    fetchProducers();
  }, [token]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");
    if (id) {
      setFarmId(id);
    }
  }, [location.search]);

  useEffect(() => {
    if (!token || !farmId) return;

    const fetchFarm = async () => {
      try {
        const farm = await FarmService.getFarm({ token, id: farmId });
        if (farm) {
          setName(farm.name);
          setCity(farm.city);
          setState(farm.state);
          setTotalArea(farm.total_area.toString());
          setArableArea(farm.arable_area.toString());
          setVegetationArea(farm.vegetation_area.toString());
          setProducerId(farm.producer);
        }
      } catch (err) {
        setError("Erro ao carregar os dados da fazenda.");
      }
    };

    fetchFarm();
  }, [token, farmId]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!name || !city || !state || !totalArea || !arableArea || !vegetationArea || !producerId) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    setLoading(true);

    try {
      if (!token || !farmId) {
        setError("Usuário não autenticado ou ID da fazenda não informado.");
        return;
      }

      const updatedFarm = await FarmService.updateFarm({
        token,
        id: farmId,
        farm: {
          name,
          city,
          state,
          total_area: parseFloat(totalArea),
          arable_area: parseFloat(arableArea),
          vegetation_area: parseFloat(vegetationArea),
          producer: producerId,
        },
      });

      if (updatedFarm) {
        setSuccessMessage("Fazenda atualizada com sucesso!");
        navigate("/farm-list");
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
    <FarmUpdateContainer>
      <Sidebar />
      <ContentArea>
        <TopBar />
        <MainContent>
          <FormContainer>
            <FormTitle>Editar Fazenda</FormTitle>
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            <form onSubmit={handleFormSubmit}>
              <FormRow>
                <FormField>
                  <FormLabel htmlFor="name">Nome:</FormLabel>
                  <FormInput
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Digite o nome da fazenda"
                  />
                </FormField>
                <FormField>
                  <FormLabel htmlFor="city">Cidade:</FormLabel>
                  <FormInput
                    id="city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Digite a cidade"
                  />
                </FormField>
              </FormRow>
              <FormRow>
                <FormField>
                  <FormLabel htmlFor="state">Estado:</FormLabel>
                  <FormInput
                    id="state"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="Digite o estado"
                  />
                </FormField>
                <FormField>
                  <FormLabel htmlFor="totalArea">Área Total (ha):</FormLabel>
                  <FormInput
                    id="totalArea"
                    type="number"
                    value={totalArea}
                    onChange={(e) => setTotalArea(e.target.value)}
                    placeholder="Digite a área total"
                  />
                </FormField>
              </FormRow>
              <FormRow>
                <FormField>
                  <FormLabel htmlFor="arableArea">Área Agricultável (ha):</FormLabel>
                  <FormInput
                    id="arableArea"
                    type="number"
                    value={arableArea}
                    onChange={(e) => setArableArea(e.target.value)}
                    placeholder="Digite a área agricultável"
                  />
                </FormField>
                <FormField>
                  <FormLabel htmlFor="vegetationArea">Área de Vegetação (ha):</FormLabel>
                  <FormInput
                    id="vegetationArea"
                    type="number"
                    value={vegetationArea}
                    onChange={(e) => setVegetationArea(e.target.value)}
                    placeholder="Digite a área de vegetação"
                  />
                </FormField>
              </FormRow>
              <FormRow>
                <FormField>
                  <FormLabel htmlFor="producerId">Produtor:</FormLabel>
                  <FormSelect
                    id="producerId"
                    value={producerId}
                    onChange={(e) => setProducerId(e.target.value)}
                  >
                    <option value="">Selecione um produtor</option>
                    {producers.map((producer) => (
                      <option key={producer.id} value={producer.id}>
                        {producer.name} - {producer.cpf_cnpj}
                      </option>
                    ))}
                  </FormSelect>
                </FormField>
              </FormRow>
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
    </FarmUpdateContainer>
  );
};

export default FarmUpdate;
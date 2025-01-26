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
import { FarmService } from "../../../../services/farms";
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
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [totalArea, setTotalArea] = useState("");
  const [arableArea, setArableArea] = useState("");
  const [vegetationArea, setVegetationArea] = useState("");
  const [producerId, setProducerId] = useState("");
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

    if (!name || !city || !state || !totalArea || !arableArea || !vegetationArea || !producerId) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    setLoading(true);

    try {
      if (!token) {
        setError("Usuário não autenticado.");
        return;
      }

      const farm = await FarmService.createFarm({
        token,
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

      if (farm) {
        setSuccessMessage("Fazenda cadastrada com sucesso!");
        navigate("/farm-list");
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
    <FarmCreateContainer>
      <Sidebar />
      <ContentArea>
        <TopBar />
        <MainContent>
          <FormContainer>
            <FormTitle>Cadastrar Fazenda</FormTitle>
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            <form onSubmit={handleFormSubmit}>
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
              <FormField>
                <FormLabel htmlFor="producerId">ID do Produtor:</FormLabel>
                <FormInput
                  id="producerId"
                  type="text"
                  value={producerId}
                  onChange={(e) => setProducerId(e.target.value)}
                  placeholder="Digite o ID do produtor"
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
    </FarmCreateContainer>
  );
};

export default FarmCreate;
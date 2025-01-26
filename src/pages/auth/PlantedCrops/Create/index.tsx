import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../../redux/store";
import { useNavigate } from "react-router-dom";
import TopBar from "../../../../components/TopBar";
import Sidebar from "../../../../components/Sidebar";
import {
  PlantedCropsCreateContainer,
  ContentArea,
  MainContent,
  ButtonContainer,
} from "./styles";
import { setCurrentPageTitle } from "../../../../redux/slices/themeSlice";
import { PlantedCropService } from "../../../../services/planted_crops";
import { HarvestService, Harvest } from "../../../../services/harvests";
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

const PlantedCropsCreate: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [harvest, setHarvest] = useState("");
  const [crop, setCrop] = useState("");
  const [harvests, setHarvests] = useState<Harvest[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const userAuth = useSelector((state: IRootState) => state.auth);
  const token = userAuth.token;

  // Define culturas disponíveis
  const crops = [
    { id: "corn", name: "Corn" },
    { id: "soybean", name: "Soybean" },
    { id: "wheat", name: "Wheat" },
  ];

  useEffect(() => {
    dispatch(setCurrentPageTitle({ title: "Cadastrar Cultura Plantada" }));
  }, [dispatch]);

  // Carrega colheitas ao montar o componente
  useEffect(() => {
    const fetchHarvests = async () => {
      try {
        if (!token) {
          setError("Usuário não autenticado.");
          return;
        }

        const response = await HarvestService.getHarvests({ token });
        if (response) {
          setHarvests(response.results);
        }
      } catch (err) {
        setError("Erro ao carregar as colheitas.");
      }
    };

    fetchHarvests();
  }, [token]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!harvest || !crop) {
      setError("Os campos Colheita e Cultura são obrigatórios.");
      return;
    }

    setLoading(true);

    try {
      if (!token) {
        setError("Usuário não autenticado.");
        return;
      }

      const plantedCrop = await PlantedCropService.createPlantedCrop({
        token,
        plantedCrop: { harvest, crop },
      });

      if (plantedCrop) {
        setSuccessMessage("Cultura plantada cadastrada com sucesso!");
        navigate("/planted-crop-list");
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
    <PlantedCropsCreateContainer>
      <Sidebar />
      <ContentArea>
        <TopBar />
        <MainContent>
          <FormContainer>
            <FormTitle>Cadastrar Cultura Plantada</FormTitle>
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            <form onSubmit={handleFormSubmit}>
              <FormRow>
                <FormField>
                  <FormLabel htmlFor="harvest">Colheita:</FormLabel>
                  <FormSelect
                    id="harvest"
                    value={harvest}
                    onChange={(e) => setHarvest(e.target.value)}
                  >
                    <option value="" disabled>
                      Selecione a colheita
                    </option>
                    {harvests.map((harvest) => (
                      <option key={harvest.id} value={harvest.id}>
                        {harvest.year} - {harvest.farm_name}
                      </option>
                    ))}
                  </FormSelect>
                </FormField>
              </FormRow>
              <FormRow>
                <FormField>
                  <FormLabel htmlFor="crop">Cultura:</FormLabel>
                  <FormSelect
                    id="crop"
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                  >
                    <option value="" disabled>
                      Selecione a cultura
                    </option>
                    {crops.map((crop) => (
                      <option key={crop.id} value={crop.id}>
                        {crop.name}
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
    </PlantedCropsCreateContainer>
  );
};

export default PlantedCropsCreate;
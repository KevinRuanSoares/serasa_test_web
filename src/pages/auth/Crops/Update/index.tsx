import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../../redux/store";
import { useNavigate, useLocation } from "react-router-dom";
import TopBar from "../../../../components/TopBar";
import Sidebar from "../../../../components/Sidebar";
import {
  CropUpdateContainer,
  ContentArea,
  MainContent,
  ButtonContainer,
} from "./styles";
import { setCurrentPageTitle } from "../../../../redux/slices/themeSlice";
import { CropService } from "../../../../services/crops";
import Modal from "../../../../components/Modal";
import {
  FormContainer,
  FormField,
  FormInput,
  FormLabel,
  FormTitle,
  FormRow,
} from "./styledForm";

const CropUpdate: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [cropId, setCropId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const userAuth = useSelector((state: IRootState) => state.auth);
  const token = userAuth.token;

  useEffect(() => {
    dispatch(setCurrentPageTitle({ title: "Editar Cultura" }));
  }, [dispatch]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");
    if (id) {
      setCropId(id);
    }
  }, [location.search]);

  useEffect(() => {
    if (!token || !cropId) return;

    const fetchCrop = async () => {
      try {
        const crop = await CropService.getCrop({ token, id: cropId });
        if (crop) {
          setName(crop.name);
        }
      } catch (err) {
        setError("Erro ao carregar os dados da cultura.");
      }
    };

    fetchCrop();
  }, [token, cropId]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!name) {
      setError("O campo nome é obrigatório.");
      return;
    }

    setLoading(true);

    try {
      if (!token || !cropId) {
        setError("Usuário não autenticado ou ID da cultura não informado.");
        return;
      }

      const updatedCrop = await CropService.updateCrop({
        token,
        id: cropId,
        crop: { name },
      });

      if (updatedCrop) {
        setSuccessMessage("Cultura atualizada com sucesso!");
        navigate("/crop-list");
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
    <CropUpdateContainer>
      <Sidebar />
      <ContentArea>
        <TopBar />
        <MainContent>
          <FormContainer>
            <FormTitle>Editar Cultura</FormTitle>
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            <form onSubmit={handleFormSubmit}>
              <FormRow>
                <FormField>
                  <FormLabel htmlFor="name">Nome da Cultura:</FormLabel>
                  <FormInput
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Digite o nome da cultura"
                  />
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
    </CropUpdateContainer>
  );
};

export default CropUpdate;

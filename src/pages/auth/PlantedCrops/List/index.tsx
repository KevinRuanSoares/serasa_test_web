import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../../redux/store";
import { useNavigate } from "react-router-dom";
import TopBar from "../../../../components/TopBar";
import Sidebar from "../../../../components/Sidebar";
import { Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { setCurrentPageTitle } from "../../../../redux/slices/themeSlice";
import {
  PlantedCropsListContainer,
  ContentArea,
  MainContent,
  PaginationContainer,
  ButtonContainer,
} from "./styles";
import GenericTable from "../../../../components/GenericTable";
import { PlantedCropService } from "../../../../services/planted_crops";
import Modal from "../../../../components/Modal";
import ModalConfirmAlert from "../../../../components/ModalConfirm";

interface PlantedCrop {
  id: string;
  harvest: string;
  crop: string;
  crop_name: string;
  harvest_year: string;
  farm_name: string;
  created_at: string;
  updated_at: string;
}

interface PaginationData {
  count: number;
  next: string | null;
  previous: string | null;
}

const PlantedCropsList: React.FC = () => {
  const dispatch = useDispatch();
  const [plantedCrops, setPlantedCrops] = useState<PlantedCrop[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginationData, setPaginationData] = useState<PaginationData>({
    count: 0,
    next: null,
    previous: null,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Generic Modal
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const closeModal = () => setShowModal(false);

  // Confirm Modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmModalMessage, setConfirmModalMessage] = useState("");
  const [confirmModalTitle, setConfirmModalTitle] = useState("");
  const [deletePlantedCropId, setDeletePlantedCropId] = useState<string | null>(null);

  const userAuth = useSelector((state: IRootState) => state.auth);
  const token = userAuth.token;

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setCurrentPageTitle({ title: "Culturas Plantadas" }));
  }, [dispatch]);

  useEffect(() => {
    fetchPlantedCrops(currentPage);
  }, [currentPage]);

  const fetchPlantedCrops = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      if (!token) {
        handleShowModal("Ops!", "Usuário não autenticado.");
        return;
      }

      const data = await PlantedCropService.getPlantedCrops({
        token,
        filters: { page },
      });

      if (data) {
        setPlantedCrops(data.results);
        setPaginationData({
          count: data.count,
          next: data.next,
          previous: data.previous,
        });
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleShowModal = (title: string, message: string) => {
    setModalTitle(title);
    setModalMessage(message);
    setShowModal(true);
  };

  const handleShowConfirmModal = (title: string, message: string, id?: string) => {
    setConfirmModalTitle(title);
    setConfirmModalMessage(message);
    if (id) setDeletePlantedCropId(id);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!token || !deletePlantedCropId) {
      handleShowModal("Ops!", "Usuário não autenticado.");
      return;
    }

    const success = await PlantedCropService.deletePlantedCrop({
      token,
      id: deletePlantedCropId,
    });
    if (success) {
      handleShowModal("Sucesso", "Cultura plantada excluída com sucesso.");
      fetchPlantedCrops(currentPage);
    } else {
      handleShowModal("Ops!", "Falha ao excluir a cultura plantada.");
    }
    setDeletePlantedCropId(null);
    setShowConfirmModal(false);
  };

  const handlePageChange = (direction: "next" | "previous") => {
    if (direction === "next" && paginationData.next) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "previous" && paginationData.previous) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleCreate = async () => {
    navigate("/planted-crop-create");
  };

  const handleEdit = async (id: string) => {
    navigate(`/planted-crop-update?id=${id}`);
  };

  const columns: {
    header: string;
    accessor: keyof PlantedCrop;
    render?: (value: any) => string;
  }[] = [
    { header: "Cultura", accessor: "crop_name" },
    { header: "Ano da Colheita", accessor: "harvest_year" },
    { header: "Fazenda", accessor: "farm_name" },
    {
      header: "Criado",
      accessor: "created_at",
      render: (value: string) => new Date(value).toLocaleString(),
    },
    {
      header: "Atualizado",
      accessor: "updated_at",
      render: (value: string) => new Date(value).toLocaleString(),
    },
  ];

  return (
    <PlantedCropsListContainer>
      <Sidebar />
      <ContentArea>
        <TopBar />
        <MainContent>
          <ButtonContainer>
            <button onClick={handleCreate}>+ Cadastrar Cultura Plantada</button>
          </ButtonContainer>
          {loading && <p>Carregando...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <GenericTable
            data={plantedCrops}
            columns={columns}
            edit={(row) => (
              <button className="edit" onClick={() => handleEdit(row.id)}>
                <Pencil size={20} />
              </button>
            )}
            remove={(row) => (
              <button
                className="delete"
                onClick={() =>
                  handleShowConfirmModal(
                    "Confirmar Exclusão",
                    "Tem certeza de que deseja excluir esta cultura plantada?",
                    row.id
                  )
                }
              >
                <Trash2 size={20} />
              </button>
            )}
          />
          <PaginationContainer>
            <button
              onClick={() => handlePageChange("previous")}
              disabled={!paginationData.previous}
            >
              <ChevronLeft size={20} />
            </button>
            <span>Página {currentPage}</span>
            <button
              onClick={() => handlePageChange("next")}
              disabled={!paginationData.next}
            >
              <ChevronRight size={20} />
            </button>
          </PaginationContainer>
        </MainContent>
      </ContentArea>

      {showModal && (
        <Modal title={modalTitle} message={modalMessage} onClose={closeModal} />
      )}

      {showConfirmModal && (
        <ModalConfirmAlert
          title={confirmModalTitle}
          message={confirmModalMessage}
          onConfirm={handleConfirmDelete}
          onCancel={() => {
            setDeletePlantedCropId(null);
            setShowConfirmModal(false);
          }}
        />
      )}
    </PlantedCropsListContainer>
  );
};

export default PlantedCropsList;
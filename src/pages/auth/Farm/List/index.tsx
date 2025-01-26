import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../../redux/store";
import { useNavigate } from "react-router-dom";
import TopBar from "../../../../components/TopBar";
import Sidebar from "../../../../components/Sidebar";
import { Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { setCurrentPageTitle } from "../../../../redux/slices/themeSlice";
import {
  FarmListContainer,
  ContentArea,
  MainContent,
  PaginationContainer,
  ButtonContainer,
} from "./styles";
import GenericTable from "../../../../components/GenericTable";
import { FarmService } from "../../../../services/farms";
import Modal from "../../../../components/Modal";
import ModalConfirmAlert from "../../../../components/ModalConfirm";

interface Farm {
  id: string;
  name: string;
  city: string;
  state: string;
  total_area: number;
  arable_area: number;
  vegetation_area: number;
  producer_name: string;
  created_at: string;
  updated_at: string;
}

interface PaginationData {
  count: number;
  next: string | null;
  previous: string | null;
}

const FarmList: React.FC = () => {
  const dispatch = useDispatch();
  const [farms, setFarms] = useState<Farm[]>([]);
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
  const [deleteFarmId, setDeleteFarmId] = useState<string | null>(null);

  const userAuth = useSelector((state: IRootState) => state.auth);
  const token = userAuth.token;

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setCurrentPageTitle({ title: "Fazendas" }));
  }, [dispatch]);

  useEffect(() => {
    fetchFarms(currentPage);
  }, [currentPage]);

  const fetchFarms = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      if (!token) {
        handleShowModal("Ops!", "Usuário não autenticado.");
        return;
      }

      const data = await FarmService.getFarms({
        token,
        filters: { page },
      });

      if (data) {
        setFarms(data.results);
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
    if (id) setDeleteFarmId(id);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!token || !deleteFarmId) {
      handleShowModal("Ops!", "Usuário não autenticado.");
      return;
    }

    const success = await FarmService.deleteFarm({ token, id: deleteFarmId });
    if (success) {
      handleShowModal("Sucesso", "Fazenda excluída com sucesso.");
      fetchFarms(currentPage);
    } else {
      handleShowModal("Ops!", "Falha ao excluir a fazenda.");
    }
    setDeleteFarmId(null);
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
    navigate("/farm-create");
  };

  const handleEdit = async (id: string) => {
    navigate(`/farm-update?id=${id}`);
  };

  const columns: { header: string; accessor: keyof Farm; render?: (value: any) => string }[] = [
    { header: "Nome", accessor: "name" },
    { header: "Cidade", accessor: "city" },
    { header: "Estado", accessor: "state" },
    { header: "Área Total", accessor: "total_area" },
    { header: "Área Agricultável", accessor: "arable_area" },
    { header: "Área de Vegetação", accessor: "vegetation_area" },
    { header: "Produtor", accessor: "producer_name" },
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
    <FarmListContainer>
      <Sidebar />
      <ContentArea>
        <TopBar />
        <MainContent>
          <ButtonContainer>
            <button onClick={handleCreate}>+ Cadastrar Fazenda</button>
          </ButtonContainer>
          {loading && <p>Carregando...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <GenericTable
            data={farms}
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
                    "Tem certeza de que deseja excluir esta fazenda?",
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
            setDeleteFarmId(null);
            setShowConfirmModal(false);
          }}
        />
      )}
    </FarmListContainer>
  );
};

export default FarmList;
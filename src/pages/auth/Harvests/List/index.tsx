import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../../redux/store";
import { useNavigate } from "react-router-dom";
import TopBar from "../../../../components/TopBar";
import Sidebar from "../../../../components/Sidebar";
import { Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { setCurrentPageTitle } from "../../../../redux/slices/themeSlice";
import {
  HarvestsListContainer,
  ContentArea,
  MainContent,
  PaginationContainer,
  ButtonContainer,
} from "./styles";
import GenericTable from "../../../../components/GenericTable";
import { HarvestService } from "../../../../services/harvests";
import Modal from "../../../../components/Modal";
import ModalConfirmAlert from "../../../../components/ModalConfirm";

interface Harvest {
  id: string;
  year: string;
  farm: string;
  created_at: string;
  updated_at: string;
}

interface PaginationData {
  count: number;
  next: string | null;
  previous: string | null;
}

const HarvestList: React.FC = () => {
  const dispatch = useDispatch();
  const [harvests, setHarvests] = useState<Harvest[]>([]);
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
  const [deleteHarvestId, setDeleteHarvestId] = useState<string | null>(null);

  const userAuth = useSelector((state: IRootState) => state.auth);
  const token = userAuth.token;

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setCurrentPageTitle({ title: "Colheitas" }));
  }, [dispatch]);

  useEffect(() => {
    fetchHarvests(currentPage);
  }, [currentPage]);

  const fetchHarvests = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      if (!token) {
        handleShowModal("Ops!", "Usuário não autenticado.");
        return;
      }

      const data = await HarvestService.getHarvests({
        token,
        filters: { page },
      });

      if (data) {
        setHarvests(data.results);
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
    if (id) setDeleteHarvestId(id);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!token || !deleteHarvestId) {
      handleShowModal("Ops!", "Usuário não autenticado.");
      return;
    }

    const success = await HarvestService.deleteHarvest({ token, id: deleteHarvestId });
    if (success) {
      handleShowModal("Sucesso", "Colheita excluída com sucesso.");
      fetchHarvests(currentPage);
    } else {
      handleShowModal("Ops!", "Falha ao excluir a colheita.");
    }
    setDeleteHarvestId(null);
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
    navigate("/harvest-create");
  };

  const handleEdit = async (id: string) => {
    navigate(`/harvest-update?id=${id}`);
  };

  const columns: { header: string; accessor: keyof Harvest; render?: (value: any) => string }[] = [
    { header: "Ano", accessor: "year" },
    { header: "Fazenda", accessor: "farm" },
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
    <HarvestsListContainer>
      <Sidebar />
      <ContentArea>
        <TopBar />
        <MainContent>
          <ButtonContainer>
            <button onClick={handleCreate}>+ Cadastrar Colheita</button>
          </ButtonContainer>
          {loading && <p>Carregando...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <GenericTable
            data={harvests}
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
                    "Tem certeza de que deseja excluir esta colheita?",
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
            setDeleteHarvestId(null);
            setShowConfirmModal(false);
          }}
        />
      )}
    </HarvestsListContainer>
  );
};

export default HarvestList;
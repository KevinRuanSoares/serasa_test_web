import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../../redux/store';
import { useNavigate } from 'react-router-dom';
import TopBar from "../../../../components/TopBar";
import Sidebar from "../../../../components/Sidebar";
import { Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { setCurrentPageTitle } from '../../../../redux/slices/themeSlice';
import {
  RuralProducerListContainer,
  ContentArea,
  MainContent,
  PaginationContainer,
  ButtonContainer,
} from "./styles";
import GenericTable from "../../../../components/GenericTable";
import { ProducerService } from '../../../../services/producers';
import Modal from '../../../../components/Modal';
import ModalConfirmAlert from '../../../../components/ModalConfirm';

interface Producer {
  cpf_cnpj: string;
  name: string;
  id: string;
  created_at: string;
  updated_at: string;
}

interface PaginationData {
  count: number;
  next: string | null;
  previous: string | null;
}

const RuralProducerList: React.FC = () => {
  const dispatch = useDispatch();
  const [producers, setProducers] = useState<Producer[]>([]);
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
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const closeModal = () => setShowModal(false);

  // Confirm Modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmModalMessage, setConfirmModalMessage] = useState('');
  const [confirmModalTitle, setConfirmModalTitle] = useState('');
  const [deleteProducerId, setDeleteProducerId] = useState<string | null>(null);

  const userAuth = useSelector((state: IRootState) => state.auth);
  const token = userAuth.token;

  const navigate = useNavigate();


  useEffect(() => {
    dispatch(setCurrentPageTitle({ title: 'Produtores Rurais' }));
  }, [dispatch]);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      if (!token) {
        handleShowModal("Ops!", "Usuario não autenticado.");
        return;
      }

      const data = await ProducerService.getProducers({
        token,
        filters: { page },
      });
      if (data) {
        setProducers(data.results);
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
    if (id) setDeleteProducerId(id);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!token || !deleteProducerId) {
      handleShowModal("Ops!", "Usuario não autenticado.");
      return;
    }

    const success = await ProducerService.deleteProducer({ token, id: deleteProducerId });
    if (success) {
      handleShowModal("Sucesso", "Produtor excluído com sucesso.");
      fetchData(currentPage);
    } else {
      handleShowModal("Ops!", "Falha ao excluir produtor.");
    }
    setDeleteProducerId(null);
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
    navigate('/rural-producer-create')
  };

  const handleEdit = async (id: string) => {
    alert(`Edit functionality triggered for producer ID: ${id}`);
  };

  const columns: { header: string; accessor: keyof Producer; render?: (value: string) => string }[] = [
    { header: "CPF/CNPJ", accessor: "cpf_cnpj" },
    { header: "Nome", accessor: "name" },
    { header: "Criado", accessor: "created_at", render: (value: string) => new Date(value).toLocaleString() },
    { header: "Atualizado", accessor: "updated_at", render: (value: string) => new Date(value).toLocaleString() },
  ];

  return (
    <RuralProducerListContainer>
      <Sidebar />
      <ContentArea>
        <TopBar />
        <MainContent>
          <ButtonContainer>
            <button onClick={handleCreate}>+ Cadastrar Produtor</button>
          </ButtonContainer>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <GenericTable
            data={producers}
            columns={columns}
            edit={(row) => (
              <>
                <button className="edit" onClick={() => handleEdit(row.id)}>
                  <Pencil size={20} />
                </button>
              </>
            )}
            remove={(row) => (
              <>
                <button className="delete" onClick={() => handleShowConfirmModal(
                  "Confirmar Exclusão",
                  "Tem certeza de que deseja excluir este produtor?",
                  row.id
                )}>
                  <Trash2 size={20} />
                </button>
              </>
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
              <ChevronRight size={20}/>
            </button>
          </PaginationContainer>
        </MainContent>
      </ContentArea>

      {/* Generic Modal */}
      {showModal && (
        <Modal
          title={modalTitle}
          message={modalMessage}
          onClose={closeModal}
        />
      )}

      {/* Confirm Modal */}
      {showConfirmModal && (
        <ModalConfirmAlert
          title={confirmModalTitle}
          message={confirmModalMessage}
          onConfirm={handleConfirmDelete}
          onCancel={() => {
            setDeleteProducerId(null);
            setShowConfirmModal(false);
          }}
        />
      )}
    </RuralProducerListContainer>
  );
};

export default RuralProducerList;
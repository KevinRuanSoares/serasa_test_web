import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../../redux/store';
import TopBar from "../../../../components/TopBar";
import Sidebar from "../../../../components/Sidebar";
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

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const closeModal = () => setShowModal(false);

  const userAuth = useSelector((state: IRootState) => state.auth);

  const token = userAuth.token; // Replace with actual token retrieval logic

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
        handleShowModal("Ops!", "User not authenticated.");
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
  }

  const handlePageChange = (direction: "next" | "previous") => {
    if (direction === "next" && paginationData.next) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "previous" && paginationData.previous) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleCreate = async () => {
    alert("Create functionality triggered!");
  };

  const handleEdit = async (id: string) => {
    alert(`Edit functionality triggered for producer ID: ${id}`);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this producer?")) {

      if (!token) {
        handleShowModal("Ops!", "User not authenticated.");
        return;
      }

      const success = await ProducerService.deleteProducer({ token, id });
      if (success) {
        handleShowModal("Sucesso", "Producer deleted successfully!");
        fetchData(currentPage);
      } else {
        handleShowModal("Ops!", "Failed to delete producer.");
        setShowModal(true);
      }
    }
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
          <h1>Produtores Rurais</h1>
          <ButtonContainer>
            <button onClick={handleCreate}>+ Create Producer</button>
          </ButtonContainer>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <GenericTable
            data={producers}
            columns={columns}
            actions={(row) => (
              <>
                <button className="edit" onClick={() => handleEdit(row.id)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(row.id)}>Delete</button>
              </>
            )}
          />
          <PaginationContainer>
            <button
              onClick={() => handlePageChange("previous")}
              disabled={!paginationData.previous}
            >
              Previous
            </button>
            <span>Page {currentPage}</span>
            <button
              onClick={() => handlePageChange("next")}
              disabled={!paginationData.next}
            >
              Next
            </button>
          </PaginationContainer>
        </MainContent>
      </ContentArea>
      {showModal && (
        <Modal
          title={modalTitle}
          message={modalMessage}
          onClose={closeModal}
        />
      )}
    </RuralProducerListContainer>
  );
};

export default RuralProducerList;

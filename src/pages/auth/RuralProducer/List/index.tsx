import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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

  useEffect(() => {
    dispatch(setCurrentPageTitle({ title: 'Produtores Rurais' }));
  }, [dispatch]);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page: number) => {
    const url = `https://your-api.com/producers?page=${page}`;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch data.");
      const data = await response.json();
      setProducers(data.results);
      setPaginationData({
        count: data.count,
        next: data.next,
        previous: data.previous,
      });
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (direction: "next" | "previous") => {
    if (direction === "next" && paginationData.next) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "previous" && paginationData.previous) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleCreate = () => {
    alert("Create functionality triggered!");
  };

  const handleEdit = (id: string) => {
    alert(`Edit functionality triggered for producer ID: ${id}`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this producer?")) {
      alert(`Delete functionality triggered for producer ID: ${id}`);
    }
  };

  const columns: { header: string; accessor: keyof Producer; render?: (value: string) => string }[] = [
    { header: "CPF/CNPJ", accessor: "cpf_cnpj" },
    { header: "Name", accessor: "name" },
    { header: "ID", accessor: "id" },
    { header: "Created At", accessor: "created_at", render: (value: string) => new Date(value).toLocaleString() },
    { header: "Updated At", accessor: "updated_at", render: (value: string) => new Date(value).toLocaleString() },
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
    </RuralProducerListContainer>
  );
};

export default RuralProducerList;
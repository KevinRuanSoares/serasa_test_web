import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../redux/store";
import TopBar from "../../../components/TopBar";
import Sidebar from "../../../components/Sidebar";
import Modal from "../../../components/Modal";
import { setCurrentPageTitle } from "../../../redux/slices/themeSlice";
import { ProducerService } from "../../../services/producers";
import { DashboardContainer, ContentArea, MainContent, MetricsContainer, MetricCard, ChartContainer } from "./styles";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const userAuth = useSelector((state: IRootState) => state.auth);
  const token = userAuth.token;

  const [totalFarms, setTotalFarms] = useState<number>(0);
  const [totalHectares, setTotalHectares] = useState<number>(0);
  const [stateData, setStateData] = useState<any>(null);
  const [cropData, setCropData] = useState<any>(null);
  const [landUseData, setLandUseData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(setCurrentPageTitle({ title: "Dashboard" }));

    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!token) {
          throw new Error("Usuário não autenticado.");
        }

        const data = await ProducerService.getDashboardData(token);

        if (data) {
          // Atualiza métricas
          setTotalFarms(data.farms_by_state.reduce((sum, state) => sum + state.count, 0));
          setTotalHectares(data.land_use.total_area);

          // Atualiza dados de gráficos
          setStateData({
            labels: data.farms_by_state.map((item) => item.state),
            datasets: [
              {
                data: data.farms_by_state.map((item) => item.count),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
              },
            ],
          });

          setCropData({
            labels: data.crops_distribution.map((item) => item.crop),
            datasets: [
              {
                data: data.crops_distribution.map((item) => item.count),
                backgroundColor: ["#4BC0C0", "#FF6384", "#FF9F40"],
              },
            ],
          });

          setLandUseData({
            labels: ["Área Agricultável", "Vegetação"],
            datasets: [
              {
                data: [data.land_use.arable_area, data.land_use.vegetation_area],
                backgroundColor: ["#36A2EB", "#FFCE56"],
              },
            ],
          });
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ocorreu um erro ao buscar os dados do dashboard.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [dispatch, token]);

  return (
    <DashboardContainer>
      <Sidebar />
      <ContentArea>
        <TopBar />
        <MainContent>
          {error && <Modal title="Ops!" message={error} onClose={() => setError(null)} />}
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <>
              <MetricsContainer>
                <MetricCard>
                  <h2>Total de Fazendas</h2>
                  <p>{totalFarms}</p>
                </MetricCard>
                <MetricCard>
                  <h2>Total de Hectares</h2>
                  <p>{totalHectares} ha</p>
                </MetricCard>
              </MetricsContainer>

              <ChartContainer>
                {stateData && (
                  <div>
                    <h3>Distribuição por Estado</h3>
                    <Doughnut data={stateData} />
                  </div>
                )}
                {cropData && (
                  <div>
                    <h3>Distribuição por Cultura</h3>
                    <Doughnut data={cropData} />
                  </div>
                )}
                {landUseData && (
                  <div>
                    <h3>Uso do Solo</h3>
                    <Doughnut data={landUseData} />
                  </div>
                )}
              </ChartContainer>
            </>
          )}
        </MainContent>
      </ContentArea>
    </DashboardContainer>
  );
};

export default Dashboard;
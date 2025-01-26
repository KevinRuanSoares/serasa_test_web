import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import TopBar from "../../../components/TopBar";
import Sidebar from "../../../components/Sidebar";
import { setCurrentPageTitle } from '../../../redux/slices/themeSlice';
import { DashboardContainer, ContentArea, MainContent, MetricsContainer, MetricCard, ChartContainer } from "./styles";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartData {
  labels: string[];
  datasets: Array<{
    data: number[];
    backgroundColor: string[];
  }>;
}

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();

  // Simulated Data
  const totalFarms: number = 25;
  const totalHectares: number = 1500;

  const stateData: ChartData = {
    labels: ['São Paulo', 'Minas Gerais', 'Paraná'],
    datasets: [{
      data: [40, 35, 25],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    }],
  };

  const cropData: ChartData = {
    labels: ['Soja', 'Milho', 'Cana-de-açúcar'],
    datasets: [{
      data: [50, 30, 20],
      backgroundColor: ['#4BC0C0', '#FF6384', '#FF9F40'],
    }],
  };

  const landUseData: ChartData = {
    labels: ['Área Agricultável', 'Vegetação'],
    datasets: [{
      data: [1200, 300],
      backgroundColor: ['#36A2EB', '#FFCE56'],
    }],
  };

  useEffect(() => {
    dispatch(setCurrentPageTitle({ title: 'Dashboard' }));
  }, [dispatch]);

  return (
    <DashboardContainer>
      <Sidebar />
      <ContentArea>
        <TopBar />
        <MainContent>
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
            <div>
              <h3>Distribuição por Estado</h3>
              <Doughnut data={stateData} />
            </div>
            <div>
              <h3>Distribuição por Cultura</h3>
              <Doughnut data={cropData} />
            </div>
            <div>
              <h3>Uso do Solo</h3>
              <Doughnut data={landUseData} />
            </div>
          </ChartContainer>
        </MainContent>
      </ContentArea>
    </DashboardContainer>
  );
};

export default Dashboard;
import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f8f9fa;
`;

export const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

export const MainContent = styled.main`
  padding: 20px;
  background-color: #f8f9fa;
`;

export const MetricsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

export const MetricCard = styled.div`
  flex: 1;
  background-color: #fff;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.5rem;
    font-weight: bold;
    color: #28a745;
  }
`;

export const ChartContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  div {
    background-color: #fff;
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

    h3 {
      margin-bottom: 20px;
    }
  }
`;
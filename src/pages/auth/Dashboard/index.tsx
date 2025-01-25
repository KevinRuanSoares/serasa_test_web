import TopBar from "../../../components/TopBar";
import Sidebar from "../../../components/Sidebar";
import { DashboardContainer, ContentArea, MainContent } from "../../../styles/auth/Dashboard";

const Dashboard = () => {

  return (
    <DashboardContainer>
      <Sidebar/>
      <ContentArea>
        <TopBar title="Dashboard" />
        <MainContent>
          <h1>Welcome to the Dashboard</h1>
          <p>Here is your main content area.</p>
        </MainContent>
      </ContentArea>
    </DashboardContainer>
  );
};

export default Dashboard;
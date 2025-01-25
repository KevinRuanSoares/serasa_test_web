import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import TopBar from "../../../components/TopBar";
import Sidebar from "../../../components/Sidebar";
import { setCurrentPageTitle } from '../../../redux/slices/themeSlice';
import { DashboardContainer, ContentArea, MainContent } from "../../../styles/auth/Dashboard";

const Dashboard = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPageTitle({ title: 'Dashboard' }));
  }, [dispatch]);

  return (
    <DashboardContainer>
      <Sidebar/>
      <ContentArea>
        <TopBar/>
        <MainContent>
          <h1>Welcome to the Dashboard</h1>
          <p>Here is your main content area.</p>
        </MainContent>
      </ContentArea>
    </DashboardContainer>
  );
};

export default Dashboard;
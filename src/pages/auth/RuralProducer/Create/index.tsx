import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import TopBar from "../../../../components/TopBar";
import Sidebar from "../../../../components/Sidebar";
import { setCurrentPageTitle } from '../../../../redux/slices/themeSlice';
import { RuralProducerCreateContainer, ContentArea, MainContent } from "./styles";

const Dashboard = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPageTitle({ title: 'Registrar Produtores Rurais' }));
  }, [dispatch]);

  return (
    <RuralProducerCreateContainer>
      <Sidebar/>
      <ContentArea>
        <TopBar/>
        <MainContent>
          <h1>Welcome to the Registrar Produtores Rurais</h1>
          <p>Here is your main content area.</p>
        </MainContent>
      </ContentArea>
    </RuralProducerCreateContainer>
  );
};

export default Dashboard;
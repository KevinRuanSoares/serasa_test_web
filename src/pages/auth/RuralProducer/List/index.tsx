import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import TopBar from "../../../../components/TopBar";
import Sidebar from "../../../../components/Sidebar";
import { setCurrentPageTitle } from '../../../../redux/slices/themeSlice';
import { RuralProducerListContainer, ContentArea, MainContent } from "./styles";

const Dashboard = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPageTitle({ title: 'Produtores Rurais' }));
  }, [dispatch]);

  return (
    <RuralProducerListContainer>
      <Sidebar/>
      <ContentArea>
        <TopBar/>
        <MainContent>
          <h1>Welcome to the Produtores Rurais</h1>
          <p>Here is your main content area.</p>
        </MainContent>
      </ContentArea>
    </RuralProducerListContainer>
  );
};

export default Dashboard;
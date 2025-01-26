import React from "react";
import { useSelector } from 'react-redux';
import { IRootState } from '../../redux/store';
import { List, CircleGauge } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { SidebarContainer, LogoSection, Logo, NavSection, NavItem, LogoutSection } from "./styles";

interface SidebarProps {
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {

  const theme = useSelector((state: IRootState) => state.theme);
  const navigate = useNavigate();

  return (
    <>
      {theme.isMenuOpen && (
          <SidebarContainer>
            <LogoSection>
              <Logo
                onClick={() => {
                  navigate('/dashboard');
                }}
              >
                <img src="assets/icon.png" alt="ProfProfile" width={50} />
              </Logo>
            </LogoSection>
            <NavSection>
              <NavItem
                onClick={() => {
                  navigate('/dashboard');
                }}
              >
                <CircleGauge size={20} />
                <span>Dashboard</span>
              </NavItem>
              <NavItem
                onClick={() => {
                  navigate('/rural-producer-list');
                }}
              >
                <List size={20} />
                <span>Produtores Rurais</span>
              </NavItem>
              <NavItem
                onClick={() => {
                  navigate('/farm-list');
                }}
              >
                <List size={20} />
                <span>Fazendas</span>
              </NavItem>
            </NavSection>
            <LogoutSection>
            </LogoutSection>
          </SidebarContainer>
        )}
    </>
  );
};

export default Sidebar;
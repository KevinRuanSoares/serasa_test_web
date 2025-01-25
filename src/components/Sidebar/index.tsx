import React from "react";
import { useSelector } from 'react-redux';
import { IRootState } from '../../redux/store';
import { Home } from "lucide-react";
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
              <Logo>
              <img src="assets/icon.png" alt="ProfProfile" width={50} />
              </Logo>
            </LogoSection>
            <NavSection>
              <NavItem
                onClick={() => {
                  navigate('/rural-producer-list');
                }}
              >
                <Home size={20} />
                <span>Produtores Rurais</span>
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
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../redux/store';
import { Home, Settings, FileText } from "lucide-react";
import { SidebarContainer, LogoSection, Logo, NavSection, NavItem, LogoutSection } from "./styles";

interface SidebarProps {
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {

  const theme = useSelector((state: IRootState) => state.theme);

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
              <NavItem>
                <Home size={20} />
                <span>Home</span>
              </NavItem>
              <NavItem>
                <FileText size={20} />
                <span>Reports</span>
              </NavItem>
              <NavItem>
                <Settings size={20} />
                <span>Settings</span>
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
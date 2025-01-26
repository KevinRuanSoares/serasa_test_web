import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../redux/store';
import { logout } from '../../redux/slices/authSlice';
import { toggleMenu } from '../../redux/slices/themeSlice';
import { TopBarContainer, LeftSection, IconButton, LogoutButton } from "./styled";
import { Menu, LogOut } from "lucide-react";


const TopBar: React.FC = () => {

  const dispatch = useDispatch();
  const theme = useSelector((state: IRootState) => state.theme);

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <TopBarContainer>
      <LeftSection>
        <IconButton onClick={()=> dispatch(toggleMenu())}>
          <Menu size={24} />
        </IconButton>
        <h1 style={{ color: "#ffffff" }}>{theme.currentPageTitle}</h1>
      </LeftSection>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <LogoutButton onClick={onLogout}>
          <LogOut size={20} /> Sair
        </LogoutButton>
      </div>
    </TopBarContainer>
  );
};

export default TopBar;

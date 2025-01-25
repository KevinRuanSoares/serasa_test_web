import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../redux/store';
import { logout } from '../../redux/slices/authSlice';
import { TopBarContainer, LeftSection, IconButton, CenterSection, SearchInputContainer, SearchInput, LogoutButton } from "./styled";
import { Menu, LogOut } from "lucide-react";

interface TopBarProps {
  title?: string;
  onMenuClick?: () => void;
  onUserClick?: () => void;
  onSearch?: (value: string) => void;
}

const TopBar: React.FC<TopBarProps> = ({ title = "My App", onMenuClick}) => {

  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <TopBarContainer>
      <LeftSection>
        <IconButton onClick={onMenuClick}>
          <Menu size={24} />
        </IconButton>
        <h1 style={{ color: "#ffffff" }}>{title}</h1>
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

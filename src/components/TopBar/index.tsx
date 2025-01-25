import React from "react";
import { TopBarContainer, LeftSection, IconButton, CenterSection, SearchInputContainer, SearchInput, LogoutButton } from "./styled";
import { Search, Menu, User, LogOut } from "lucide-react";

interface TopBarProps {
  title?: string;
  onMenuClick?: () => void;
  onUserClick?: () => void;
  onSearch?: (value: string) => void;
  onLogout?: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ title = "My App", onMenuClick, onUserClick, onSearch, onLogout }) => {
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

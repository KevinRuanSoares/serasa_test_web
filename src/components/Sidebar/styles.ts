import styled from "styled-components";

export const SidebarContainer = styled.div`
  height: 100vh;
  width: 250px;
  background-color: #2c2c2c;
  display: flex;
  flex-direction: column;
  justify-content: unset;
  padding: 1rem;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
`;

export const LogoSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const Logo = styled.h1`
  font-size: 1.5rem;
  color: #057C3D;
  font-weight: bold;
`;

export const NavSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem;
  border-radius: 8px;
  color: #cccccc;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #3d3d3d;
    color: #057C3D;
  }

  span {
    font-size: 1rem;
  }
`;

export const LogoutSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem;
  border-radius: 8px;
  color: #cccccc;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #3d3d3d;
    color: #057C3D;
  }

  span {
    font-size: 1rem;
  }
`;
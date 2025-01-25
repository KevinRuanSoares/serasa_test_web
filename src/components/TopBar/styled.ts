import styled from "styled-components";

export const TopBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  background-color: #2c2c2c;
  font-family: 'Poppins', sans-serif;
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const CenterSection = styled.div`
  display: none;
  flex: 1;

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

export const SearchInputContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.8rem 2.5rem 0.8rem 0.8rem;
  border: 1px solid #444444;
  border-radius: 8px;
  background: #3d3d3d;
  color: #ffffff;
  outline: none;
  transition: all 0.3s;

  &:focus {
    border-color: #057C3D;
    box-shadow: 0 0 6px rgba(5, 124, 61, 0.5);
  }
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #cccccc;
  transition: color 0.3s;

  &:hover {
    color: #057C3D;
  }
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
  background: #057C3D;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #04562F;
    transform: translateY(-2px);
  }
`;

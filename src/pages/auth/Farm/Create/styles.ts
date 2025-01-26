import styled from 'styled-components';

export const FarmCreateContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #fff !important;
`;

export const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fff  !important;
`;

export const MainContent = styled.main`
  padding: 20px;
  background-color: #fff;
  // box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  // border-radius: 12px;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 0.9rem;

  th, td {
    text-align: left;
    padding: 12px;
    border: 1px solid #e0e0e0;
  }

  th {
    background-color: #f4f4f4;
    font-weight: bold;
  }

  tr:hover {
    background-color: #f9f9f9;
  }

  button {
    padding: 5px 10px;
    margin: 0 5px;
    border: none;
    border-radius: 4px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #ddd;
    }

    &.edit {
      background-color: #ffcc00;
      color: black;
    }

    &.delete {
      background-color: #ff4d4d;
      color: white;
    }
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;

  button {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    background-color: #28a745;
    color: white;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color:rgb(26, 110, 46);
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }

  span {
    font-size: 0.9rem;
    color: #555;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;

  button {
    padding: 10px 15px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #218838;
    }
  }
`;
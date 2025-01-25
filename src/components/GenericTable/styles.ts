import styled from "styled-components";

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 0.9rem;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  th, td {
    text-align: left;
    padding: 12px;
    border: 1px solid #e0e0e0;
  }

  th {
    background-color: #f4f4f4;
    font-weight: bold;
    color: #333;
    font-size: 0.95rem;
  }

  tr:nth-child(even) {
    background-color: #fafafa;
  }

  tr:hover {
    background-color: #f1f1f1;
  }

  td {
    color: #555;
    font-size: 0.85rem;
  }

  td:last-child {
    display: flex;
    gap: 8px;
  }

  button {
    padding: 5px 10px;
    margin: 0;
    border: none;
    border-radius: 5px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &.edit {
      background-color: #ffcc00;
      color: white;

      &:hover {
        background-color: #e6b800;
      }
    }

    &.delete {
      background-color: #ff4d4d;
      color: white;

      &:hover {
        background-color: #e63939;
      }
    }
  }
`;
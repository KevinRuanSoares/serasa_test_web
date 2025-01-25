import React from "react";
import { StyledTable } from "./styles";

interface Column<T> {
  header: string; // Column header name
  accessor: keyof T; // Key to access data from the row
  render?: (value: T[keyof T], row: T) => React.ReactNode; // Optional custom render function
}

interface GenericTableProps<T> {
  data: T[]; // Row data
  columns: Column<T>[]; // Column definitions
  actions?: (row: T) => React.ReactNode; // Optional actions column
}

const GenericTable = <T,>({
  data,
  columns,
  actions,
}: GenericTableProps<T>): React.ReactElement => {
  return (
    <StyledTable>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col.header}</th>
          ))}
          {actions && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((col, colIndex) => (
              <td key={colIndex}>
                {col.render
                  ? col.render(row[col.accessor], row)
                  : row[col.accessor]?.toString()}
              </td>
            ))}
            {actions && <td>{actions(row)}</td>}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default GenericTable;
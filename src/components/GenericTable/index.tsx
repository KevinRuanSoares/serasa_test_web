import React from "react";
import { StyledTable, TableContainer } from "./styles";

interface Column<T> {
  header: string; // Column header name
  accessor: keyof T; // Key to access data from the row
  render?: (value: T[keyof T], row: T) => React.ReactNode; // Optional custom render function
}

interface GenericTableProps<T> {
  data: T[]; // Row data
  columns: Column<T>[]; // Column definitions
  edit?: (row: T) => React.ReactNode; // Optional edit column
  remove?: (row: T) => React.ReactNode; // Optional delete column
}

const GenericTable = <T,>({
  data,
  columns,
  edit,
  remove,
}: GenericTableProps<T>): React.ReactElement => {
  return (
    <TableContainer>

      <StyledTable>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.header}</th>
            ))}
            {edit && <th>Editar</th>}
            {remove && <th>Remover</th>}
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
              {edit && <td style={{textAlign: 'center'}}>{edit(row)}</td>}
              {remove && <td style={{justifyContent: 'center'}}>{remove(row)}</td>}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default GenericTable;
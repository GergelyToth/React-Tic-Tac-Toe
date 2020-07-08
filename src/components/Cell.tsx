// Cells can have 3 states. X, O, empty.
// with a click event handler on it.import React from 'react';
import React from 'react';
import styled from 'styled-components';


export interface CellProps {
  value: string;
  onClick(): void;
}

const CellWrapper = styled.div`
  border: 1px solid #fff;
  width: 50px;
  height: 50px;
`;

const Cell:React.FC<CellProps> = ({ value, onClick }: CellProps) => {
  return (
    <CellWrapper data-testid="cell" onClick={onClick}>
      { value }
    </CellWrapper>
  );
}

export default Cell;

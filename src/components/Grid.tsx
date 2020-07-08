// in the grid we need to have cells, that can have 3 states. X, O, empty,
// with a click event handler on it.import React from 'react';
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Cell from './Cell';

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 50px 50px 50px;
  grid-template-rows: 50px 50px 50px;
  justify-content: center;
`;

// the win condition, if any row, column or diagnal is from the same player
// these indexes in the cell must be true in order to win
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const Grid:React.FC = () => {
  const [currentPlayer, setPlayer] = useState('o');
  const [winner, setWinner] = useState('');
  const cells = useRef(new Array(9).fill({ id: null, value: null }).map((value, key) => ({ ...value, id: key })));

  const onReset = () => {
    cells.current = cells.current.map(cell => ({ ...cell, value: null }));
    setWinner('');
    setPlayer('o');
  }

  const onCellClick = (cellId: number) => {
    // check if the cell contains any value, if yes, exit early
    if (cells.current[cellId].value) {
      return;
    }
    // set the cells value
    cells.current[cellId].value = currentPlayer;

    // check if anyone won
    // first check if 'o' has won
    // the numbers in winCondition MUST be in the cells, not all numbers from cell needs to be in winCondition
    const oPlayerWon = winConditions.some((condition) => condition.every(index => cells.current[index].value === 'o'));
    const xPlayerWon = winConditions.some((condition) => condition.every(index => cells.current[index].value === 'x'));

    if (oPlayerWon || xPlayerWon) {
      setWinner(oPlayerWon ? 'o' : 'x');
      return;
    }

    // if all the fields are filled there is no winner and need to reset the puzzle
    if (cells.current.every(cell => cell.value !== null)) {
      setWinner('draw');
      return;
    }

    // at the end of the run, change the player
    setPlayer(currentPlayer === 'o' ? 'x' : 'o');
  }

  return (
    <>
      <GridWrapper data-testid="grid">
        {cells.current.map((data) => <Cell value={data.value} key={data.id} onClick={() => { onCellClick(data.id) }} />)}

      </GridWrapper>
      {winner && (
        <>
          <h2 data-testid="winner-text">
            {winner === 'draw' ? 'Its a draw!' : `The winner is: ${winner}`}
          </h2>
          <button data-testid="reset-button" onClick={onReset}>Reset</button>
        </>
      )}
    </>
  );
}

export default Grid;

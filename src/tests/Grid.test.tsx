import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Grid from '../components/Grid';

test('renders grid without crashing', () => {
  render(<Grid />);
});

test('renders 9 cells', () => {
  const { getAllByTestId } = render(<Grid />);
  const cells = getAllByTestId('cell');
  expect(cells).toHaveLength(9);
});

test('cells will be filled out which players turn it is', () => {
  const { getAllByTestId } = render(<Grid />);
  const cells = getAllByTestId('cell');

  // first player will always be 'o'
  userEvent.click(cells[1]);
  expect(cells[1]).toHaveTextContent('o');

  // second player will always be 'x'
  userEvent.click(cells[2]);
  expect(cells[2]).toHaveTextContent('x');

  // it repeats
  userEvent.click(cells[3]);
  expect(cells[3]).toHaveTextContent('o');
});

test('filled out cells cant be clicked', () => {
  const { getAllByTestId } = render(<Grid />);
  const cells = getAllByTestId('cell');

  userEvent.click(cells[0]);
  expect(cells[0]).toHaveTextContent('o');

  // try to click the same cell
  userEvent.click(cells[0]);
  // it won't change to second user
  expect(cells[0]).toHaveTextContent('o');

  // clicking on different cell will eat up the second users turn tho
  userEvent.click(cells[1]);
  expect(cells[1]).toHaveTextContent('x');
});

test('the game can be winned by player "o"', () => {
  const { getByTestId, getAllByTestId } = render(<Grid />);
  const cells = getAllByTestId('cell');

  userEvent.click(cells[0]); // o
  userEvent.click(cells[3]); // x
  userEvent.click(cells[1]); // o
  userEvent.click(cells[4]); // x
  userEvent.click(cells[2]); // o

  expect(getByTestId('winner-text')).toBeInTheDocument();
  expect(getByTestId('winner-text')).toHaveTextContent('The winner is: o');
});

test('player x can win', () => {
  const { getByTestId, getAllByTestId } = render(<Grid />);
  const cells = getAllByTestId('cell');

  userEvent.click(cells[3]); // o
  userEvent.click(cells[0]); // x
  userEvent.click(cells[4]); // o
  userEvent.click(cells[1]); // x
  userEvent.click(cells[6]); // o
  userEvent.click(cells[2]); // x

  expect(getByTestId('winner-text')).toBeInTheDocument();
  expect(getByTestId('winner-text')).toHaveTextContent('The winner is: x');
});

test('it can be a draw', () => {
  const { getByTestId, getAllByTestId } = render(<Grid />);
  const cells = getAllByTestId('cell');

  userEvent.click(cells[0]); // o
  userEvent.click(cells[1]); // x
  userEvent.click(cells[2]); // o

  userEvent.click(cells[4]); // x
  userEvent.click(cells[3]); // o
  userEvent.click(cells[5]); // x

  userEvent.click(cells[7]); // o
  userEvent.click(cells[6]); // x
  userEvent.click(cells[8]); // o

  expect(getByTestId('winner-text')).toBeInTheDocument();
  expect(getByTestId('winner-text')).toHaveTextContent('Its a draw!');
});

test('the game can be reset after a player won', () => {
  const { getByTestId, getAllByTestId } = render(<Grid />);
  const cells = getAllByTestId('cell');

  userEvent.click(cells[0]); // o
  userEvent.click(cells[3]); // x
  userEvent.click(cells[1]); // o
  userEvent.click(cells[4]); // x
  userEvent.click(cells[2]); // o

  const resetButton = getByTestId('reset-button');
  expect(resetButton).toBeInTheDocument();
  userEvent.click(resetButton);

  // now the player x can click on the first cell!
  userEvent.click(cells[1]); // o
  userEvent.click(cells[0]); // x
  expect(cells[0]).toHaveTextContent('x');
});

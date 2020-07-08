import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cell from '../components/Cell';

test('renders Cell with whatever value you pass on to it', () => {
  const { getByText } = render(<Cell value="x" onClick={() => {}} />);
  const cellValue = getByText(/x/i);
  expect(cellValue).toBeInTheDocument();
});

test('it executes the onClick handler when clicked', () => {
  const onClick = jest.fn();
  const { getByTestId } = render(<Cell value="x" onClick={onClick} />);
  expect(onClick).toBeCalledTimes(0)

  userEvent.click(getByTestId('cell'));
  expect(onClick).toBeCalledTimes(1);
});

test('rendered the styles correctly', () => {
  const { getByTestId } = render(<Cell value="" onClick={() => {}} />);
  const cell = getByTestId('cell');
  expect(cell).toHaveStyle(`
    border: 1px solid #fff;
    width: 50px;
    height: 50px;
  `);
});

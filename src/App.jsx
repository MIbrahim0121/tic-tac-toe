import React, { useState } from 'react';
import './App.css'; // Import CSS file for styles

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null)); // Initialize the board with null values
  const [isXNext, setIsXNext] = useState(true); // Track whose turn it is

  // Calculate the winner based on the current board state
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const status = winner ? `Winner: ${winner}` : `Next player: ${isXNext ? 'X' : 'O'}`;

  // Handle the click event for a square
  const handleClick = (index) => {
    if (board[index] || winner) return; // Ignore if square is already filled or if there's a winner
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O'; // Set the current player's mark
    setBoard(newBoard);
    setIsXNext(!isXNext); // Switch turns
  };

  // Reset the game
  const handleReset = () => {
    setBoard(Array(9).fill(null)); // Reset the board to initial state
    setIsXNext(true); // Reset the turn to 'X'
  };

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <div className="status">{status}</div>
      <div className="board">
        {board.map((square, index) => (
          <button key={index} className="square" onClick={() => handleClick(index)}>
            {square}
          </button>
        ))}
      </div>
      <button className="reset" onClick={handleReset}>Reset Game</button>
    </div>
  );
};

export default App;

import React from 'react';
import './Game.css';

// PUBLIC_INTERFACE
const Board = ({ squares, onSquareClick, isCurrentPlayer, gameStatus }) => {
  /**
   * Interactive game board component that displays the current game state
   * and handles player moves
   */
  const renderSquare = (i) => {
    return (
      <button 
        className={`square ${squares[i] ? 'filled' : ''}`}
        onClick={() => onSquareClick(i)}
        disabled={!isCurrentPlayer || squares[i] || gameStatus !== 'active'}
      >
        {squares[i]}
      </button>
    );
  };

  return (
    <div className="board">
      <div className="board-status">
        {gameStatus === 'active' ? (
          isCurrentPlayer ? 'Your turn' : "Opponent's turn"
        ) : (
          gameStatus === 'won' ? 'Game Won!' : 
          gameStatus === 'draw' ? 'Game Draw!' : 
          'Game Over'
        )}
      </div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default Board;

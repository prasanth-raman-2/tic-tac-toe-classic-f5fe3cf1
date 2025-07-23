import React, { createContext, useState, useContext } from 'react';
import { createGame, joinGame, makeMove, getGameState, getGames, getGameHistory } from '../services/api';

const GameContext = createContext(null);

// PUBLIC_INTERFACE
/**
 * Provider component for game context
 * Manages game state and provides game-related methods
 */
export const GameProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [currentGame, setCurrentGame] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateGame = async () => {
    setLoading(true);
    setError(null);
    try {
      const game = await createGame();
      setCurrentGame(game);
      return game;
    } catch (err) {
      setError(err.message || 'Failed to create game');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleJoinGame = async (gameId) => {
    setLoading(true);
    setError(null);
    try {
      const game = await joinGame(gameId);
      setCurrentGame(game);
      return game;
    } catch (err) {
      setError(err.message || 'Failed to join game');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleMakeMove = async (gameId, position) => {
    setLoading(true);
    setError(null);
    try {
      const updatedGame = await makeMove(gameId, position);
      setCurrentGame(updatedGame);
      return updatedGame;
    } catch (err) {
      setError(err.message || 'Failed to make move');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleFetchGames = async () => {
    setLoading(true);
    setError(null);
    try {
      const availableGames = await getGames();
      setGames(availableGames);
      return availableGames;
    } catch (err) {
      setError(err.message || 'Failed to fetch games');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleFetchGameHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const history = await getGameHistory();
      setGameHistory(history);
      return history;
    } catch (err) {
      setError(err.message || 'Failed to fetch game history');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateGameState = async (gameId) => {
    try {
      const gameState = await getGameState(gameId);
      setCurrentGame(gameState);
      return gameState;
    } catch (err) {
      setError(err.message || 'Failed to update game state');
      throw err;
    }
  };

  return (
    <GameContext.Provider
      value={{
        games,
        currentGame,
        gameHistory,
        loading,
        error,
        createGame: handleCreateGame,
        joinGame: handleJoinGame,
        makeMove: handleMakeMove,
        fetchGames: handleFetchGames,
        fetchGameHistory: handleFetchGameHistory,
        updateGameState: handleUpdateGameState
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// PUBLIC_INTERFACE
/**
 * Custom hook to use game context
 * @returns {Object} Game context value
 */
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Game.css';

// PUBLIC_INTERFACE
const GameLobby = () => {
  /**
   * Game lobby component that displays available games and allows
   * creating new games
   */
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await axios.get('http://localhost:8000/games', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setGames(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch games');
      setLoading(false);
    }
  };

  const createGame = async () => {
    try {
      const response = await axios.post('http://localhost:8000/games', {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      navigate(`/game/${response.data.id}`);
    } catch (err) {
      setError('Failed to create game');
    }
  };

  const joinGame = async (gameId) => {
    try {
      await axios.post(`http://localhost:8000/games/${gameId}/join`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      navigate(`/game/${gameId}`);
    } catch (err) {
      setError('Failed to join game');
    }
  };

  if (loading) return <div className="loading">Loading games...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="game-lobby">
      <h2>Game Lobby</h2>
      <button className="create-game-btn" onClick={createGame}>
        Create New Game
      </button>
      
      <div className="games-list">
        <h3>Available Games</h3>
        {games.length === 0 ? (
          <p>No games available</p>
        ) : (
          games.map(game => (
            <div key={game.id} className="game-item">
              <span>Game #{game.id}</span>
              <span className="game-status">{game.status}</span>
              {game.status === 'waiting' && (
                <button 
                  className="join-game-btn"
                  onClick={() => joinGame(game.id)}
                >
                  Join Game
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GameLobby;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Game.css';

// PUBLIC_INTERFACE
const GameHistory = () => {
  /**
   * Game history component that displays the player's game history
   */
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGameHistory();
  }, []);

  const fetchGameHistory = async () => {
    try {
      const response = await axios.get('http://localhost:8000/games/history', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setHistory(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch game history');
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading history...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="game-history">
      <h2>Game History</h2>
      {history.length === 0 ? (
        <p>No games played yet</p>
      ) : (
        <div className="history-list">
          {history.map(game => (
            <div key={game.id} className="history-item">
              <div className="game-info">
                <span>Game #{game.id}</span>
                <span className={`game-result ${game.result}`}>
                  {game.result === 'won' ? 'Victory' :
                   game.result === 'lost' ? 'Defeat' :
                   'Draw'}
                </span>
              </div>
              <div className="game-details">
                <span>Opponent: {game.opponent}</span>
                <span>Date: {new Date(game.played_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GameHistory;

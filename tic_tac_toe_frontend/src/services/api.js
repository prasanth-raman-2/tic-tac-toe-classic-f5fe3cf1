import axios from 'axios';
import { getToken } from './auth';

const API_URL = 'http://localhost:8000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
});

// Add authentication token to requests
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// PUBLIC_INTERFACE
/**
 * Creates a new game
 * @returns {Promise} Response containing new game details
 */
export const createGame = async () => {
  try {
    const response = await api.post('/games');
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || 'Failed to create game';
  }
};

// PUBLIC_INTERFACE
/**
 * Joins an existing game
 * @param {string} gameId - ID of the game to join
 * @returns {Promise} Response containing game details
 */
export const joinGame = async (gameId) => {
  try {
    const response = await api.post(`/games/${gameId}/join`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || 'Failed to join game';
  }
};

// PUBLIC_INTERFACE
/**
 * Makes a move in the game
 * @param {string} gameId - ID of the game
 * @param {number} position - Board position (0-8)
 * @returns {Promise} Response containing updated game state
 */
export const makeMove = async (gameId, position) => {
  try {
    const response = await api.post(`/games/${gameId}/move`, { position });
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || 'Failed to make move';
  }
};

// PUBLIC_INTERFACE
/**
 * Gets the current state of a game
 * @param {string} gameId - ID of the game
 * @returns {Promise} Response containing game state
 */
export const getGameState = async (gameId) => {
  try {
    const response = await api.get(`/games/${gameId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || 'Failed to get game state';
  }
};

// PUBLIC_INTERFACE
/**
 * Gets the list of available games
 * @returns {Promise} Response containing list of games
 */
export const getGames = async () => {
  try {
    const response = await api.get('/games');
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || 'Failed to fetch games';
  }
};

// PUBLIC_INTERFACE
/**
 * Gets the game history for the current user
 * @returns {Promise} Response containing game history
 */
export const getGameHistory = async () => {
  try {
    const response = await api.get('/games/history');
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || 'Failed to fetch game history';
  }
};

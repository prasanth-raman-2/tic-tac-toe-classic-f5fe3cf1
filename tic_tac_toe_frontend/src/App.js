import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { GameProvider } from './context/GameContext';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  return (
    <Router>
      <AuthProvider>
        <GameProvider>
          <div className="App">
            {/* Other components will be added here */}
          </div>
        </GameProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

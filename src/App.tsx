import React from 'react';
import Grid from './components/Grid';
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        React Tic Tac Toe
      </header>
      <main>
        <Grid /> {/* Grid should have 3x3 cells inside */}
      </main>
    </div>
  );
}

export default App;

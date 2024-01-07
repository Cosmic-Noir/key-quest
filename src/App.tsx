import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Person } from './components/person'; 
import { ForceField } from './components/forceField';
import { Letter } from './components/letter';
import { Word } from './components/word';
import { HealthAndScore } from './components/healthAndScore';
import { ControlButtons } from './components/controlButtons';
import { GameArea } from './components/gameArea';

function App() {
  const currentHealth = 90;
  const currentScore = 100;
  const handlePause = () => {
      // Pause game logic
  };

  const handleToggleMusic = () => {
      // Toggle music logic
  };

  const handleToggleSound = () => {
      // Toggle sound logic
  };


  return (
    <div className="App">
      <div className="gameContainer">
        <Person />
        <ForceField />
        <GameArea />
      </div>
      <HealthAndScore health={currentHealth} score={currentScore} />
      <ControlButtons 
          onPause={handlePause} 
          onToggleMusic={handleToggleMusic} 
          onToggleSound={handleToggleSound} 
      />
  </div>
  );
}

export default App;

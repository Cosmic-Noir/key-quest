import React, { useState, useEffect } from 'react';
import './App.css';
import { Person } from './components/person'; 
import { ForceField } from './components/forceField';
import { HealthAndScore } from './components/healthAndScore';
import { ControlButtons } from './components/controlButtons';
import { GameArea } from './components/gameArea';

function App() {
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [timer, setTimer] = useState(30);
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timeout: any;
    if (isGameRunning && !isPaused && timer > 0) {
      timeout = setTimeout(() => setTimer(timer - 1), 1000);
    } else if (timer === 0) {
      setIsGameRunning(false);
      setShowLevelComplete(true);
    }

    return () => clearTimeout(timeout);
  }, [isGameRunning, timer, isPaused]);

  const startGame = () => {
    setIsGameRunning(true);
    setTimer(30);
    setShowLevelComplete(false);
  };

  const currentHealth = 90;
  const currentScore = 100;
  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleToggleMusic = () => {
    // Toggle music logic
  };

  const handleToggleSound = () => {
    // Toggle sound logic
  };


  return (
    <div className="App">
      {!isGameRunning && <button onClick={startGame}>Start Level I</button>}
      {showLevelComplete && <div>Level completed!</div>}
      {isGameRunning && (
        <>
          <div>Time Left: {timer}s</div>
          <div className="gameContainer">
            <Person />
            <ForceField />
            <GameArea isPaused={isPaused} />
          </div>
          <HealthAndScore health={currentHealth} score={currentScore} />
          <ControlButtons 
            onPause={handlePause} 
            onToggleMusic={handleToggleMusic} 
            onToggleSound={handleToggleSound} 
            isPaused={isPaused}
          />
        </>
      )}
  </div>
  );
}

export default App;

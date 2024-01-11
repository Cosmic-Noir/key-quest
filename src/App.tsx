import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { Person } from "./components/person";
import { ForceField } from "./components/forceField";
import { HealthAndScore } from "./components/healthAndScore";
import { ControlButtons } from "./components/controlButtons";
import { GameArea } from "./components/gameArea";

function App() {
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [timer, setTimer] = useState(30);
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [health, setHealth] = useState(100);
  const [levelScore, setLevelScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const forceFieldRef = useRef(null);

  useEffect(() => {
    let timeout: any;
    if (isGameRunning && !isPaused && timer > 0) {
      timeout = setTimeout(() => setTimer(timer - 1), 1000);
    } else if (timer === 0) {
      setIsGameRunning(false);
      setShowLevelComplete(true);
      setLevelScore(0);
    }

    return () => clearTimeout(timeout);
  }, [isGameRunning, timer, isPaused]);

  useEffect(() => {
    // Check if the game is running and health drops to 0
    if (isGameRunning && health <= 0) {
      setIsGameRunning(false);
      setShowLevelComplete(true);
    }
  }, [health, isGameRunning]);

  const startGame = () => {
    setIsGameRunning(true);
    setTimer(30);
    setShowLevelComplete(false);
  };

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
            <ForceField ref={forceFieldRef} />
            <GameArea
              isPaused={isPaused}
              setHealth={setHealth}
              forceFieldRef={forceFieldRef}
              setLevelScore={setLevelScore}
            />
          </div>
          <HealthAndScore health={health} score={levelScore} />
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

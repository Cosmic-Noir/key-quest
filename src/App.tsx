import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { Person } from "./components/person";
import { ForceField } from "./components/forceField";
import { HealthAndScore } from "./components/healthAndScore";
import { ControlButtons } from "./components/controlButtons";
import { GameArea } from "./components/gameArea";

function App() {
  // Settings
  // Todo - Make difficulties a variable
  // 'easy', 'normal', 'hard'
  const [difficulty, setDifficulty] = useState("easy");
  const [timer, setTimer] = useState(30);
  const [isPaused, setIsPaused] = useState(false);

  // Level related state
  const [isLevelRunning, setIsLevelRunning] = useState(false);
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const [health, setHealth] = useState(100);
  const [levelScore, setLevelScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [levelEnded, setLevelEnded] = useState(false);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [correctKeystrokes, setCorrectKeystrokes] = useState(0);
  const [wpm, setWpm] = useState(0);

  const forceFieldRef = useRef(null);
  useEffect(() => {
    let timeout: any;
    if (isLevelRunning && !isPaused && timer > 0) {
      timeout = setTimeout(() => setTimer(timer - 1), 1000);
    } else if (timer === 0) {
      endLevel();
    }

    return () => clearTimeout(timeout);
  }, [isLevelRunning, timer, isPaused]);

  useEffect(() => {
    if (isLevelRunning && health <= 0) {
      endLevel();
    }
  }, [health, isLevelRunning]);

  const handleDifficultyChange = (event: any) => {
    setDifficulty(event.target.value);
  };

  const endLevel = () => {
    // Check if the level hasn't already ended
    if (!levelEnded) {
      // Calculate WPM
      const timeElapsed = 30 - timer;
      const wordsPerMinute = (correctKeystrokes / 5) * (60 / timeElapsed);
      setWpm(wordsPerMinute);

      setTotalScore((prevTotalScore) => prevTotalScore + levelScore);
      setIsLevelRunning(false);
      setShowLevelComplete(true);
      setLevelEnded(true);
    }
  };

  const startLevel = () => {
    setIsLevelRunning(true);
    setTimer(30);
    setShowLevelComplete(false);
    setLevelScore(0);
    setHealth(100);
    setLevelEnded(false);
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
      {!isLevelRunning && (
        <div>
          <div>
            <input
              type="radio"
              id="easy"
              name="difficulty"
              value="easy"
              checked={difficulty === "easy"}
              onChange={handleDifficultyChange}
            />
            <label htmlFor="easy">Easy</label>
          </div>
          <div>
            <input
              type="radio"
              id="medium"
              name="difficulty"
              value="medium"
              checked={difficulty === "medium"}
              onChange={handleDifficultyChange}
            />
            <label htmlFor="medium">Medium</label>
          </div>
          <div>
            <input
              type="radio"
              id="hard"
              name="difficulty"
              value="hard"
              checked={difficulty === "hard"}
              onChange={handleDifficultyChange}
            />
            <label htmlFor="hard">Hard</label>
          </div>
          <button onClick={startLevel}>Start Level</button>
        </div>
      )}

      {showLevelComplete && (
        <>
          <div>Level completed!</div>
          <div>Total Score: {totalScore}</div>
          <div>Level Score: {levelScore}</div>
          <div>
            Accuracy: {((correctKeystrokes / totalKeystrokes) * 100).toFixed(2)}
            %
          </div>
          <div>WPM: {wpm.toFixed(0)}</div>
        </>
      )}
      {isLevelRunning && (
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
              onTotalKeystrokesChange={setTotalKeystrokes}
              onCorrectKeystrokesChange={setCorrectKeystrokes}
              difficulty={difficulty}
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

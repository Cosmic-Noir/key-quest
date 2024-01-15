import React, { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import { DifficultyMenu } from "./components/difficultyMenu";
import { ForceField } from "./components/forceField";
import { GameArea } from "./components/gameArea";
import { HealthAndScore } from "./components/healthAndScore";
import { Level } from "./components/level";
import { PauseMenu } from "./components/pauseMenu";
import { Person } from "./components/person";
import { ScoreCard } from "./components/scoreCard";
import Logo from "./logo.png";
import levels from "./levels";

import "./App.sass";

function App() {
  // Game Settings
  // Todo - Make difficulties a variable
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [selectedLevel, setSelectedLevel] = useState<number>(0);
  const [timer, setTimer] = useState(30);
  const [isPaused, setIsPaused] = useState(false);

  // Sound Settings
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isSoundOn, setIsSoundOn] = useState(true);

  // Level related state
  const [showLevelSelection, setShowLevelSelection] = useState(false);
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

  useEffect(() => {
    const music = document.getElementById(
      "background-music"
    ) as HTMLAudioElement;
    if (music) {
      isMusicPlaying ? music.play() : music.pause();
    }
  }, [isMusicPlaying]);

  useEffect(() => {
    const music = document.getElementById(
      "background-music"
    ) as HTMLAudioElement;
    if (music) {
      music.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handlePause();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleDifficultyChange = (event: any) => {
    setDifficulty(event.target.value);
  };

  const handleLevelChange = (levelIndex: number) => {
    setWpm(0);
    setCorrectKeystrokes(0);
    setTotalKeystrokes(0);
    setSelectedLevel(() => levelIndex);
  };

  const handleShowSelectLevel = () => {
    setShowLevelSelection(true);
    setShowLevelComplete(false);
  };

  const startGame = () => {
    setIsMusicPlaying(true);
    setIsGameStarted(true);
    handleShowSelectLevel();
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
    setShowLevelSelection(false);
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
    setIsMusicPlaying(!isMusicPlaying);
  };

  const handleToggleSound = () => {
    setIsSoundOn(!isSoundOn);
  };

  return (
    <div className="App">
      <audio id="background-music" src="/Space.mp3" loop>
        Your browser does not support the audio element.
      </audio>
      {isPaused && <div className="show-pause-menu"></div>}
      {isPaused && (
        <PauseMenu
          isMusicPlaying={isMusicPlaying}
          handlePause={handlePause}
          volume={volume}
          onVolumeChange={handleVolumeChange}
          onToggleMusic={handleToggleMusic}
          onToggleSound={handleToggleSound}
          isSoundOn={isSoundOn}
          difficulty={difficulty}
          handleDifficultyChange={handleDifficultyChange}
        />
      )}
      {!isGameStarted && (
        <>
          <img src={Logo} className="logo bob" />
          <DifficultyMenu
            difficulty={difficulty}
            handleDifficultyChange={handleDifficultyChange}
          />
          <Button variant="contained" size="large" onClick={startGame}>
            Start Game
          </Button>
        </>
      )}
      {showLevelSelection && (
        <div className="levels space-themed-text">
          <div>Select Level:</div>
          <div className="levels-container">
            {levels.map((level, index) => (
              <Level
                index={index}
                level={level}
                selectedLevel={selectedLevel}
                handleLevelChange={handleLevelChange}
                key={index}
              />
            ))}
          </div>
          <Button variant="contained" size="large" onClick={startLevel}>
            Start Level
          </Button>
        </div>
      )}
      {isLevelRunning && (
        <>
          <div className="space-themed-text">Time Left: {timer}s</div>
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
              words={levels[selectedLevel].words}
              letters={levels[selectedLevel].letters}
            />
          </div>
          <HealthAndScore health={health} score={levelScore} />
          <Button variant="contained" onClick={handlePause} disabled={isPaused}>
            Pause
          </Button>
        </>
      )}
      {showLevelComplete && (
        <>
          <ScoreCard
            totalScore={totalScore}
            levelScore={levelScore}
            correctKeystrokes={correctKeystrokes}
            totalKeystrokes={totalKeystrokes}
            wpm={wpm}
          />
          <Button
            variant="contained"
            size="large"
            onClick={handleShowSelectLevel}
          >
            Select Level
          </Button>
        </>
      )}
    </div>
  );
}

export default App;

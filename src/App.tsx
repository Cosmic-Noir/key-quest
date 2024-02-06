import React, { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import { DifficultySelection } from "./components/difficultySelection";
import { GameArea } from "./components/gameArea";
import { HealthAndScore } from "./components/healthAndScore";
import { Level } from "./components/level";
import { PauseMenu } from "./components/pauseMenu";
import { Person } from "./components/person";
import { ScoreCard } from "./components/scoreCard";
import { useGameSettings } from "./hooks/useGameSettings";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "./logo.png";
import levels from "./levels";

import "./App.sass";

const LEVEL_TIME = 60;

const DIFFICULTIES: Record<
  string,
  {
    [key: string]: Object;
    description: string;
    autoSpawnEnabled: boolean;
    spawnInterval: number;
    scrollSpeed: number;
  }
> = {
  easy: {
    description:
      "Embark on a leisurely journey through the cosmos, perfect for new typists. Navigate through fields of lowercase asteroids, encounter shorter cosmic words, and enjoy the slower drift of celestial bodies.",
    autoSpawnEnabled: false,
    spawnInterval: 2000,
    scrollSpeed: 7,
  },
  medium: {
    description:
      "Gear up for an interstellar challenge, ideal for experienced spacefarers. Encounter varied planetary landscapes with capitalization, longer alien words, and experience faster meteor showers of letters and words.",
    autoSpawnEnabled: true,
    spawnInterval: 1500,
    scrollSpeed: 5,
  },
  hard: {
    description:
      "Dive into the heart of a typing galaxy, only for the bravest commanders. Brace for lightning-fast comet tails of really long words, quicksilver scrolling, and relentless generation of cosmic vocabulary.",
    autoSpawnEnabled: true,
    spawnInterval: 1000,
    scrollSpeed: 4,
  },
};

function App() {
  // Game Settings
  const { difficulty, setDifficulty } = useGameSettings();
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [showDifficultySelection, setShowDifficultySelection] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<number>(0);
  const [timer, setTimer] = useState(LEVEL_TIME);
  const [isPaused, setIsPaused] = useState(false);
  const [highestLevelCompleted, setHighestLevelCompleted] = useState(0);
  const [autoSpawnEnabled, setAutoSpawnEnabled] = useState(
    DIFFICULTIES[difficulty].autoSpawnEnabled
  );
  const [spawnInterval, setAutoSpawnChange] = useState(
    DIFFICULTIES[difficulty].spawnInterval
  );
  const [scrollSpeed, setScrollSpeedChange] = useState(
    DIFFICULTIES[difficulty].scrollSpeed
  );

  // Sound Settings
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.5);
  const [isFxSoundOn, setIsFxSoundOn] = useState(true);
  const [fxVolume, setFxVolume] = useState(0.5);

  // Level related state
  const [showLevelSelection, setShowLevelSelection] = useState(false);
  const [isLevelRunning, setIsLevelRunning] = useState(false);
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const [showLevelWon, setShowLevelWon] = useState(false);
  const [showLevelLost, setShowLevelLost] = useState(false);
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
      if (selectedLevel >= highestLevelCompleted) {
        setHighestLevelCompleted(selectedLevel + 1);
      }
      setShowLevelWon(true);
    }

    return () => clearTimeout(timeout);
  }, [isLevelRunning, timer, isPaused]);

  useEffect(() => {
    if (isLevelRunning && health <= 0) {
      endLevel();
      setShowLevelLost(true);
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
      music.volume = musicVolume;
    }
  }, [musicVolume]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handlePause();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    setAutoSpawnEnabled(DIFFICULTIES[difficulty].autoSpawnEnabled);
    setAutoSpawnChange(DIFFICULTIES[difficulty].spawnInterval);
    setScrollSpeedChange(DIFFICULTIES[difficulty].scrollSpeed);
  }, [difficulty]);

  const handleMusicVolumeChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setMusicVolume(newValue as number);
  };

  const handleFxVolumeChange = (event: Event, newValue: number | number[]) => {
    setFxVolume(newValue as number);
  };

  const startGame = () => {
    setIsMusicPlaying(true);
    setIsGameStarted(true);
    setShowDifficultySelection(true);
  };

  const handleFinishSettingsSelection = () => {
    setShowDifficultySelection(false);
    setShowLevelSelection(true);
  };

  const handleDifficultyChange = (event: any) => {
    setDifficulty(event.target.value);
  };

  const handleAutoSpawnChange = (value: boolean) => {
    setAutoSpawnEnabled(value);
  };

  const handleScrollSpeedChange = (value: number) => {
    setScrollSpeedChange(value);
  };

  const handleSpawnIntervalChange = (value: number) => {
    setAutoSpawnChange(value);
  };

  const handleShowSelectLevel = () => {
    setShowLevelSelection(true);
    setShowLevelComplete(false);
    setShowLevelWon(false);
    setShowLevelLost(false);
  };

  const handleLevelChange = (levelIndex: number) => {
    setWpm(0);
    setCorrectKeystrokes(0);
    setTotalKeystrokes(0);
    setSelectedLevel(() => levelIndex);
  };

  const endLevel = () => {
    // Check if the level hasn't already ended
    if (!levelEnded) {
      // Calculate WPM
      const timeElapsed = LEVEL_TIME - timer;
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
    setTimer(LEVEL_TIME);
    setShowLevelComplete(false);
    setLevelScore(0);
    setWpm(0);
    setCorrectKeystrokes(0);
    setTotalKeystrokes(0);
    setHealth(100);
    setLevelEnded(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleToggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  const handleToggleFxSound = () => {
    setIsFxSoundOn(!isFxSoundOn);
  };

  return (
    <div className="App">
      <audio id="background-music" src="/Space.mp3" loop>
        Your browser does not support the audio element.
      </audio>
      <MenuIcon onClick={handlePause} id="menu-icon" />
      {isPaused && <div className="show-pause-menu"></div>}
      {isPaused && (
        <PauseMenu
          handlePause={handlePause}
          isMusicPlaying={isMusicPlaying}
          musicVolume={musicVolume}
          onToggleMusic={handleToggleMusic}
          onMusicVolumeChange={handleMusicVolumeChange}
          isFxSoundOn={isFxSoundOn}
          fxVolume={fxVolume}
          onToggleFxSound={handleToggleFxSound}
          onFxVolumeChange={handleFxVolumeChange}
          difficulty={difficulty}
          handleDifficultyChange={handleDifficultyChange}
        />
      )}
      {!isGameStarted && (
        <>
          <img src={Logo} className="logo bob-and-fade" />
          <Button
            variant="contained"
            size="large"
            onClick={startGame}
            className="fade-in"
          >
            Start Game
          </Button>
        </>
      )}
      {showDifficultySelection && (
        <DifficultySelection
          difficulty={difficulty}
          handleDifficultyChange={handleDifficultyChange}
          handleFinishSettingsSelection={handleFinishSettingsSelection}
          activeLevelDescription={DIFFICULTIES[difficulty].description}
          autoSpawnEnabled={autoSpawnEnabled}
          handleAutoSpawnChange={handleAutoSpawnChange}
          scrollSpeed={scrollSpeed}
          handleScrollSpeedChange={handleScrollSpeedChange}
          spawnInterval={spawnInterval}
          handleSpawnIntervalChange={handleSpawnIntervalChange}
        />
      )}
      {showLevelSelection && (
        <div className="levels space-themed-header-text fade-in">
          <div>Select Level:</div>
          <div className="levels-container">
            {levels.map((level, index) => (
              <Level
                index={index}
                level={level}
                selectedLevel={selectedLevel}
                handleLevelChange={handleLevelChange}
                key={index}
                locked={index > highestLevelCompleted}
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
          <div className="space-themed-header-text fade-in">
            Time Left: {timer}s
          </div>
          <div className="gameContainer fade-in">
            <Person />
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
              isFxSoundOn={isFxSoundOn}
              fxVolume={fxVolume}
              autoSpawnEnabled={autoSpawnEnabled}
              spawnInterval={spawnInterval}
              scrollSpeed={scrollSpeed}
            />
          </div>
          <HealthAndScore health={health} score={levelScore} />
          <Button
            variant="contained"
            onClick={handlePause}
            disabled={isPaused}
            className="fade-in"
          >
            Pause
          </Button>
        </>
      )}
      {showLevelComplete && (
        <>
          {showLevelWon && <h1>YOU WON WOO HOO</h1>}
          {showLevelLost && <h1>You lost...</h1>}
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

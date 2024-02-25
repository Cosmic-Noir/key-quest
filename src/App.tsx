import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Audio } from "./components/audio";
import { DifficultySelection } from "./components/difficultySelection";
import { GameArea } from "./components/gameArea";
import { HealthAndScore } from "./components/healthAndScore";
import { Level } from "./components/level";
import { Loading } from "./components/loading";
import { PauseMenu } from "./components/pauseMenu";
import { Person } from "./components/person";
import { ScoreCard } from "./components/scoreCard";
import { useGameSettings } from "./hooks/useGameSettings";
import { useScoreTracking } from "./hooks/useScoreTracking";
import { useSoundSettings } from "./hooks/useSoundSettings";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "./logo.png";
import levels from "./levels";
import "./App.sass";

const LEVEL_TIME = 60;

function App() {
  const { isSettingsLoading } = useGameSettings();
  const { soundSettings, isSoundSettingsLoading, updateSoundSettings } =
    useSoundSettings();
  const { gameScores, updateGameScores, isScoresLoading } = useScoreTracking();

  const loading =
    isSettingsLoading || isSoundSettingsLoading || isScoresLoading;

  // Game Settings
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [showDifficultySelection, setShowDifficultySelection] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<number>(0);
  const [timer, setTimer] = useState(LEVEL_TIME);
  const [isPaused, setIsPaused] = useState(false);
  const [highestLevelCompleted, setHighestLevelCompleted] = useState(0);

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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handlePause();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const startGame = () => {
    updateSoundSettings({ ...soundSettings, isMusicPlaying: true });
    setIsGameStarted(true);
    setShowDifficultySelection(true);
  };

  const handleFinishDiffSelection = () => {
    setShowDifficultySelection(false);
    setShowLevelSelection(true);
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

  return (
    <div className="App">
      {loading ? (
        <Loading />
      ) : (
        <div className="App-content">
          <MenuIcon onClick={handlePause} id="menu-icon" />
          {isGameStarted && <Audio />}
          {isPaused && <div className="show-pause-menu"></div>}
          {isPaused && <PauseMenu handlePause={handlePause} />}
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
              handleNext={handleFinishDiffSelection}
              buttonText="Select Difficulty"
            />
          )}
          {showLevelSelection && (
            // todo - this should be its own component
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
                  setLevelScore={setLevelScore}
                  onTotalKeystrokesChange={setTotalKeystrokes}
                  onCorrectKeystrokesChange={setCorrectKeystrokes}
                  selectedLevel={selectedLevel}
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
      )}
    </div>
  );
}

export default App;

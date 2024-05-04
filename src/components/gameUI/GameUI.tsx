import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { GameArea } from "components/gameArea";
import { HealthAndScore } from "components/healthAndScore";
import { Person } from "components/person";
import { ScoreCard } from "components/scoreCard";
import { useScoreTracking } from "hooks/useScoreTracking";
import { useGameSettings } from "hooks/useGameSettings";

import "./gameUI.sass";

interface GameUIProps {
  isPaused: boolean;
  handlePause: () => void;
  selectedLevel: number;
  handleLevelSelection: () => void;
}

const LEVEL_TIME = 60;
const START_DELAY = 3000;

const GameUI: React.FC<GameUIProps> = ({
  isPaused,
  handlePause,
  selectedLevel,
  handleLevelSelection,
}) => {
  const { gameSettings } = useGameSettings();
  const { gameScores, updateGameScores } = useScoreTracking();

  // Level Settings:
  const [timer, setTimer] = useState(LEVEL_TIME);
  const [health, setHealth] = useState(100);
  const [isLevelRunning, setIsLevelRunning] = useState(false);
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const [levelWon, setLevelWon] = useState(false);
  const [levelScore, setLevelScore] = useState(0);
  const [newHighScore, setNewHighScore] = useState(false);
  const [totalLevelScore, setTotalLevelScore] = useState(0);
  const [totalGameScore, setTotalGameScore] = useState(gameScores?.totalScore);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [correctKeystrokes, setCorrectKeystrokes] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [wpm, setWpm] = useState(0);

  // Start delay before the level begins
  // Todo - Show cute countdown before level starts
  useEffect(() => {
    const startDelay = setTimeout(() => {
      setIsLevelRunning(true);
    }, START_DELAY);

    return () => clearTimeout(startDelay); // Cleanup the timeout if the component unmounts
  }, []);

  useEffect(() => {
    setTotalGameScore(gameScores?.totalScore);
  }, [gameScores]);

  const endLevel = () => {
    // Calculate WPM
    const timeElapsed = LEVEL_TIME - timer;

    // Average 5 letters per word *
    const wordsPerMinute = Math.round(
      (correctKeystrokes / 5) * (60 / timeElapsed)
    );
    setWpm(wordsPerMinute);

    const accuracy = Math.round((correctKeystrokes / totalKeystrokes) * 100);
    setAccuracy(accuracy);

    let newScores = { ...gameScores };

    const currentLevelScore = calculateTotalLevelScore(
      wordsPerMinute,
      accuracy,
      levelScore
    );

    setTotalLevelScore(currentLevelScore);

    if (levelWon) {
      if (gameScores!.highestLevelUnlocked <= selectedLevel) {
        newScores.highestLevelUnlocked = selectedLevel + 1;
      }

      const previousLevelScore = gameScores?.levels[selectedLevel];

      if (previousLevelScore?.topScore ?? 0 < currentLevelScore) {
        setNewHighScore(true);

        newScores.levels![selectedLevel] = {
          topScore: currentLevelScore,
          accuracy: correctKeystrokes,
          wpm: wordsPerMinute,
          difficulty: gameSettings!.difficulty,
        };
      }
    }

    // Update total, all time score  v
    const newTotalScore = (gameScores?.totalScore ?? 0) + totalLevelScore;
    newScores.totalScore = newTotalScore;
    updateGameScores(newScores);
    console.log("total score updated!", newScores);
  };

  // Difficulty score multipler already applied to levelScore
  const calculateTotalLevelScore = (
    wpm: number,
    accuracy: number,
    levelScore: number
  ): number => {
    const baseScore = wpm * 1;
    const finalScore = Math.round((baseScore + levelScore) * accuracy);
    return finalScore;
  };

  useEffect(() => {
    let timeout: any;

    // Condition for running the timer
    if (isLevelRunning && !isPaused && timer > 0) {
      timeout = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }

    // Check for win condition: if the timer hits zero
    if (isLevelRunning && timer <= 0) {
      setLevelWon(true);
      setIsLevelRunning(false);
    }

    // Check for lose condition: if health drops to zero or below
    if (isLevelRunning && health <= 0) {
      setLevelWon(false);
      setIsLevelRunning(false);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isLevelRunning, timer, isPaused, health]);

  // New useEffect that triggers endLevel based on levelWon state change
  useEffect(() => {
    if (!isLevelRunning && (timer <= 0 || health <= 0)) {
      endLevel();
      setShowLevelComplete(true);
    }
  }, [levelWon, isLevelRunning, timer, health]);

  // In level pausing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handlePause();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {showLevelComplete ? (
        <>
          <ScoreCard
            levelWon={levelWon}
            totalScore={totalGameScore ?? 0}
            levelScore={totalLevelScore}
            newHighScore={newHighScore}
            accuracy={accuracy}
            wpm={wpm}
          />
          <Button
            variant="contained"
            size="large"
            onClick={handleLevelSelection}
          >
            Select Level
          </Button>
        </>
      ) : (
        <>
          <div className="space-themed-header-text fade-in">
            Time Left: {timer}s
          </div>
          <div className="gameContainer fade-in">
            <Person />
            <GameArea
              isPaused={isPaused || !isLevelRunning}
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
    </>
  );
};

export default GameUI;

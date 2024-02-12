import React from "react";
import Button from "@mui/material/Button";
import { useGameSettings } from "../../hooks/useGameSettings";
import { AdvancedSettings } from "../advancedSettings";
import DIFFICULTIES from "../../difficulties";

import classNames from "classnames";

import "./difficultySelection.sass";

interface DifficultySelectionProps {
  handleNext: () => void;
  buttonText: string;
}

const DifficultySelection: React.FC<DifficultySelectionProps> = ({
  handleNext,
  buttonText,
}) => {
  const { gameSettings, updateGameSettings } = useGameSettings();
  const {
    difficulty,
    autoSpawnEnabled,
    spawnInterval,
    scrollSpeed,
    description,
  } = gameSettings!;

  const handleDifficultyChange = (event: any) => {
    // Difficulty selection overrides other settings with defaults
    const newDifficulty: string = event.target.value;
    updateGameSettings(DIFFICULTIES[newDifficulty]);
  };

  const handleAutoSpawnChange = (value: boolean) => {
    updateGameSettings({ ...gameSettings, autoSpawnEnabled: value });
  };

  const handleScrollSpeedChange = (value: number) => {
    updateGameSettings({ ...gameSettings, scrollSpeed: value });
  };

  const handleSpawnIntervalChange = (value: number) => {
    updateGameSettings({ ...gameSettings, spawnInterval: value });
  };

  return (
    <div className="difficulty-selection space-container fade-in">
      <h3 className="space-themed-header-text">Difficulty:</h3>
      <div className="difficulties-container">
        <div className="difficulty-container">
          <img
            src="/spaceCadetDiff.png"
            className={classNames("difficulty-image", {
              bob: difficulty === "easy",
            })}
          />
          <input
            type="radio"
            id="easy"
            name="difficulty"
            value="easy"
            checked={difficulty === "easy"}
            onChange={handleDifficultyChange}
          />
          <label
            htmlFor="easy"
            className={classNames({ active: difficulty === "easy" })}
          >
            Space Cadet
          </label>
        </div>
        <div className="difficulty-container">
          <img
            src="/orbitalOfficerDiff.png"
            className={classNames("difficulty-image", {
              bob: difficulty === "medium",
            })}
          />
          <input
            type="radio"
            id="medium"
            name="difficulty"
            value="medium"
            checked={difficulty === "medium"}
            onChange={handleDifficultyChange}
          />
          <label
            htmlFor="medium"
            className={classNames({ active: difficulty === "medium" })}
          >
            Orbital Officer
          </label>
        </div>
        <div className="difficulty-container">
          <img
            src="/starVoyagerDiff.png"
            className={classNames("difficulty-image", {
              bob: difficulty === "hard",
            })}
          />
          <input
            type="radio"
            id="hard"
            name="difficulty"
            value="hard"
            checked={difficulty === "hard"}
            onChange={handleDifficultyChange}
          />
          <label
            htmlFor="hard"
            className={classNames("", { active: difficulty === "hard" })}
          >
            Star Voyager
          </label>
        </div>
      </div>
      <div className="space-themed-text difficulty-description">
        {description}
      </div>
      <AdvancedSettings
        autoSpawnEnabled={autoSpawnEnabled}
        handleAutoSpawnChange={handleAutoSpawnChange}
        scrollSpeed={scrollSpeed}
        handleScrollSpeedChange={handleScrollSpeedChange}
        spawnInterval={spawnInterval}
        handleSpawnIntervalChange={handleSpawnIntervalChange}
      />
      <Button
        variant="contained"
        size="large"
        className="fade-in"
        onClick={handleNext}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default DifficultySelection;

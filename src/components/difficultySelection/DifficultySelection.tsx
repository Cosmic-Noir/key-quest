import React from "react";
import Button from "@mui/material/Button";
import { useGameSettings } from "hooks/useGameSettings";
import { AdvancedSettings } from "components/advancedSettings";
import DIFFICULTIES from "difficulties";
import { DifficultyOption } from "components/difficultyOption";

import "./difficultySelection.sass";

interface DifficultySelectionProps {
  handleNext?: () => void;
  buttonText?: string;
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

  // Difficulty selection overrides other settings with defaults
  const handleDifficultyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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

  const { scoreMultiplier } = DIFFICULTIES[difficulty];

  return (
    <div className="difficulty-selection space-container fade-in">
      <h3 className="space-themed-header-text">Difficulty:</h3>
      <div className="difficulties-container">
        {Object.entries(DIFFICULTIES).map(([key, { label, img }]) => (
          <DifficultyOption
            checked={difficulty === key}
            id={key}
            imageSrc={img}
            key={key}
            label={label}
            name="difficulty"
            onChange={handleDifficultyChange}
          />
        ))}
      </div>
      <div className="difficulty-selection__score-multiplier space-themed-text">
        Score multiplier: x {scoreMultiplier}
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
      {handleNext && buttonText && (
        <Button
          variant="contained"
          size="large"
          className="difficulty-selection__button fade-in"
          onClick={handleNext}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default DifficultySelection;

import React from "react";
import { SoundSettings } from "../soundSettings";
import { DifficultySelection } from "../difficultySelection";

import "./pauseMenu.sass";

interface PauseMenuProps {
  handlePause: () => void;
}

const PauseMenu: React.FC<PauseMenuProps> = ({ handlePause }) => {
  return (
    <div className="pause-menu space-container">
      <h1>Menu</h1>
      <SoundSettings />
      <DifficultySelection handleNext={handlePause} buttonText="Unpause" />
    </div>
  );
};

export default PauseMenu;

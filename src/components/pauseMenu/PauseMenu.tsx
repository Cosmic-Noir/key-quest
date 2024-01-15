import React from "react";
import { MdMusicNote, MdMusicOff } from "react-icons/md";
import { FaVolumeMute } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";
import { DifficultyMenu } from "../difficultyMenu";
import Button from "@mui/material/Button";

import "./pauseMenu.sass";

interface PauseMenuProps {
  isMusicPlaying: boolean;
  handlePause: () => void;
  volume: number;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleMusic: () => void;
  onToggleSound: () => void;
  isSoundOn: boolean;
  difficulty: string;
  handleDifficultyChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PauseMenu: React.FC<PauseMenuProps> = ({
  handlePause,
  volume,
  onVolumeChange,
  onToggleMusic,
  onToggleSound,
  isMusicPlaying,
  isSoundOn,
  difficulty,
  handleDifficultyChange,
}) => {
  return (
    <div className="pause-menu">
      <h1>Menu</h1>
      <div className="settings-section">
        <h4>Sound FX:</h4>
        <Button variant="outlined" onClick={onToggleSound}>
          {isSoundOn ? <FaVolumeUp /> : <FaVolumeMute />}
        </Button>
      </div>
      <h4>Music:</h4>
      <div className="settings-section">
        <Button variant="outlined" onClick={onToggleMusic}>
          {isMusicPlaying ? <MdMusicNote /> : <MdMusicOff />}
        </Button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={onVolumeChange}
        />
      </div>
      <div className="settings-section">
        <DifficultyMenu
          difficulty={difficulty}
          handleDifficultyChange={handleDifficultyChange}
        />
      </div>
      <Button variant="contained" size="large" onClick={handlePause}>
        Unpause
      </Button>
    </div>
  );
};

export default PauseMenu;

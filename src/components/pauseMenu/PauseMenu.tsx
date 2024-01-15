import React from "react";
import { MdMusicNote, MdMusicOff } from "react-icons/md";
import { FaVolumeMute } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";
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
}

const PauseMenu: React.FC<PauseMenuProps> = ({
  handlePause,
  volume,
  onVolumeChange,
  onToggleMusic,
  onToggleSound,
  isMusicPlaying,
  isSoundOn,
}) => {
  return (
    <div className="pause-menu">
      <h1>Menu</h1>
      <div className="volume-controls">
        <span>Sound FX:</span>
        <Button variant="outlined" onClick={onToggleSound}>
          {isSoundOn ? <FaVolumeUp /> : <FaVolumeMute />}
        </Button>
      </div>
      <span>Music:</span>
      <div className="volume-controls">
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
      <Button variant="contained" size="large" onClick={handlePause}>
        Unpause
      </Button>
    </div>
  );
};

export default PauseMenu;

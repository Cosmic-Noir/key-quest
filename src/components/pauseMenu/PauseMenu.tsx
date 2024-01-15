import React from "react";
import { MdMusicNote, MdMusicOff } from "react-icons/md";
import { FaVolumeMute } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";

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
        <button onClick={onToggleSound}>
          {isSoundOn ? <FaVolumeUp /> : <FaVolumeMute />}
        </button>
      </div>
      <span>Music:</span>
      <div className="volume-controls">
        <button onClick={onToggleMusic}>
          {isMusicPlaying ? <MdMusicNote /> : <MdMusicOff />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={onVolumeChange}
        />
      </div>
      <button onClick={handlePause}>Unpause</button>
    </div>
  );
};

export default PauseMenu;

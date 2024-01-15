import React from "react";
import { MdMusicNote, MdMusicOff } from "react-icons/md";
import { FaVolumeMute } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";
import { DifficultyMenu } from "../difficultyMenu";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";

import "./pauseMenu.sass";

interface PauseMenuProps {
  isMusicPlaying: boolean;
  handlePause: () => void;
  musicVolume: number;
  onMusicVolumeChange: (event: Event, value: number | number[]) => void;
  onToggleMusic: () => void;
  onToggleFxSound: () => void;
  isFxSoundOn: boolean;
  fxVolume: GLfloat;
  onFxVolumeChange: (event: Event, value: number | number[]) => void;
  difficulty: string;
  handleDifficultyChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PauseMenu: React.FC<PauseMenuProps> = ({
  handlePause,
  musicVolume,
  onMusicVolumeChange,
  onToggleMusic,
  onToggleFxSound,
  isMusicPlaying,
  isFxSoundOn,
  fxVolume,
  onFxVolumeChange,
  difficulty,
  handleDifficultyChange,
}) => {
  return (
    <div className="pause-menu">
      <h1>Menu</h1>
      <h4>Sound FX:</h4>
      <div className="settings-section">
        <Button variant="outlined" onClick={onToggleFxSound}>
          {isFxSoundOn ? <FaVolumeUp /> : <FaVolumeMute />}
        </Button>
        <Slider
          aria-label="Volume"
          value={fxVolume}
          onChange={onFxVolumeChange}
          min={0}
          max={1}
          step={0.01}
        />
      </div>
      <h4>Music:</h4>
      <div className="settings-section">
        <Button variant="outlined" onClick={onToggleMusic}>
          {isMusicPlaying ? <MdMusicNote /> : <MdMusicOff />}
        </Button>
        <Slider
          min={0}
          max={1}
          step={0.01}
          value={musicVolume}
          onChange={onMusicVolumeChange}
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

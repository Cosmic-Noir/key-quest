import React from "react";
import { useSoundSettings } from "hooks/useSoundSettings";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import { MdMusicNote, MdMusicOff } from "react-icons/md";
import { FaVolumeMute } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";

const SoundSettings: React.FC = () => {
  const { soundSettings, updateSoundSettings } = useSoundSettings();
  const { isMusicPlaying, musicVolume, isFxSoundOn, fxVolume } = soundSettings!;

  const handleToggleMusic = () => {
    updateSoundSettings({ ...soundSettings, isMusicPlaying: !isMusicPlaying });
  };

  const handleMusicVolumeChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    updateSoundSettings({ ...soundSettings, musicVolume: newValue as number });
  };

  const handleToggleFxSound = () => {
    updateSoundSettings({ ...soundSettings, isFxSoundOn: !isFxSoundOn });
  };

  const handleFxVolumeChange = (event: Event, newValue: number | number[]) => {
    updateSoundSettings({ ...soundSettings, fxVolume: newValue as number });
  };

  return (
    <div>
      <h4 className="space-themed-header-text">Sound FX:</h4>
      <div className="settings-section">
        <Button variant="outlined" onClick={handleToggleFxSound}>
          {isFxSoundOn ? <FaVolumeUp /> : <FaVolumeMute />}
        </Button>
        <Slider
          aria-label="Volume"
          value={fxVolume}
          onChange={handleFxVolumeChange}
          min={0}
          max={1}
          step={0.01}
        />
      </div>
      <h4 className="space-themed-header-text">Music:</h4>
      <div className="settings-section">
        <Button variant="outlined" onClick={handleToggleMusic}>
          {isMusicPlaying ? <MdMusicNote /> : <MdMusicOff />}
        </Button>
        <Slider
          min={0}
          max={1}
          step={0.01}
          value={musicVolume}
          onChange={handleMusicVolumeChange}
        />
      </div>
    </div>
  );
};

export default SoundSettings;

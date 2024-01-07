import React from 'react';
import './controlButtons.sass';

interface ControlButtonsProps {
  onPause: () => void;
  onToggleMusic: () => void;
  onToggleSound: () => void;
  isPaused: boolean;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  onPause,
  onToggleMusic,
  onToggleSound,
  isPaused
}) => {
  return (
    <div className="controlButtons">
      <button onClick={onPause}>{isPaused ? 'Unpause' : 'Pause'}</button>
      <button onClick={onToggleMusic}>Toggle Music</button>
      <button onClick={onToggleSound}>Toggle Sound</button>
    </div>
  );
};

export default ControlButtons;

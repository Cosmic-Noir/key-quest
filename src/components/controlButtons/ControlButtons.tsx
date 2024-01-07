import React from 'react';
import './controlButtons.sass';

interface ControlButtonsProps {
    onPause: () => void;
    onToggleMusic: () => void;
    onToggleSound: () => void;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({ onPause, onToggleMusic, onToggleSound }) => {
    return (
        <div className="controlButtons">
            <button onClick={onPause}>Pause</button>
            <button onClick={onToggleMusic}>Toggle Music</button>
            <button onClick={onToggleSound}>Toggle Sound</button>
        </div>
    );
};

export default ControlButtons;

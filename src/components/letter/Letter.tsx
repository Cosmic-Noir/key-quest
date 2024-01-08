
import React from 'react';
import './letter.sass';
import classNames from 'classnames';

interface LetterProps {
  letter: string;
  style?: React.CSSProperties;
  isPaused: boolean;
  isInWord?: boolean;
  isHighlighted?: boolean;
}

const Letter: React.FC<LetterProps> = ({
  letter,
  style,
  isPaused,
  isInWord = false,
  isHighlighted = false
}) => {
  return (
    <div
      className={classNames({
        'letter': !isInWord,
        'isInWord': isInWord,
        'paused': isPaused,
        'highlighted': isHighlighted
      })}
      style={isInWord ? {} : style}
    >
      {letter}
    </div>
  );
};

export default Letter;


import React from 'react';
import './word.sass';
import { Letter } from '../letter';
import classNames from 'classnames';

interface WordProps {
  word: string;
  style: React.CSSProperties;
  isPaused: boolean;
}

const Word: React.FC<WordProps> = ({
  word,
  style,
  isPaused
}) => {
  return (
    <div
      className={classNames({
        'word': true,
        'paused': isPaused
      })}        
      style={style} 
    >
      {word.split('').map((char, index) => (
        <Letter
          key={index}
          letter={char}
          isPaused={isPaused}
          isInWord={true}
        />
      ))}
    </div>
  );
};

export default Word;

import React, { forwardRef } from 'react';
import './word.sass';
import { Letter } from '../letter';
import classNames from 'classnames';

interface WordProps {
  word: string;
  style: React.CSSProperties;
  isPaused: boolean;
  isActive: boolean;
  typedChars: number;
  popEffect?: boolean;
  isVisible?: boolean;
}

const Word = forwardRef<HTMLDivElement, WordProps>(({
  word,
  style,
  isPaused,
  isActive,
  typedChars,
  popEffect,
  isVisible
}, ref) => {
  return (
    <div
      ref={ref}
      className={classNames('word', { 'paused': isPaused, 'pop': popEffect })}
      style={style}
    >
      {word.split('').map((char, index) => (
        <Letter
          key={index}
          letter={char}
          isPaused={isPaused}
          isInWord={true}
          isHighlighted={isActive && index === typedChars}
          isVisible={isVisible}
        />
      ))}
    </div>
  );
});

export default Word;

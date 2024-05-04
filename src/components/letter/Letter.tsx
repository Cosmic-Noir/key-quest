import React, { forwardRef } from "react";
import "./letter.sass";
import classNames from "classnames";

interface LetterProps {
  className?: string;
  isHighlighted?: boolean;
  isPaused: boolean;
  isInWord?: boolean;
  isTypedInWord?: boolean;
  isVisible?: boolean;
  letter: string;
  style?: React.CSSProperties;
}

const Letter = forwardRef<HTMLDivElement, LetterProps>(
  (
    {
      className,
      isHighlighted = false,
      isInWord = false,
      isPaused,
      isTypedInWord = false,
      isVisible,
      letter,
      style,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={classNames(`${className}`, {
          hidden: !isVisible,
          highlighted: isHighlighted,
          isInWord: isInWord,
          letter: !isInWord,
          paused: isPaused,
          typedInWord: isTypedInWord,
        })}
        style={isInWord ? {} : style}
      >
        {letter}
      </div>
    );
  }
);

export default Letter;

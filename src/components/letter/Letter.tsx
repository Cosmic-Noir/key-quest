import React, { forwardRef } from "react";
import "./letter.sass";
import classNames from "classnames";

interface LetterProps {
  letter: string;
  style?: React.CSSProperties;
  isPaused: boolean;
  isInWord?: boolean;
  isHighlighted?: boolean;
  isVisible?: boolean;
  isTypedInWord?: boolean;
  className?: string;
}

const Letter = forwardRef<HTMLDivElement, LetterProps>(
  (
    {
      letter,
      style,
      isPaused,
      isInWord = false,
      isHighlighted = false,
      isVisible,
      isTypedInWord = false,
      className,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={classNames(className, {
          letter: !isInWord,
          isInWord: isInWord,
          paused: isPaused,
          highlighted: isHighlighted,
          hidden: !isVisible,
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

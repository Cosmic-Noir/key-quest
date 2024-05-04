import React, { forwardRef } from "react";
import "./word.sass";
import { Letter } from "../letter";
import classNames from "classnames";

interface WordProps {
  className?: string;
  isActive: boolean;
  isPaused: boolean;
  isVisible?: boolean;
  style: React.CSSProperties;
  typedChars: number;
  word: string;
}

const Word = forwardRef<HTMLDivElement, WordProps>(
  (
    { className, isActive, isPaused, isVisible, typedChars, style, word },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={classNames(`word ${className}`, { paused: isPaused })}
        style={style}
      >
        {word.split("").map((char, index) => (
          <Letter
            key={index}
            letter={char}
            isInWord={true}
            isHighlighted={isActive && index === typedChars}
            isPaused={isPaused}
            isVisible={isVisible}
            isTypedInWord={isActive && index < typedChars}
          />
        ))}
      </div>
    );
  }
);

export default Word;

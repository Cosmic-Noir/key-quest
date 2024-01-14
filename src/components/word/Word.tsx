import React, { forwardRef } from "react";
import "./word.sass";
import { Letter } from "../letter";
import classNames from "classnames";

interface WordProps {
  word: string;
  style: React.CSSProperties;
  isPaused: boolean;
  isActive: boolean;
  typedChars: number;
  isVisible?: boolean;
  className?: string;
}

const Word = forwardRef<HTMLDivElement, WordProps>(
  (
    { word, style, isPaused, isActive, typedChars, isVisible, className },
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
            isPaused={isPaused}
            isInWord={true}
            isHighlighted={isActive && index === typedChars}
            isVisible={isVisible}
            isTypedInWord={isActive && index < typedChars}
          />
        ))}
      </div>
    );
  }
);

export default Word;

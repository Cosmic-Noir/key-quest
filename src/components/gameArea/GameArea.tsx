import React, { useEffect, useState, useRef } from "react";
import { Letter } from "../letter";
import { Word } from "../word";
import "./gameArea.sass";

interface GameElement {
  char: string;
  top: number;
  typed: boolean; //Indicating if the element has been typed
  isPaused: boolean;
  isVisible: boolean;
  hasCollided?: boolean;
}

interface GameAreaProps {
  isPaused: boolean;
  setHealth: React.Dispatch<React.SetStateAction<number>>;
  forceFieldRef: React.RefObject<HTMLDivElement>;
  setLevelScore: React.Dispatch<React.SetStateAction<number>>;
  onTotalKeystrokesChange: React.Dispatch<React.SetStateAction<number>>;
  onCorrectKeystrokesChange: React.Dispatch<React.SetStateAction<number>>;
  difficulty: string;
  words: Array<string>;
  letters: Array<string>;
}

const GameArea: React.FC<GameAreaProps> = ({
  isPaused,
  setHealth,
  forceFieldRef,
  setLevelScore,
  onTotalKeystrokesChange,
  onCorrectKeystrokesChange,
  difficulty,
  words,
  letters,
}) => {
  const [elements, setElements] = useState<GameElement[]>([]);
  const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null);
  const [typedChars, setTypedChars] = useState<number>(0);

  const elementsRef = useRef<GameElement[]>([]);

  useEffect(() => {
    elementsRef.current = elements;
  }, [elements]);

  // Function to handle pop effect and removal
  const triggerPopEffect = (elementIndex: number) => {
    const popDuration = 500; // Duration of the pop effect
    const elementToPop = document.querySelector(
      `[data-index="${elementIndex}"]`
    );

    if (elementToPop) {
      const dingSound = new Audio("/ding.wav");
      dingSound.volume = 0.5;
      dingSound.play();
      elementToPop.classList.add("pop");

      // Remove the class and hide the element after the effect duration
      setTimeout(() => {
        elementToPop.classList.remove("pop");
        // Update state to hide the element
        setElements((prevElements) =>
          prevElements.map((el, index) =>
            index === elementIndex
              ? { ...el, isVisible: false, typed: false }
              : el
          )
        );
      }, popDuration);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      console.log("key pressed?");
      if (isPaused) return;

      if (event.key !== "Shift") {
        onTotalKeystrokesChange((prev) => prev + 1);
      }

      let updatedElements = [...elementsRef.current];
      let foundMatch = false;

      // Check if there is an active word
      if (activeWordIndex !== null) {
        const activeElement = updatedElements[activeWordIndex];

        if (activeElement && typeof activeElement.char === "string") {
          const targetChar = activeElement.char[typedChars];

          if (targetChar && event.key === targetChar) {
            onCorrectKeystrokesChange((prev) => prev + 1);
            foundMatch = true;

            if (typedChars === activeElement.char.length - 1) {
              // Word completed
              triggerPopEffect(activeWordIndex);
              setActiveWordIndex(null);
              setTypedChars(0);
              setLevelScore((prevScore) => prevScore + 10);
            } else {
              // Continue typing the word
              setTypedChars(typedChars + 1);
            }
          }
        }
      } else {
        // Check for first letter matches among all elements if no active word
        for (let index = 0; index < updatedElements.length; index++) {
          const el = updatedElements[index];

          if (typeof el.char === "string") {
            const targetChar = el.char[0];

            if (el.isVisible && targetChar && event.key === targetChar) {
              onCorrectKeystrokesChange((prev) => prev + 1);
              foundMatch = true;

              if (el.char.length === 1) {
                // Single letter, pop effect and increase score
                triggerPopEffect(index);
                setLevelScore((prevScore) => prevScore + 5);
              } else {
                // Start typing a word
                setActiveWordIndex(index);
                setTypedChars(1);
              }
              // Exit loop after finding a match
              break;
            }
          }
        }
      }

      if (foundMatch) {
        setElements(updatedElements);
      }
    };

    if (!isPaused) {
      window.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [activeWordIndex, typedChars, isPaused]);

  useEffect(() => {
    const intervalTime =
      difficulty === "hard" ? 900 : difficulty === "medium" ? 1500 : 2000;

    const getRandomElement = () => {
      // 50% chance to choose a word
      const isWord = Math.random() > 0.5;
      const char = isWord
        ? words[Math.floor(Math.random() * words.length)]
        : letters[Math.floor(Math.random() * letters.length)];
      // Random top position as a percentage of the GameArea height
      const top = Math.random() * 100;

      return { char, top, typed: false, isPaused: false, isVisible: true };
    };
    let interval: any;

    if (!isPaused) {
      interval = setInterval(() => {
        setElements((prev) => [...prev, getRandomElement()]);
      }, intervalTime);
    }

    return () => clearInterval(interval);
  }, [isPaused, difficulty]);

  useEffect(() => {
    const checkCollision = () => {
      // Ensure the force field ref is not null
      if (forceFieldRef.current) {
        const forceFieldRect = forceFieldRef.current.getBoundingClientRect();
        const forceFieldPosition = forceFieldRect.right;

        // Iterate over each game element to check for collision
        elements.forEach((el, index) => {
          if (el.hasCollided) return;

          // Query for the element in the DOM
          const elementRef = document.querySelector(`[data-index="${index}"]`);

          if (elementRef) {
            const elementRect = elementRef.getBoundingClientRect();

            // Check if the element has collided with the force field
            if (elementRect.right <= forceFieldPosition) {
              // Mark element as collided:
              setElements((prevElements) =>
                prevElements.map((elem, idx) =>
                  idx === index ? { ...elem, hasCollided: true } : elem
                )
              );

              // Handle the collision:
              // 1. Deduct health

              setHealth((prevHealth) => Math.max(prevHealth - 5, 0));
              triggerFizzleEffect(index);

              // 3. If the element is the active word, reset the active word index
              if (index === activeWordIndex) {
                setActiveWordIndex(null);
              }
            }
          }
        });
      }
    };

    // Function to handle Fizzle effect and removal
    const triggerFizzleEffect = (elementIndex: number) => {
      const fizzleDuration = 500;

      // Get the element to apply the effect
      const elementToFizz = document.querySelector(
        `[data-index="${elementIndex}"]`
      );

      if (elementToFizz) {
        elementToFizz.classList.add("fizzle");

        const zapSound = new Audio("/fizzle.wav");
        zapSound.volume = 0.5;
        zapSound.play();

        // Remove the class and hide the element after the effect duration
        setTimeout(() => {
          elementToFizz.classList.remove("fizzle");
          // Update state to hide the element
          setElements((prevElements) =>
            prevElements.map((el, index) =>
              index === elementIndex
                ? { ...el, isVisible: false, typed: false }
                : el
            )
          );
        }, fizzleDuration);
      }
    };

    // Set an interval to repeatedly check for collisions
    const interval = setInterval(checkCollision, 100);
    return () => clearInterval(interval);
  }, [elements, forceFieldRef, activeWordIndex, setHealth]);

  return (
    <div className="gameArea">
      {elements.map((element, index) =>
        element.isVisible ? (
          element.char.length === 1 ? (
            <Letter
              key={index}
              ref={(ref) =>
                ref && ref.setAttribute("data-index", index.toString())
              }
              letter={element.char}
              style={{ top: `${element.top}%` }}
              isPaused={isPaused}
              isVisible={element.isVisible}
              className={difficulty}
            />
          ) : (
            <Word
              key={index}
              ref={(ref) =>
                ref && ref.setAttribute("data-index", index.toString())
              }
              word={element.char}
              style={{ top: `${element.top}%` }}
              isPaused={isPaused}
              isActive={index === activeWordIndex}
              typedChars={typedChars}
              isVisible={element.isVisible}
              className={difficulty}
            />
          )
        ) : null
      )}
    </div>
  );
};

export default GameArea;

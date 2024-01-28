import React, { useEffect, useState, useRef } from "react";
import { dingSound, fizzleSound } from "../../sounds/index";
import { Letter } from "../letter";
import { Word } from "../word";
import "./gameArea.sass";

type WordsType = {
  [key: string]: Array<string>;
  easy: Array<string>;
  medium: Array<string>;
  hard: Array<string>;
};

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
  words: WordsType;
  letters: Array<string>;
  fxVolume: GLfloat;
  isFxSoundOn: boolean;
  autoSpawnEnabled: boolean;
  spawnInterval: number;
  scrollSpeed: number;
}

const GameArea: React.FC<GameAreaProps> = ({
  isPaused,
  setHealth,
  setLevelScore,
  onTotalKeystrokesChange,
  onCorrectKeystrokesChange,
  difficulty,
  words,
  letters,
  fxVolume,
  isFxSoundOn,
  autoSpawnEnabled,
  spawnInterval,
  scrollSpeed,
}) => {
  const [elements, setElements] = useState<GameElement[]>([]);
  const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null);
  const [typedChars, setTypedChars] = useState<number>(0);

  const elementsRef = useRef<GameElement[]>([]);

  useEffect(() => {
    elementsRef.current = elements;
  }, [elements]);

  const getRandomElement = () => {
    // 50% chance to choose a word
    const isWord = Math.random() > 0.5;
    let availableWords = words[difficulty];

    if (difficulty === "easy") {
      availableWords = availableWords.map((w) => w.toLowerCase());
    }
    let char = isWord
      ? availableWords[Math.floor(Math.random() * availableWords.length)]
      : letters[Math.floor(Math.random() * letters.length)];

    if (difficulty === "easy") {
      char = char.toLowerCase();
    }
    // Random top position as a percentage of the GameArea height
    const top = Math.random() * 100;

    return { char, top, typed: false, isPaused: false, isVisible: true };
  };

  // Function to handle pop effect and removal
  const triggerPopEffect = (elementIndex: number) => {
    const popDuration = 500; // Duration of the pop effect
    const elementToPop = document.querySelector(
      `[data-index="${elementIndex}"]`
    );

    if (elementToPop) {
      elementToPop.classList.add("pop");
      if (isFxSoundOn) dingSound(fxVolume);

      // Remove the class and hide the element after the effect duration
      setTimeout(() => {
        elementToPop.classList.remove("pop");
        // Todo - Why not just add 'hidden' class intead of mapping? Seems unperformant, we already have the element.
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

  // Function to handle Fizzle effect and removal
  const triggerFizzleEffect = (elementIndex: number) => {
    const fizzleDuration = 500;

    // Get the element to apply the effect
    const elementToFizz = document.querySelector(
      `[data-index="${elementIndex}"]`
    );

    if (elementToFizz) {
      elementToFizz.classList.add("fizzle");
      if (isFxSoundOn) fizzleSound(fxVolume);

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

  const triggerShieldCollisionEffect = () => {
    const gameArea = document.querySelector(".gameArea") as HTMLElement | null;
    if (gameArea) {
      gameArea.style.setProperty("--after-background", "red");
      setTimeout(() => {
        gameArea.style.removeProperty("--after-background");
      }, 500);
    }
  };

  useEffect(() => {
    if (autoSpawnEnabled) {
      const allElementsInvisible = elements.every((el) => !el.isVisible);

      if (allElementsInvisible) {
        const newElement = getRandomElement();
        setElements((prevElements) => [...prevElements, newElement]);
      }
    }
  }, [elements, autoSpawnEnabled]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
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
  }, [activeWordIndex, typedChars, isPaused, fxVolume, isFxSoundOn]);

  useEffect(() => {
    let interval: any;

    if (!isPaused) {
      interval = setInterval(() => {
        setElements((prev) => [...prev, getRandomElement()]);
      }, spawnInterval);
    }

    return () => clearInterval(interval);
  }, [isPaused, difficulty]);

  useEffect(() => {
    const checkCollision = () => {
      const gameArea = document.querySelector(".gameArea");

      if (gameArea) {
        const gameAreaRect = gameArea.getBoundingClientRect();
        // Iterate over each game element to check for collision
        elements.forEach((el, index) => {
          if (el.hasCollided) return;

          // Query for the element in the DOM
          const elementRef = document.querySelector(`[data-index="${index}"]`);

          if (elementRef) {
            const elementRect = elementRef.getBoundingClientRect();
            // Check if the element has collided with the GameArea edge
            if (elementRect.left <= gameAreaRect.left + 20) {
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
              triggerShieldCollisionEffect();

              // 3. If the element is the active word, reset the active word index
              if (index === activeWordIndex) {
                setActiveWordIndex(null);
              }
            }
          }
        });
      }
    };

    // Set an interval to repeatedly check for collisions
    const interval = setInterval(checkCollision, 100);
    return () => clearInterval(interval);
  }, [elements, activeWordIndex, setHealth, isFxSoundOn, fxVolume]);

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
              className={`scroll-speed-${scrollSpeed}`}
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
              className={`scroll-speed-${scrollSpeed}`}
            />
          )
        ) : null
      )}
    </div>
  );
};

export default GameArea;

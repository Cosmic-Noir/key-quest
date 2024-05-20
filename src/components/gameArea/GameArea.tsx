import React, { useEffect, useState, useRef } from "react";
import { useGameSettings } from "hooks/useGameSettings";
import { useSoundSettings } from "hooks/useSoundSettings";
import { dingSound, fizzleSound } from "sounds/index";
import { ImageGallery } from "components/imageGallery";
import { Letter } from "components/letter";
import { Word } from "components/word";
import levels, { Difficulty } from "levels";

import "./gameArea.sass";
import DIFFICULTIES from "difficulties";

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
  setLevelScore: React.Dispatch<React.SetStateAction<number>>;
  onTotalKeystrokesChange: React.Dispatch<React.SetStateAction<number>>;
  onCorrectKeystrokesChange: React.Dispatch<React.SetStateAction<number>>;
  selectedLevel: number;
}

const GameArea: React.FC<GameAreaProps> = ({
  isPaused,
  setHealth,
  setLevelScore,
  onTotalKeystrokesChange,
  onCorrectKeystrokesChange,
  selectedLevel,
}) => {
  const { gameSettings } = useGameSettings();
  const { difficulty, autoSpawnEnabled, spawnInterval, scrollSpeed } =
    gameSettings!;

  const { soundSettings } = useSoundSettings();
  const { isFxSoundOn, fxVolume } = soundSettings!;

  const [elements, setElements] = useState<GameElement[]>([]);
  const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null);
  const [typedChars, setTypedChars] = useState<number>(0);

  const level = levels[selectedLevel];
  const words = level.words[difficulty as Difficulty];
  const letters = level.letters;

  const elementsRef = useRef<GameElement[]>([]);

  useEffect(() => {
    elementsRef.current = elements;
  }, [elements]);

  const getRandomElement = () => {
    // 50% chance to choose a word
    const isWord = Math.random() > 0.5;
    let availableWords = words;

    if (difficulty === "easy") {
      availableWords = availableWords.map((w: string) => w.toLowerCase());
    }
    let char = isWord
      ? availableWords[Math.floor(Math.random() * availableWords.length)]
      : letters[Math.floor(Math.random() * letters.length)];

    if (difficulty === "easy") {
      char = char.toLowerCase();
    }
    // Random top position as a percentage of the GameArea height
    const top = Math.random() * 100;

    return {
      char,
      top,
      typed: false,
      isPaused: false,
      isVisible: true,
    };
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
      const scoreMultiplier = DIFFICULTIES[difficulty].scoreMultiplier;

      // If there is currently an active word being typed:
      if (activeWordIndex !== null) {
        const activeElement = updatedElements[activeWordIndex];

        if (activeElement && typeof activeElement.char === "string") {
          const targetChar = activeElement.char[typedChars];

          if (targetChar && event.key === targetChar) {
            onCorrectKeystrokesChange((prev) => prev + 1);
            foundMatch = true;

            if (typedChars === activeElement.char.length - 1) {
              // Word completed
              setActiveWordIndex(null);
              setTypedChars(0);
              triggerPopEffect(activeWordIndex);
              const points = 10 * scoreMultiplier;
              setLevelScore((prevScore) => prevScore + points);
            } else {
              // Continue typing the word
              setTypedChars(typedChars + 1);
            }
          }
        }
      } else {
        for (let index = 0; index < updatedElements.length; index++) {
          const el = updatedElements[index];

          if (typeof el.char === "string") {
            const targetChar = el.char[0];

            // Check if element is marked as popped
            const elementRef = document.querySelector(
              `[data-index="${index}"]`
            );
            if (elementRef?.classList.contains("pop")) continue;

            if (el.isVisible && targetChar && event.key === targetChar) {
              onCorrectKeystrokesChange((prev) => prev + 1);
              foundMatch = true;

              if (el.char.length === 1) {
                // Single letter, pop effect and increase score
                triggerPopEffect(index);
                const points = 2 * scoreMultiplier;
                setLevelScore((prevScore) => prevScore + points);
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
          if (el.hasCollided || !el.isVisible) return;

          const elementRef = document.querySelector(`[data-index="${index}"]`);

          if (elementRef) {
            if (elementRef.classList.contains("pop")) return;

            const elementRect = elementRef.getBoundingClientRect();
            // Check if the element has collided with the GameArea edge
            // Todo - Check if element has been marked as `pop` so we don't collide correct characters
            if (elementRect.left <= gameAreaRect.left + 20) {
              // Mark element as collided:
              setElements((prevElements) =>
                prevElements.map((elem, idx) =>
                  idx === index ? { ...elem, hasCollided: true } : elem
                )
              );

              // If the element is the active word, reset the active word index
              if (index === activeWordIndex) {
                setActiveWordIndex(null);
              }

              // Handle the collision:
              triggerShieldCollisionEffect();
              // Deduct health
              setHealth((prevHealth) => Math.max(prevHealth - 5, 0));
              // Fizzle the word
              triggerFizzleEffect(index);
            }
          }
        });
      }
    };

    // Set an interval to repeatedly check for collisions
    const interval = setInterval(checkCollision, 100);
    return () => clearInterval(interval);
  }, [elements, activeWordIndex, setHealth, isFxSoundOn, fxVolume]);

  const levelImages = level.levelImages ?? [];

  return (
    <div className="gameArea">
      {<ImageGallery srcs={levelImages} />}
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

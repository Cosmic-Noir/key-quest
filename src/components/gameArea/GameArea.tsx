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
}

interface GameAreaProps {
  isPaused: boolean;
  setHealth: React.Dispatch<React.SetStateAction<number>>;
  forceFieldRef: React.RefObject<HTMLDivElement>;
  setLevelScore: React.Dispatch<React.SetStateAction<number>>;
}

const GameArea: React.FC<GameAreaProps> = ({
  isPaused,
  setHealth,
  forceFieldRef,
  setLevelScore,
}) => {
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");
  const words = [
    "Hello",
    "World",
    "React",
    "Game",
    "Type",
    "Pew",
    "Laazzzeeerr",
    "Space",
    "Kitties",
    "Lobster",
    "Cosmos",
    "Milkyway",
    "Galaxy",
  ];
  const [elements, setElements] = useState<GameElement[]>([]);
  const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null);
  const [typedChars, setTypedChars] = useState<number>(0);
  const elementsRef = useRef<GameElement[]>([]);

  useEffect(() => {
    elementsRef.current = elements;
  }, [elements]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      let updatedElements = [...elementsRef.current];
      let foundMatch = false;

      // Declare activeElement outside the if block
      let activeElement =
        activeWordIndex !== null ? updatedElements[activeWordIndex] : null;

      if (activeWordIndex !== null && activeElement) {
        const isCharAvailable = activeElement.char[typedChars];
        // Todo - We can eventually make this case-sensitive sense for shift
        const isCorrectKey =
          isCharAvailable &&
          activeElement.char[typedChars].toLowerCase() ===
            event.key.toLowerCase();

        if (isCorrectKey) {
          foundMatch = true;
          if (typedChars === activeElement.char.length - 1) {
            // Word completed
            triggerPopEffect(activeWordIndex);
            setActiveWordIndex(null);
            setTypedChars(0);
            // Total 15 for a word (5 for last letter + 10)
            setLevelScore((prevScore) => prevScore + 10);
          } else {
            // Continue typing the word
            setTypedChars(typedChars + 1);
          }
        }
      } else {
        updatedElements = updatedElements.map((el, index) => {
          if (foundMatch) return el;
          // Skip restof the loop if a match is already found
          const isElementVisible = el.isVisible;
          const isElementCharAvailable = el.char && el.char[0];
          const isCorrectKey =
            isElementCharAvailable &&
            el.char[0].toLowerCase() === event.key.toLowerCase();

          if (isElementVisible && isCorrectKey) {
            foundMatch = true;
            if (el.char.length === 1) {
              triggerPopEffect(index);
              // Increase score for a correctly typed letter
              setLevelScore((prevScore) => prevScore + 5);
            } else {
              setActiveWordIndex(index);
              setTypedChars(1);
            }
          }
          return el;
        });
      }

      if (foundMatch) {
        setElements(updatedElements);
      }
    };

    // Function to handle pop effect and removal
    const triggerPopEffect = (elementIndex: number) => {
      const popDuration = 500; // Duration of the pop effect
      const elementToPop = document.querySelector(
        `[data-index="${elementIndex}"]`
      );

      if (elementToPop) {
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

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [activeWordIndex, typedChars]);

  useEffect(() => {
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
      }, 1500);
    }

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    const checkCollision = () => {
      // Ensure the force field ref is not null
      if (forceFieldRef.current) {
        const forceFieldRect = forceFieldRef.current.getBoundingClientRect();
        const forceFieldPosition = forceFieldRect.right;

        // Iterate over each game element to check for collision
        elements.forEach((el, index) => {
          // Query for the element in the DOM
          const elementRef = document.querySelector(`[data-index="${index}"]`);

          if (elementRef) {
            const elementRect = elementRef.getBoundingClientRect();

            // Check if the element has collided with the force field
            if (elementRect.right <= forceFieldPosition) {
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
            />
          )
        ) : null
      )}
    </div>
  );
};

export default GameArea;

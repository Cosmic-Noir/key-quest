import React, { useEffect, useState } from 'react';
import { Letter } from '../letter';
import { Word } from '../word';
import './gameArea.sass'; 

interface GameElement {
  char: string;
  top: number;
  typed: boolean; //Indicating if the element has been typed
  isPaused: boolean
}

interface GameAreaProps {
  isPaused: boolean
}


const GameArea: React.FC<GameAreaProps> = ({ isPaused }) => {
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const words = ['Hello', 'World', 'React', 'Game', 'Type', 'Pew', 'Laazzzeeerr'];
  const [elements, setElements] = useState<GameElement[]>([]);
  const [lastKeyPressed, setLastKeyPressed] = useState<string>('');
  const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null);
  const [typedChars, setTypedChars] = useState<number>(0);

  const getRandomElement = () => {
    // 50% chance to choose a word
    const isWord = Math.random() > 0.5; 
    const char = isWord ? words[Math.floor(Math.random() * words.length)] : letters[Math.floor(Math.random() * letters.length)];
    // Random top position as a percentage of the GameArea height
    const top = Math.random() * 100; 

    return { char, top, typed: false, isPaused: false };
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      let updatedElements = [...elements];
      let foundMatch = false;
  
      // Check if we are currently typing a word
      if (activeWordIndex !== null) {
        // Handle typing for the active word
        const activeElement = updatedElements[activeWordIndex];
        if (activeElement && activeElement.char[typedChars].toLowerCase() === event.key.toLowerCase()) {
          // Correct key for the current position in the word
          foundMatch = true;
          if (typedChars === activeElement.char.length - 1) {
            // Word completed
            updatedElements[activeWordIndex] = { ...activeElement, char: '' };
            setActiveWordIndex(null);
            setTypedChars(0);
          } else {
            // Continue typing the word
            setTypedChars(typedChars + 1);
          }
        }
      } else {
        // Find the first letter or word that matches
        updatedElements = updatedElements.map((el, index) => {
          if (!foundMatch && el.char[0].toLowerCase() === event.key.toLowerCase()) {
            foundMatch = true;
            if (el.char.length === 1) {
              // It's a single letter, remove it
              return { ...el, char: '' };
            } else {
              // It's a word, set it as active
              setActiveWordIndex(index);
              setTypedChars(1);
            }
          }
          return el;
        });
      }
  
      // Only update elements if a match was found
      if (foundMatch) {
        console.log('Updated elements:', updatedElements);
          setElements(updatedElements.filter(el => el.char.length > 0));
      }
  };
  

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [elements, activeWordIndex, typedChars]);

  useEffect(() => {
    let interval: any;

    if (!isPaused) {
      interval = setInterval(() => {
        setElements(prev => [...prev, getRandomElement()]);
      }, 2000); // Adjust interval as needed
    }

  return () => clearInterval(interval);
}, [isPaused]);

    return (
      <div className="gameArea">
      {elements.map((element, index) => (
        element.char.length > 0 ? 
        (element.char.length === 1 ? 
          <Letter
            key={index}
            letter={element.char}
            style={{ top: `${element.top}%` }}
            isPaused={isPaused}
          /> : 
          <Word
            key={index}
            word={element.char}
            style={{ top: `${element.top}%` }}
            isPaused={isPaused}
            isActive={index === activeWordIndex}
            typedChars={typedChars}
          />)
        : null
      ))}
  </div>
    );
};

export default GameArea;

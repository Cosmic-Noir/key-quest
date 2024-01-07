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
    const [elements, setElements] = useState<GameElement[]>([]);
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const words = ['Hello', 'World', 'React', 'Game', 'Type']; // Add more words as needed
    const [lastKeyPressed, setLastKeyPressed] = useState<string>('');
    const getRandomElement = () => {
        const isWord = Math.random() > 0.5; // 50% chance to choose a word
        const char = isWord ? words[Math.floor(Math.random() * words.length)] : letters[Math.floor(Math.random() * letters.length)];
        const top = Math.random() * 100; // Random top position as a percentage of the GameArea height

        return { char, top, typed: false, isPaused: false };
    };

    useEffect(() => {
      const handleKeyPress = (event: KeyboardEvent) => {
          setLastKeyPressed(event.key); // For testing, show the last key pressed
          setElements(prevElements => 
              prevElements.map(el => {
                  if (!el.typed && el.char[0].toLowerCase() === event.key.toLowerCase()) {
                      return { ...el, char: el.char.substring(1), typed: el.char.length === 1 };
                  }
                  return el;
              })
          );
      };

      window.addEventListener('keydown', handleKeyPress);

      return () => {
          window.removeEventListener('keydown', handleKeyPress);
      };
  }, []);

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
              />)
          : null
      ))}
      <div className="keyPressDisplay">Last Key Pressed: {lastKeyPressed}</div> {/* Testing div */}
  </div>
    );
};

export default GameArea;

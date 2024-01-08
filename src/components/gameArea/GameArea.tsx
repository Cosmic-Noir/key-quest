import React, { useEffect, useState, useRef } from 'react';
import { Letter } from '../letter';
import { Word } from '../word';
import './gameArea.sass'; 

interface GameElement {
  char: string;
  top: number;
  typed: boolean; //Indicating if the element has been typed
  isPaused: boolean;
  popEffect?: boolean;
  isVisible: boolean;
}

interface GameAreaProps {
  isPaused: boolean
}


const GameArea: React.FC<GameAreaProps> = ({ isPaused }) => {
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const words = ['Hello', 'World', 'React', 'Game', 'Type', 'Pew', 'Laazzzeeerr'];
  const [elements, setElements] = useState<GameElement[]>([]);
  const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null);
  const [typedChars, setTypedChars] = useState<number>(0);
  const elementsRef = useRef<GameElement[]>([]);
  const [forceUpdate, setForceUpdate] = useState(0); // Dummy state

  useEffect(() => {
    elementsRef.current = elements;
  }, [elements]);  

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      let updatedElements = [...elementsRef.current];
      let foundMatch = false;
  
      if (activeWordIndex !== null) {
        const activeElement = updatedElements[activeWordIndex];
        if (activeElement && activeElement.char[typedChars] && activeElement.char[typedChars].toLowerCase() === event.key.toLowerCase()) {
          foundMatch = true;
          if (typedChars === activeElement.char.length - 1) {
            // Word completed
            triggerPopEffect(activeWordIndex);
            setActiveWordIndex(null);
            setTypedChars(0);
          } else {
            // Continue typing the word
            setTypedChars(typedChars + 1);
          }
        }
      } else {
          updatedElements = updatedElements.map((el, index) => {
            if (!foundMatch && el.isVisible && el.char && el.char[0].toLowerCase() === event.key.toLowerCase()) {
              foundMatch = true;
              if (el.char.length === 1) {
                triggerPopEffect(index);
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

      // Get the element to apply the effect
      const elementToPop = document.querySelector(`[data-index="${elementIndex}"]`);

      if (elementToPop) {
        elementToPop.classList.add('pop');

        // Remove the class and hide the element after the effect duration
        setTimeout(() => {
          elementToPop.classList.remove('pop');
          // Update state to hide the element
          setElements(prevElements => prevElements.map((el, index) => 
            index === elementIndex ? { ...el, isVisible: false, typed: false } : el));
        }, popDuration);
      }
    };
  
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [activeWordIndex, typedChars]);

  useEffect(() => {
    // Apply popEffect to all elements after a delay
    const applyPopEffect = setTimeout(() => {
      setElements(prevElements => prevElements.map(el => ({ ...el, popEffect: true })));
  }, 2000); // Apply pop effect after 2 seconds

    return () => clearTimeout(applyPopEffect);
  }, [elements]);


  useEffect(() => {
    const getRandomElement = () => {
      // 50% chance to choose a word
      const isWord = Math.random() > 0.5; 
      const char = isWord ? words[Math.floor(Math.random() * words.length)] : letters[Math.floor(Math.random() * letters.length)];
      // Random top position as a percentage of the GameArea height
      const top = Math.random() * 100; 
  
      return { char, top, typed: false, isPaused: false, isVisible: true };
    };
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
        element.isVisible ? 
          (element.char.length === 1 ? 
            <Letter
              key={index}
              ref={ref => ref && ref.setAttribute('data-index', index.toString())}
              letter={element.char}
              style={{ top: `${element.top}%` }}
              isPaused={isPaused}
              popEffect={element.popEffect}
              isVisible={element.isVisible}
            /> : 
            <Word
              key={index}
              ref={ref => ref && ref.setAttribute('data-index', index.toString())}
              word={element.char}
              style={{ top: `${element.top}%` }}
              isPaused={isPaused}
              isActive={index === activeWordIndex}
              typedChars={typedChars}
              popEffect={element.popEffect}
              isVisible={element.isVisible}
            />)
          : null
      ))}
    </div>
  );
};

export default GameArea;

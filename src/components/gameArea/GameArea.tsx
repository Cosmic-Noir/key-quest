import React, { useEffect, useState } from 'react';
import { Letter } from '../letter';
import { Word } from '../word';
import './gameArea.sass';

const GameArea: React.FC = () => {
    const [elements, setElements] = useState<string[]>([]);
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const words = ['Hello', 'World', 'React', 'Game', 'Type']; // Add more words as needed

    const getRandomElement = () => {
        const isWord = Math.random() > 0.5; // 50% chance to choose a word
        if (isWord) {
            return words[Math.floor(Math.random() * words.length)];
        } else {
            return letters[Math.floor(Math.random() * letters.length)];
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setElements(prev => [...prev, getRandomElement()]);
        }, 2000); // Adjust interval as needed

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="gameArea">
            {elements.map((el, index) => (
                <Letter key={index} letter={el} /> // Or use <Word> for words
            ))}
        </div>
    );
};

export default GameArea;

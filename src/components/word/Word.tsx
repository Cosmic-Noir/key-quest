import React from 'react';
import './word.sass';
import { Letter } from '../letter';

interface WordProps {
    word: string;
    // Additional props can be added as needed
}

const Word: React.FC<WordProps> = ({ word }) => {
    return (
        <div className="word">
            {word.split('').map((char, index) => (
                <Letter key={index} letter={char} />
            ))}
        </div>
    );
};

export default Word;

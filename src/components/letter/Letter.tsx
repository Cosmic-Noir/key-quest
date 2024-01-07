
import React from 'react';
import './letter.sass';

interface LetterProps {
    letter: string;
    // You can add more props as needed, like position, animation state, etc.
}

const Letter: React.FC<LetterProps> = ({ letter }) => {
    return <div className="letter">{letter}</div>;
};

export default Letter;

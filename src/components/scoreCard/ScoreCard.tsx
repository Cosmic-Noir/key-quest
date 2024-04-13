import React from "react";

import "./scoreCard.sass";

// Define the types for the props
interface ScoreCardProps {
  correctKeystrokes: number;
  levelScore: number;
  levelWon: boolean;
  totalKeystrokes: number;
  totalScore: number;
  wpm: number;
}

const ScoreCard: React.FC<ScoreCardProps> = ({
  correctKeystrokes,
  levelScore,
  levelWon,
  totalKeystrokes,
  totalScore,
  wpm,
}) => {
  return (
    <div className="score-card space-themed-header-text">
      <h1>Level completed!</h1>
      <h1>{levelWon ? "You WON" : "You lost..."}</h1>
      <div>Total Score: {totalScore}</div>
      <div>Level Score: {levelScore}</div>
      <div>
        Accuracy: {((correctKeystrokes / totalKeystrokes) * 100).toFixed(2)}%
      </div>
      <div>WPM: {wpm.toFixed(0)}</div>
    </div>
  );
};

export default ScoreCard;

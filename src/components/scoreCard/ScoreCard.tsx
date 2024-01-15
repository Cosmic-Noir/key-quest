import React from "react";

import "./scoreCard.sass";

// Define the types for the props
interface ScoreCardProps {
  totalScore: number;
  levelScore: number;
  correctKeystrokes: number;
  totalKeystrokes: number;
  wpm: number;
}

const ScoreCard: React.FC<ScoreCardProps> = ({
  totalScore,
  levelScore,
  correctKeystrokes,
  totalKeystrokes,
  wpm,
}) => {
  return (
    <div className="space-themed-text">
      <div>Level completed!</div>
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

import React from "react";

import "./scoreCard.sass";

// Define the types for the props
interface ScoreCardProps {
  levelScore: number;
  levelWon: boolean;
  accuracy: number;
  totalScore: number;
  wpm: number;
  newHighScore: boolean;
}

const ScoreCard: React.FC<ScoreCardProps> = ({
  levelScore,
  levelWon,
  totalScore,
  newHighScore,
  accuracy,
  wpm,
}) => {
  return (
    <div className="score-card space-themed-header-text">
      <h1>Level completed!</h1>
      <h1>{levelWon ? "You WON" : "You lost..."}</h1>
      <div>Total Score: {totalScore.toLocaleString()}</div>
      <div>Level Score: {levelScore.toLocaleString()}</div>
      {newHighScore && (
        <div className="score-card_new-high-score">New high score!!</div>
      )}
      <div>Accuracy: {accuracy}%</div>
      <div>WPM: {wpm}</div>
    </div>
  );
};

export default ScoreCard;

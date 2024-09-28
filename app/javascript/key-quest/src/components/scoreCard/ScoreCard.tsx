import React from "react";

import "./scoreCard.sass";

// Define the types for the props
interface ScoreCardProps {
  accuracy: number;
  levelScore: number;
  levelWon: boolean;
  newAllTimeBest: boolean;
  newHighScore: boolean;
  totalScore: number;
  wpm: number;
}

const ScoreCard: React.FC<ScoreCardProps> = ({
  accuracy,
  levelScore,
  levelWon,
  newAllTimeBest,
  newHighScore,
  totalScore,
  wpm,
}) => {
  return (
    <div className="score-card space-themed-header-text">
      <h1>Level completed!</h1>
      <h1>{levelWon ? "You WON" : "You lost..."}</h1>
      <div>Total Score: {totalScore.toLocaleString()}</div>
      {newAllTimeBest && (
        <div className="score-card_new-all-time-best">New all-time best!!</div>
      )}
      {newHighScore && (
        <div className="score-card_new-high-score">New high score!!</div>
      )}
      <div>Level Score: {levelScore.toLocaleString()}</div>
      <div>Accuracy: {accuracy}%</div>
      <div>WPM: {wpm}</div>
    </div>
  );
};

export default ScoreCard;

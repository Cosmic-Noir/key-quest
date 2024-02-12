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
  // function calculateFinalScore(
  //   wpm,
  //   accuracyPercentage,
  //   difficulty,
  //   levelScore
  // ) {
  //   const scoreMultiplier = getDifficultyMultiplier(difficulty); // Assume this function exists and returns a multiplier based on the difficulty
  //   const constant = 10; // Adjust based on your scoring preferences
  //   const baseScore = wpm * constant;
  //   const finalScore =
  //     (baseScore + levelScore) * accuracyPercentage * scoreMultiplier;

  //   return Math.round(finalScore); // Optionally round the score for cleaner display
  // }

  return (
    <div className="score-card space-themed-header-text">
      <h1>Level completed!</h1>
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

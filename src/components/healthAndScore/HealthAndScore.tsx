import React from "react";
import "./healthAndScore.sass";

interface HealthAndScoreProps {
  health: number;
  score: number;
}

const HealthAndScore: React.FC<HealthAndScoreProps> = ({ health, score }) => {
  return (
    <div className="healthAndScore">
      <div className="healthBar" style={{ width: `${health}%` }}></div>
      <div className="score">Score: {score}</div>
    </div>
  );
};

export default HealthAndScore;

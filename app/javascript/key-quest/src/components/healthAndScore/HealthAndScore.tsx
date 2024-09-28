import React from "react";
import "./healthAndScore.sass";

interface HealthAndScoreProps {
  health: number;
  score: number;
  time: number;
}

const HealthAndScore: React.FC<HealthAndScoreProps> = ({
  health,
  score,
  time,
}) => {
  return (
    <div className="healthAndScore space-container fade-in">
      <div className="healthBar" style={{ width: `${health}%` }}></div>
      <div className="stats">
        <span className="score">Score: {score}</span>
        <span className="time">Time remaining: {time}</span>
      </div>
    </div>
  );
};

export default HealthAndScore;

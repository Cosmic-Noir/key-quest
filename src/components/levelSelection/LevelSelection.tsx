import Button from "@mui/material/Button";
import { Level } from "../level";
import { useScoreTracking } from "../../hooks/useScoreTracking";
import levels from "../../levels";

import "./levelSelection.sass";

interface LevelSelectionProps {
  selectedLevel: number;
  handleLevelChange: (levelIndex: number) => void;
  handleStartLevel: () => void;
}

const LevelSelection: React.FC<LevelSelectionProps> = ({
  selectedLevel,
  handleLevelChange,
  handleStartLevel,
}) => {
  const { gameScores, isScoresLoading } = useScoreTracking();

  return (
    <div className="levels space-themed-header-text fade-in">
      {isScoresLoading ? (
        <div></div>
      ) : (
        <>
          <div>Select Level:</div>
          <div className="levels-container">
            {levels.map((level, index) => (
              <Level
                index={index}
                level={level}
                selectedLevel={selectedLevel}
                handleLevelChange={() => handleLevelChange(index)}
                key={index}
                locked={index > (gameScores?.highestLevelCompleted ?? 0)}
              />
            ))}
          </div>
          <Button variant="contained" size="large" onClick={handleStartLevel}>
            Start Level
          </Button>
        </>
      )}
    </div>
  );
};

export default LevelSelection;

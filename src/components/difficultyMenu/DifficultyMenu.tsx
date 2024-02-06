import React from "react";
import classNames from "classnames";

import "./difficultyMenu.sass";

interface DifficultySelectorProps {
  difficulty: string;
  handleDifficultyChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  difficulty,
  handleDifficultyChange,
}) => {
  return (
    <div className="difficultyMenu">
      <h3 className="space-themed-header-text">Difficulty:</h3>
      <div>
        <input
          type="radio"
          id="easy"
          name="difficulty"
          value="easy"
          checked={difficulty === "easy"}
          onChange={handleDifficultyChange}
        />
        <label
          htmlFor="easy"
          className={classNames({ active: difficulty === "easy" })}
        >
          Space Cadet
        </label>
      </div>
      <div>
        <input
          type="radio"
          id="medium"
          name="difficulty"
          value="medium"
          checked={difficulty === "medium"}
          onChange={handleDifficultyChange}
        />
        <label
          htmlFor="medium"
          className={classNames({ active: difficulty === "medium" })}
        >
          Orbital Officer
        </label>
      </div>
      <div>
        <input
          type="radio"
          id="hard"
          name="difficulty"
          value="hard"
          checked={difficulty === "hard"}
          onChange={handleDifficultyChange}
        />
        <label
          htmlFor="hard"
          className={classNames("", { active: difficulty === "hard" })}
        >
          Star Voyager
        </label>
      </div>
    </div>
  );
};

export default DifficultySelector;

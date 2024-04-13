import classNames from "classnames";

import "./level.sass";

// Assuming Level has a name and an img property
interface Level {
  name: string;
  img: string; // URL to the image
}

interface LevelProps {
  level: Level;
  index: number;
  selectedLevel: number;
  handleLevelChange: (index: number) => void;
  locked: boolean;
}

const Level: React.FC<LevelProps> = ({
  level,
  index,
  selectedLevel,
  handleLevelChange,
  locked,
}) => {
  return (
    <div
      key={index}
      className={classNames("level-container", { locked: locked })}
      onClick={() => (locked ? "" : handleLevelChange(index))}
    >
      <img
        src={level.img}
        alt={level.name}
        className={classNames("level-image", {
          bob: selectedLevel === index,
        })}
      />
      <label
        htmlFor={`level-${index}`}
        className={classNames({
          active: selectedLevel === index,
        })}
      >
        {level.name}
      </label>
      <input
        type="radio"
        id={`level-${index}`}
        name="level"
        value={index}
        disabled={locked}
        onChange={() => handleLevelChange(index)}
        className={classNames({ active: selectedLevel === index })}
      />
    </div>
  );
};

export default Level;

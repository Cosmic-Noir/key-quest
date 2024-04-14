import React from "react";
import classNames from "classnames";

import "./difficultyOption.sass";

interface DifficultyOptionProps {
  id: string;
  name: string;
  label: string;
  imageSrc: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

const DifficultyOption: React.FC<DifficultyOptionProps> = ({
  id,
  name,
  label,
  imageSrc,
  onChange,
  checked,
}) => {
  return (
    <div className="difficulty-container">
      <img
        src={imageSrc}
        className={classNames("difficulty-image", {
          bob: checked,
        })}
      />
      <input
        type="radio"
        id={id}
        name={name}
        value={id}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className={classNames({ active: checked })}>
        {label}
      </label>
    </div>
  );
};

export default DifficultyOption;

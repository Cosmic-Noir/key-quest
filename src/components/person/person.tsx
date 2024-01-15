import React from "react";

import astronaut from "./astronaut.png";
import "./person.sass"; // Importing the SASS file for styles

const Person: React.FC = () => {
  return (
    <div className="person bob">
      <img src={astronaut} />
    </div>
  );
};

export default Person;

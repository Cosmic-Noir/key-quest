import React from "react";

import astronaut from "./astronaut.png";
import "./person.sass";

const Person: React.FC = () => {
  return (
    <div className="person bob">
      <img src={astronaut} alt="Astronaut" />
    </div>
  );
};

export default Person;

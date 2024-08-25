import React, { useState } from "react";
import Button from "@mui/material/Button";
import { SoundSettings } from "components/soundSettings";
import { DifficultySelection } from "components/difficultySelection";
import { Tabs, Tab, Box } from "@mui/material";

import "./pauseMenu.sass";

interface PauseMenuProps {
  handlePause: () => void;
}

const PauseMenu: React.FC<PauseMenuProps> = ({ handlePause }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="pause-menu space-container">
      <Tabs value={value} onChange={handleChange} textColor="inherit">
        <Tab className="pause-menu__tab" label="Audio" />
        <Tab className="pause-menu__tab" label="Difficulty" />
      </Tabs>
      <Box p={3} className="pause-menu__content">
        {value === 0 && <SoundSettings />}
        {value === 1 && <DifficultySelection />}
        <Button
          variant="contained"
          size="large"
          className="difficulty-selection__button fade-in"
          onClick={handlePause}
        >
          Unpause
        </Button>
      </Box>
    </div>
  );
};

export default PauseMenu;

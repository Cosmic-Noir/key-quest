import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import "./advancedSettings.sass";

interface AdvancedSettingsProps {
  scrollSpeed: number;
  handleScrollSpeedChange: (value: number) => void;
  spawnInterval: number;
  handleSpawnIntervalChange: (value: number) => void;
  autoSpawnEnabled: boolean;
  handleAutoSpawnChange: (value: boolean) => void;
}

const AdvancedSettings: React.FC<AdvancedSettingsProps> = ({
  scrollSpeed,
  handleScrollSpeedChange,
  spawnInterval,
  handleSpawnIntervalChange,
  autoSpawnEnabled,
  handleAutoSpawnChange,
}) => {
  // Inverts the range from 4-7 to 7-4 for display
  const displayScrollSpeed = 11 - scrollSpeed;

  // Inverts the range from 900-2000 to 2000-900 for display
  const spawnIntervalValue = 2900 - spawnInterval;
  const seconds = spawnIntervalValue / 1000;
  const displaySpawnInterval = seconds.toFixed(2);

  return (
    <Accordion className="advanced-settings">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
      >
        <Typography className="advanced-settilngs_accodion-title">
          Advanced Settings
        </Typography>
      </AccordionSummary>
      <p className="advanced-settings_description">
        Each difficulty comes with preset values for the below settings. Adjust
        each setting for a more customized adventure.
      </p>
      <AccordionDetails className="advanced-settings_details">
        <Typography>Scroll Speed - {displayScrollSpeed}</Typography>
        <Slider
          className="advanced-settings_slider"
          value={displayScrollSpeed}
          onChange={(e, value) =>
            handleScrollSpeedChange(11 - (value as number))
          }
          step={1}
          marks
          min={3}
          max={8}
        />
        <Typography>Spawn Interval - {displaySpawnInterval} seconds</Typography>
        <Slider
          className="advanced-settings_slider"
          value={spawnIntervalValue}
          onChange={(_e, value) =>
            handleSpawnIntervalChange(2900 - (value as number))
          }
          step={100}
          marks
          min={900}
          max={2000}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={autoSpawnEnabled}
              onChange={(e) => handleAutoSpawnChange(e.target.checked)}
            />
          }
          label="Rapid Spawn"
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default AdvancedSettings;

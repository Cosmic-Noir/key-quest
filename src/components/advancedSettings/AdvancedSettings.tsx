import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { TooltipCustom } from "../tooltip";

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

  const maxInterval = 2000;
  const minInterval = 900;
  const spawnIntervalSliderValue = maxInterval - (spawnInterval - minInterval);
  const displaySpawnInterval = (
    (maxInterval - spawnIntervalSliderValue + minInterval) /
    1000
  ).toFixed(2);
  return (
    <Accordion className="advanced-settings">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
      >
        <Typography className="advanced-settilngs_accodion-title space-themed-header-text">
          Advanced Settings
        </Typography>
      </AccordionSummary>
      <p className="advanced-settings_description space-themed-text">
        Each difficulty comes with preset values for the below settings. Adjust
        each setting for a more customized adventure.
      </p>
      <AccordionDetails className="advanced-settings_details">
        <div className="advanced-settings_section">
          <Typography className="advanced-settings_label-container">
            Scroll Speed: {displayScrollSpeed}
            <TooltipCustom
              title={`Scroll Speed - determines how quickly words and letters are scrolled across the 
                    screen towards the player. The higher the speed, the faster a player must type.`}
            />
          </Typography>
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
        </div>
        <div className="advanced-settings_section">
          <Typography className="advanced-settings_label-container">
            Spawn Interval - {displaySpawnInterval} seconds
            <TooltipCustom
              title={`Spawn Interval - determines how often new words and and characters are added to
                    the game. The smaller the interval, the faster the player must type.`}
            />
          </Typography>
          <Slider
            className="advanced-settings_slider"
            value={spawnIntervalSliderValue}
            onChange={(_e, value) => {
              const actualValue = maxInterval - (value as number) + minInterval;
              handleSpawnIntervalChange(actualValue);
            }}
            step={100}
            marks
            min={900}
            max={2000}
          />
        </div>
        <div className="advanced-settings_section">
          <FormControlLabel
            control={
              <Checkbox
                checked={autoSpawnEnabled}
                onChange={(e) => handleAutoSpawnChange(e.target.checked)}
              />
            }
            label={
              <span>
                Rapid Spawn
                <TooltipCustom
                  title={`Rapid Spawn - determines if a new word or character should be automatically
                          added when there are no other words or letters. Makes the game more difficult.`}
                />
              </span>
            }
          />
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default AdvancedSettings;

import { useState } from "react";
import Button from "@mui/material/Button";
import { Audio } from "components/audio";
import { DifficultySelection } from "components/difficultySelection";
import { LevelSelection } from "components/levelSelection";
import { Loading } from "components/loading";
import { GameUI } from "components/gameUI";
import { PauseMenu } from "components/pauseMenu";
import { useGameSettings } from "hooks/useGameSettings";
import { useSoundSettings } from "hooks/useSoundSettings";
import { useScoreTracking } from "hooks/useScoreTracking";
import MenuIcon from "@mui/icons-material/Menu";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Logo from "./logo.png";

import "./App.sass";

const theme = createTheme({
  palette: {
    primary: {
      main: "#10a0df",
      contrastText: "#fff",
    },
    secondary: {
      main: "#1cd0f9",
    },
    error: {
      main: "#red",
    },
    background: {
      default: "#fff",
    },
    text: {
      primary: "#fff",
    },
  },
});

enum GamePhase {
  StartScreen,
  DifficultySelection,
  LevelSelection,
  GameUI,
}

const App: React.FC = () => {
  const { isSettingsLoading } = useGameSettings();
  const { soundSettings, isSoundSettingsLoading, updateSoundSettings } =
    useSoundSettings();
  const { isScoresLoading } = useScoreTracking();

  const loading =
    isSettingsLoading || isSoundSettingsLoading || isScoresLoading;

  // Game Settings
  const [currentPhase, setCurrentPhase] = useState<GamePhase>(
    GamePhase.StartScreen
  );
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<number>(0);

  const goToDifficultySelection = () =>
    setCurrentPhase(GamePhase.DifficultySelection);
  const goToLevelSelection = () => setCurrentPhase(GamePhase.LevelSelection);
  const startLevel = () => {
    updateSoundSettings({ ...soundSettings, isMusicPlaying: true });
    setIsGameStarted(true);
    setCurrentPhase(GamePhase.GameUI);
  };

  const handleLevelChange = (levelIndex: number) => {
    setSelectedLevel(levelIndex);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {loading ? (
          <Loading />
        ) : (
          <div className="App-content">
            <MenuIcon onClick={handlePause} id="menu-icon" />
            {isGameStarted && <Audio />}
            {isPaused && <div className="show-pause-menu"></div>}
            {isPaused && <PauseMenu handlePause={handlePause} />}
            {currentPhase === GamePhase.StartScreen && (
              <>
                <img src={Logo} className="logo bob-and-fade" />
                <Button
                  variant="contained"
                  size="large"
                  onClick={goToDifficultySelection}
                  className="fade-in"
                >
                  Start Game
                </Button>
              </>
            )}
            {currentPhase === GamePhase.DifficultySelection && (
              <DifficultySelection
                handleNext={goToLevelSelection}
                buttonText="Next"
              />
            )}
            {currentPhase === GamePhase.LevelSelection && (
              <LevelSelection
                selectedLevel={selectedLevel}
                handleLevelChange={handleLevelChange}
                handleStartLevel={startLevel}
              />
            )}
            {currentPhase === GamePhase.GameUI && (
              <GameUI
                isPaused={isPaused}
                handlePause={handlePause}
                selectedLevel={selectedLevel}
                handleLevelSelection={goToLevelSelection}
              />
            )}
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;

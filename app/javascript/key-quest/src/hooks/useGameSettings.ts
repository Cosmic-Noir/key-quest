import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import DIFFICULTIES from 'difficulties';

type GameSettings = {
  difficulty: string;
  autoSpawnEnabled: boolean;
  spawnInterval: number;
  scrollSpeed: number;
  description: string;
};

const LOCAL_STORAGE_KEY = 'gameSettings';
const defaultGameSettings: GameSettings = DIFFICULTIES.easy;

// Fetch settings from localStorage
const fetchGameSettings = async (): Promise<GameSettings> => {
  const storedSettings = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedSettings ? JSON.parse(storedSettings) : defaultGameSettings;
};

// Update settings in localStorage
const updateGameSettingsInStorage = async (
  newSettings: Partial<GameSettings>
): Promise<GameSettings> => {
  const currentSettings = await fetchGameSettings();
  const updatedSettings = { ...currentSettings, ...newSettings };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedSettings));
  return updatedSettings;
};

export const useGameSettings = () => {
  const queryClient = useQueryClient();

  const {
    data: gameSettings = defaultGameSettings, // Ensure fallback in case of undefined
    isLoading: isSettingsLoading,
    error: settingsError, // Capture any errors
  } = useQuery<GameSettings, Error>({
    queryKey: [LOCAL_STORAGE_KEY],
    queryFn: fetchGameSettings,
    // Handle stale data – could help if your UI is showing stale results
    staleTime: 1000 * 60 * 5, // Optional: Cache results for 5 mins
  });

  const {
    mutate: updateGameSettings,
    isSuccess: updateSuccess,
  } = useMutation<
    GameSettings,
    Error,
    Partial<GameSettings>,
    unknown
    >(
    {
      mutationFn: updateGameSettingsInStorage,
      onSuccess: (newSettings) => {
        queryClient.setQueryData<GameSettings>([LOCAL_STORAGE_KEY], newSettings); 
        queryClient.invalidateQueries({ queryKey: [LOCAL_STORAGE_KEY] }); // Ensure re-fetch
      },
    }
  );

  return {
    gameSettings,
    updateGameSettings,
    updateSuccess,
    isSettingsLoading,
    settingsError,
  };
};

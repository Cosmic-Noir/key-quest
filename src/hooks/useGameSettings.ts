import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import DIFFICULTIES from '../difficulties';

type GameSettings = {
  difficulty: string;
  autoSpawnEnabled: boolean;
  spawnInterval: number;
  scrollSpeed: number;
  description: string;
};

const LOCAL_STORAGE_KEY = 'gameSettings';
const defaultGameSettings: GameSettings = DIFFICULTIES.easy;

const fetchGameSettings = async (): Promise<GameSettings> => {
  const storedSettings = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedSettings ? JSON.parse(storedSettings) : defaultGameSettings;
};

const updateGameSettingsInStorage = async (newSettings: Partial<GameSettings>): Promise<GameSettings> => {
  const currentSettings = await fetchGameSettings();
  const updatedSettings = { ...currentSettings, ...newSettings };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedSettings));
  return updatedSettings;
};

export const useGameSettings = () => {
  const queryClient = useQueryClient();

  const { data: gameSettings, isLoading: isSettingsLoading } = useQuery<GameSettings, Error>({
    queryKey: [LOCAL_STORAGE_KEY],
    queryFn: fetchGameSettings
  });

  const { mutate: updateGameSettings, isSuccess } = useMutation<GameSettings, Error, Partial<GameSettings>>({
    mutationFn: updateGameSettingsInStorage,
    onSuccess: (newSettings) => {
      queryClient.setQueryData([LOCAL_STORAGE_KEY], (prevSettings: GameSettings) => ({ ...prevSettings, ...newSettings }));
    },
  });

  return { gameSettings, updateGameSettings, isSuccess, isSettingsLoading };
};


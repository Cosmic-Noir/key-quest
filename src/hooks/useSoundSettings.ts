import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface SoundSettings {
  isMusicPlaying: boolean;
  musicVolume: number;
  isFxSoundOn: boolean;
  fxVolume: number;
}

const defaultSoundSettings: SoundSettings = {
  isMusicPlaying: false,
  musicVolume: 0.5,
  isFxSoundOn: true,
  fxVolume: 0.5,
};

const fetchSoundSettings = async (): Promise<SoundSettings> => {
  const storedSettings = localStorage.getItem('soundSettings');
  return storedSettings ? JSON.parse(storedSettings) : defaultSoundSettings;
};

const updateSoundSettingsInStorage = async (newSettings: Partial<SoundSettings>): Promise<SoundSettings> => {
  const currentSettings = await fetchSoundSettings();
  const updatedSettings = { ...currentSettings, ...newSettings };
  localStorage.setItem('soundSettings', JSON.stringify(updatedSettings));
  return updatedSettings;
};

export const useSoundSettings = () => {
  const queryClient = useQueryClient();

  const { data: soundSettings, isLoading: isSoundSettingsLoading } = useQuery<SoundSettings, Error>({
    queryKey: ['soundSettings'],
    queryFn: fetchSoundSettings,
  });

  const { mutate: updateSoundSettings, isSuccess } = useMutation<SoundSettings, Error, Partial<SoundSettings>>({
    mutationFn: updateSoundSettingsInStorage,
    onSuccess: (newSettings) => {
      queryClient.setQueryData(['soundSettings'], newSettings);
    },
  });

  return { soundSettings, updateSoundSettings, isSuccess, isSoundSettingsLoading };
};

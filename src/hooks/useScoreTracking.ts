import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface LevelScore {
  topScore: number;
  accuracy: number;
  wpm: number;
  difficulty: string;
}

interface GameScores {
  highestLevelCompleted: number;
  levels: Record<number, LevelScore>;
  allTimeBest: {
    score: number;
    level: number;
    accuracy: number;
    wpm: number;
    difficulty: string;
  };
  totalScore: number;
}

const LOCAL_STORAGE_KEY = 'gameScores';
const defaultGameScores = { 
  highestLevelCompleted: 0,
  levels: {},
  allTimeBest: {
    score: 0,
    level: 0,
    accuracy: 0,
    wpm: 0,
    difficulty: 'easy'
  },
  totalScore: 0
};

const fetchGameScores = async (): Promise<GameScores> => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : defaultGameScores;
};

const updateGameScoresInStorage = async (newScores: Partial<GameScores>): Promise<GameScores> => {
  const currentScores = await fetchGameScores();
  const updatedScores = { ...currentScores, ...newScores };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedScores));
  return updatedScores;
};

export const useScoreTracking = () => {
  const queryClient = useQueryClient();

  const { data: gameScores, isLoading: isScoresLoading } = useQuery<GameScores, Error>({
    queryKey: [LOCAL_STORAGE_KEY],
    queryFn: fetchGameScores,
  });

  const { mutate: updateGameScores } = useMutation<GameScores, Error, Partial<GameScores>>({
    mutationFn: updateGameScoresInStorage,
    onSuccess: (newScores) => {
      queryClient.setQueryData<GameScores>([LOCAL_STORAGE_KEY], (prevSettings = defaultGameScores) => ({ ...prevSettings, ...newScores }));
    },
  });
  
  return { gameScores, updateGameScores, isScoresLoading };
};

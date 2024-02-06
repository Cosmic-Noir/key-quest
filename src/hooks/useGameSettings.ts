import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Function to fetch the current difficulty setting from local storage
const fetchDifficulty = async (): Promise<string> => {
  return localStorage.getItem('difficulty') ?? 'easy'; // Default to 'easy'
};

// Function to update the difficulty setting in local storage
const updateDifficultyInStorage = async (newDifficulty: string): Promise<void> => {
  localStorage.setItem('difficulty', newDifficulty);
};

export const useGameSettings = () => {
  const queryClient = useQueryClient();

  // Fetch the current difficulty setting
  const { data: difficulty, isLoading: isDifficultyLoading } = useQuery({
    queryKey: ['difficulty'],
    queryFn: fetchDifficulty,
    initialData: 'easy'
  });

  // Mutation for updating the difficulty setting
  const { mutate: setDifficulty, isError, error, isSuccess } = useMutation({
    mutationFn: updateDifficultyInStorage,
    onSuccess: () => {
      // Invalidate and refetch difficulty setting upon successful update
      queryClient.invalidateQueries({
        queryKey: ['difficulty'],
      });
    },
  });

  return { difficulty, setDifficulty, isError, error, isSuccess, isDifficultyLoading };
};

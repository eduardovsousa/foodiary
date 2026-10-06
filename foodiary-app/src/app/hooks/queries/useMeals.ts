import { MealsService } from '@app/services/MealsService';
import { useQuery } from '@tanstack/react-query';

export function useMeals(date: Date) {
  const formattedDate = date.toISOString().split('T')[0];

  const { data, isLoading } = useQuery({
    queryKey: ['meals', formattedDate],
    queryFn: async () => {
      const { meals } = await MealsService.getMealsByDate(formattedDate);
      return meals;
    },
    staleTime: Infinity,
  });

  return {
    meals: data ?? [],
    isInitialLoading: isLoading,
  };
}

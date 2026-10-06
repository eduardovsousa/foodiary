import { MealsService } from '@app/services/MealsService';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export function useMeals(date: Date) {
  const formattedDate = date.toISOString().split('T')[0];

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['meals', formattedDate],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const { meals } = await MealsService.getMealsByDate(formattedDate);
      return meals;
    },
    staleTime: Infinity,
  });

  return {
    meals: data ?? [],
    isInitialLoading: isLoading,
    isLoading: isFetching,
    reloadMeal: refetch,
  };
}

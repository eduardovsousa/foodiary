import { useMemo } from 'react';
import { View } from 'react-native';

import { useAccount } from '@app/hooks/queries/useAccount';
import { useHomeContext } from '../../context/useHomeContex';

import { GoalStats } from '@ui/components/GoalStats';
import { styles } from './styles';

export function CurrentGoal() {
  const { account } = useAccount();
  const { meals, isLoading } = useHomeContext();

  const summary = useMemo(() => (
    meals.flatMap(meal => meal.foods).reduce(
      (acc, food) => {
        const proteinsCalories = Math.round(food.proteins * 4);
        const carbohydratesCalories = Math.round(food.carbohydrates * 4);
        const fatsCalories = Math.round(food.fats * 9);
        const totalCalories = Math.round(proteinsCalories + carbohydratesCalories + fatsCalories);

        return {
          calories: Math.round(acc.calories + totalCalories),
          proteins: Math.round(acc.proteins + food.proteins),
          carbohydrates: Math.round(acc.carbohydrates + food.carbohydrates),
          fats: Math.round(acc.fats + food.fats),
        };
      },
      { calories: 0, proteins: 0, carbohydrates: 0, fats: 0 },
    )), [meals]);

  return (
    <View style={[styles.container, { opacity: isLoading ? 0.5 : 1 }]}>
      <GoalStats
        calories={{ goal: account!.goal.calories, current: summary.calories }}
        carbohydrates={{ goal: account!.goal.carbohydrates, current: summary.carbohydrates }}
        fats={{ goal: account!.goal.fats, current: summary.fats }}
        proteins={{ goal: account!.goal.proteins, current: summary.proteins }}
      />
    </View>
  );
}


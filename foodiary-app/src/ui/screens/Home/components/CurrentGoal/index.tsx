import { useAccount } from '@app/hooks/queries/useAccount';
import { Meal } from '@app/types/Meal';
import { GoalStats } from '@ui/components/GoalStats';
import { useMemo } from 'react';
import { View } from 'react-native';
import { styles } from './styles';

interface ICurrentGoalProps {
  meals: Meal[];
}

export function CurrentGoal({ meals }: ICurrentGoalProps) {
  const { account } = useAccount();

  const summary = useMemo(() => (
    meals.flatMap(meal => meal.foods).reduce(
      (acc, food) => ({
        calories: acc.calories + food.calories,
        proteins: acc.proteins + food.proteins,
        carbohydrates: acc.carbohydrates + food.carbohydrates,
        fats: acc.fats + food.fats,
      }),
      { calories: 0, proteins: 0, carbohydrates: 0, fats: 0 },
    )
  ), [meals]);

  return (
    <View style={styles.container}>
      <GoalStats
        calories={{ goal: account!.goal.calories, current: summary.calories }}
        carbohydrates={{ goal: account!.goal.carbohydrates, current: summary.carbohydrates }}
        fats={{ goal: account!.goal.fats, current: summary.fats }}
        proteins={{ goal: account!.goal.proteins, current: summary.proteins }}
      />
    </View>
  );
}


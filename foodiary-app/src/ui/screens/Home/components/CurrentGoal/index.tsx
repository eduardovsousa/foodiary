import { useAccount } from '@app/hooks/queries/useAccount';
import { GoalStats } from '@ui/components/GoalStats';
import { View } from 'react-native';
import { styles } from './styles';

export function CurrentGoal() {
  const { account } = useAccount();

  return (
    <View style={styles.container}>
      <GoalStats
        calories={{ goal: account!.goal.calories }}
        carbohydrates={{ goal: account!.goal.carbohydrates }}
        fats={{ goal: account!.goal.fats }}
        proteins={{ goal: account!.goal.proteins }}
      />
    </View>
  );
}


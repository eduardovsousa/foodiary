import { FlatList, View } from 'react-native';

import { useMeal } from '@app/hooks/queries/useMeal';
import { AppStackRouteProps } from '@app/navigation/AppStack';
import { useRoute } from '@react-navigation/native';
import { AppText } from '@ui/components/AppText';
import { Header } from './components/Header';
import { styles } from './styles';

export function MealDetails() {
  const { params } = useRoute<AppStackRouteProps<'MealDetails'>>();
  const { meal } = useMeal(params.mealId);

  return (
    <View style={styles.container}>
      <FlatList
        data={meal?.foods ?? []}
        ListHeaderComponent={<Header meal={meal} />}
        renderItem={({ item: food }) => (
          <View style={styles.food}>
            <AppText>
              {food.quantity} - {food.name}
            </AppText>
          </View>
        )}

      />
    </View>
  );
}

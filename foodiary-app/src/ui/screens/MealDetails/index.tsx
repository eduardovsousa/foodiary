import { FlatList, View } from 'react-native';

import { useMeal } from '@app/hooks/queries/useMeal';
import { AppStackRouteProps } from '@app/navigation/AppStack';
import { useRoute } from '@react-navigation/native';
import { Header } from './components/Header';
import { styles } from './styles';

export function MealDetails() {
  const { params } = useRoute<AppStackRouteProps<'MealDetails'>>();
  const { meal } = useMeal(params.mealId);

  return (
    <View style={styles.container}>
      <FlatList
        data={[]}
        ListHeaderComponent={<Header meal={meal} />}
        renderItem={() => null}

      />
    </View>
  );
}

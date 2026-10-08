import { useNavigation, useRoute } from '@react-navigation/native';
import { View } from 'react-native';

import { AppStackNavigationProps, AppStackRouteProps } from '@app/navigation/AppStack';
import { AppText } from '@ui/components/AppText';

import { Button } from '@ui/components/Button';
import { styles } from './styles';

export function MealDetails() {
  const { params } = useRoute<AppStackRouteProps<'MealDetails'>>();
  const { navigate } = useNavigation<AppStackNavigationProps>();

  return (
    <View style={styles.container}>
      <AppText>
        MealId: {params.mealId}
      </AppText>

      <Button onPress={() => navigate('Home')}>
        Voltar
      </Button>
    </View>
  );
}

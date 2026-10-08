import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

import { Home } from '@ui/screens/Home';
import { MealDetails } from '@ui/screens/MealDetails';

type AppStackParamsList = {
  Home: undefined;
  MealDetails: {
    mealId: string;
  };
}

export type AppStackNavigationProps = NativeStackNavigationProp<AppStackParamsList>;

export type AppStackScreenProps<
  TRouteName extends keyof AppStackParamsList,
> = NativeStackScreenProps<AppStackParamsList, TRouteName>;

export type AppStackRouteProps<
  TRouteName extends keyof AppStackParamsList,
> = RouteProp<AppStackParamsList, TRouteName>

const Stack = createNativeStackNavigator<AppStackParamsList>();

export function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='MealDetails' component={MealDetails} />
    </Stack.Navigator>
  );
}

import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

import { Greetings } from '@ui/screens/Greetings';
import { Onboarding } from '@ui/screens/Onboarding';

type AuthStackParamsList = {
  Greetings: undefined;
  Onboarding: undefined;
}

export type AuthStackNavigationProps = NativeStackNavigationProp<AuthStackParamsList>;

export type AuthStackScreenProps<
  TRouteName extends keyof AuthStackParamsList,
> = NativeStackScreenProps<AuthStackParamsList, TRouteName>;

export type AuthStackRouteProps<
  TRouteName extends keyof AuthStackParamsList,
> = RouteProp<AuthStackParamsList, TRouteName>

const Stack = createNativeStackNavigator<AuthStackParamsList>();

export function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Greetings' component={Greetings} />
      <Stack.Screen name='Onboarding' component={Onboarding} />
    </Stack.Navigator>
  );
}

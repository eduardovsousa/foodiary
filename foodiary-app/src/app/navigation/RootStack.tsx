import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

import { useAuth } from '@app/contexts/AuthContext/useAuth';
import { AppStack } from './AppStack';
import { AuthStack } from './AuthStack';

type RootStackParamsList = {
  Auth: undefined;
  App: undefined;
}

export type RootStackNavigationProps = NativeStackNavigationProp<RootStackParamsList>;

export type RootStackScreenProps<
  TRouteName extends keyof RootStackParamsList,
> = NativeStackScreenProps<RootStackParamsList, TRouteName>;

export type RootStackRouteProps<
  TRouteName extends keyof RootStackParamsList,
> = RouteProp<RootStackParamsList, TRouteName>

const Stack = createNativeStackNavigator<RootStackParamsList>();

export function RootStack() {
  const { signedIn } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      {!signedIn && (
        <Stack.Screen
          name='Auth'
          component={AuthStack}
          options={{
            animationTypeForReplace: 'pop',
          }}
        />
      )}

      {signedIn && (
        <Stack.Screen
          name='App'
          component={AppStack}
          options={{
            animationTypeForReplace: 'push',
          }}
        />
      )}
    </Stack.Navigator>
  );
}

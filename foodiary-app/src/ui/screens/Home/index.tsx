import { useAuth } from '@app/contexts/AuthContext/useAuth';
import { AppText } from '@ui/components/AppText';
import { Button } from '@ui/components/Button';
import { View } from 'react-native';

export function Home() {
  const { signOut } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <AppText>Home</AppText>
      <Button onPress={signOut}>
        Sair
      </Button>
    </View>
  );
}

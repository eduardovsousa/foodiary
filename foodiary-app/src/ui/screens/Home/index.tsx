import { useAuth } from '@app/contexts/AuthContext/useAuth';
import { AppText } from '@ui/components/AppText';
import { Button } from '@ui/components/Button';
import { WelcomeModal } from '@ui/components/WelcomeModal';
import { View } from 'react-native';

export function Home() {
  const { signedUp, signOut } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <WelcomeModal />
      <AppText>
        Home - {signedUp ? 'Acabou de cadastrar' : 'Só logou'}
      </AppText>
      <Button onPress={signOut}>
        Sair
      </Button>
    </View>
  );
}

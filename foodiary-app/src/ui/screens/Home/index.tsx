// import { useAuth } from '@app/contexts/AuthContext/useAuth';
// import { useAccount } from '@app/hooks/queries/useAccount';
// import { AppText } from '@ui/components/AppText';
// import { Button } from '@ui/components/Button';
import { WelcomeModal } from '@ui/components/WelcomeModal';
import { View } from 'react-native';

export function Home() {
  // const { signOut } = useAuth();
  // const { account, loadAccount } = useAccount();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <WelcomeModal />
      {/* <AppText>Bem-vindo {account?.profile.name}</AppText>
      <Button onPress={signOut}>
        Sair
      </Button>
      <Button onPress={() => loadAccount()}>
        Recaregar
      </Button> */}
    </View>
  );
}

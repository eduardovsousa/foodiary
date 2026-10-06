import { TargetIcon } from 'lucide-react-native';
import { Image, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAccount } from '@app/hooks/queries/useAccount';
import { AppText } from '@ui/components/AppText';
import { Button } from '@ui/components/Button';
import { theme } from '@ui/styles/theme';

import { styles } from './styles';

export function UserHeader() {
  const { account } = useAccount();
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <View style={styles.userInfo}>
        <Image
          source={{ uri: 'https://github.com/eduardovsousa.png' }}
          style={styles.avatar}
        />

        <View style={styles.greetings}>
          <AppText size='sm' color={theme.colors.gray[700]}>Olá, 👋</AppText>
          <AppText weight='semiBold'>{account?.profile.name}</AppText>
        </View>
      </View>

      <Button variant='ghost' leftIcon={TargetIcon}>
        Metas
      </Button>
    </View>
  );
}

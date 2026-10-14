import { TargetIcon } from 'lucide-react-native';
import { View } from 'react-native';

import { useAccount } from '@app/hooks/queries/useAccount';
import { AppText } from '@ui/components/AppText';
import { Button } from '@ui/components/Button';
import { theme } from '@ui/styles/theme';

import { AppStackNavigationProps } from '@app/navigation/AppStack';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

export function UserHeader() {
  const { account } = useAccount();
  const { navigate } = useNavigation<AppStackNavigationProps>();

  const name = account!.profile.name;
  const initials = name.trim() && getInitials(name);

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={styles.avatar}>
          <AppText
            size="base"
            weight="semiBold"
            color={theme.colors.lime[900]}
          >
            {initials}
          </AppText>
        </View>
        <View style={styles.greetings}>
          <AppText size='sm' color={theme.colors.gray[700]}>Olá, 👋</AppText>
          <AppText weight='semiBold'>{account?.profile.name}</AppText>
        </View>
      </View>

      <Button variant='ghost' leftIcon={TargetIcon} onPress={() => navigate('EditGoals')}>
        Metas
      </Button>
    </View>
  );
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

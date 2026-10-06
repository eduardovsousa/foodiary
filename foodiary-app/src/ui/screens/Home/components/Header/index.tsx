import { View } from 'react-native';

import { AppText } from '@ui/components/AppText';
import { CurrentGoal } from '../CurrentGoal';
import { DateSwitcher } from '../DateSwitcher';
import { UserHeader } from '../UserHeader';

import { useHomeContext } from '../../context/useHomeContex';
import { styles } from './styles';

export function Header() {
  const { isLoading } = useHomeContext();

  return (
    <View>
      <UserHeader />

      <View style={styles.container}>
        <DateSwitcher />
        <CurrentGoal />

        <View style={styles.divider} />
        <AppText
          style={[styles.mealsLabel, { opacity: isLoading ? 0.5 : 1 }]}
          weight='medium'
        >
          REFEIÇÕES
        </AppText>
      </View>
    </View>
  );
}

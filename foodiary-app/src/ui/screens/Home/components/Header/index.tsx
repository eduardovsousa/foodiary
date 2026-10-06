import { View } from 'react-native';

import { AppText } from '@ui/components/AppText';
import { CurrentGoal } from '../CurrentGoal';
import { DateSwitcher } from '../DateSwitcher';
import { UserHeader } from '../UserHeader';

import { styles } from './styles';

export function Header() {
  return (
    <View>
      <UserHeader />

      <View style={styles.container}>
        <DateSwitcher />
        <CurrentGoal />

        <View style={styles.divider} />
        <AppText
          style={styles.mealsLabel}
          weight='medium'
        >
          REFEIÇÕES
        </AppText>
      </View>
    </View>
  );
}

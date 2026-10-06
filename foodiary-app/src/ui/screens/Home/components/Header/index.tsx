import { View } from 'react-native';

import { AppText } from '@ui/components/AppText';
import { CurrentGoal } from '../CurrentGoal';
import { DateSwitcher } from '../DateSwitcher';
import { UserHeader } from '../UserHeader';

import { Meal } from '@app/types/Meal';
import { styles } from './styles';

interface IHeaderProps {
  meals: Meal[];
}

export function Header({ meals }: IHeaderProps) {
  return (
    <View>
      <UserHeader />

      <View style={styles.container}>
        <DateSwitcher />
        <CurrentGoal meals={meals} />

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

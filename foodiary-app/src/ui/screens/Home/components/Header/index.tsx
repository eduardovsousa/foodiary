import { View } from 'react-native';
import { DateSwitcher } from '../DateSwitcher';
import { UserHeader } from '../UserHeader/inedex';
import { styles } from './styles';

export function Header() {
  return (
    <View>
      <UserHeader />
      <View style={styles.container}>
        <DateSwitcher />
      </View>
    </View>
  );
}

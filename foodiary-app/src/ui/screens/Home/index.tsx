import { AppText } from '@ui/components/AppText';
import { WelcomeModal } from '@ui/components/WelcomeModal';
import { FlatList, View } from 'react-native';
import { Header } from './components/Header';
import { styles } from './styles';

export function Home() {
  return (
    <View style={styles.container}>
      <WelcomeModal />

      <FlatList
        data={[1, 2, 3, 4, 5]}
        keyExtractor={item => String(item)}
        ListHeaderComponent={Header}
        renderItem={() => (
          <AppText>item</AppText>
        )}
      />
    </View >
  );
}

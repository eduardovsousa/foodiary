import { WelcomeModal } from '@ui/components/WelcomeModal';
import { theme } from '@ui/styles/theme';
import { useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EmptyState } from './components/EmptyState';
import { Header } from './components/Header';
import { ItemSeparatorComponent } from './components/ItemSeparatorComponent';
import { MealCard } from './components/MealCard';
import { styles } from './styles';

export function Home() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { top, bottom } = useSafeAreaInsets();

  async function handleRefresh() {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  }

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <WelcomeModal />

      <FlatList
        data={[1, 2, 3, 4, 5]}
        keyExtractor={item => String(item)}
        contentContainerStyle={[styles.content, { paddingBottom: bottom + 24 }]}
        ListHeaderComponent={Header}
        ListEmptyComponent={EmptyState}
        ItemSeparatorComponent={ItemSeparatorComponent}
        refreshControl={(
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={theme.colors.lime[900]}
            colors={[theme.colors.lime[700]]}
          />
        )}
        renderItem={() => (
          <MealCard />
        )}
      />
    </View >
  );
}

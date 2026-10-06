import { useMeals } from '@app/hooks/queries/useMeals';
import { WelcomeModal } from '@ui/components/WelcomeModal';
import { theme } from '@ui/styles/theme';
import { useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EmptyState } from './components/EmptyState';
import { FullScreenLoader } from './components/FullScreenLoader';
import { Header } from './components/Header';
import { ItemSeparatorComponent } from './components/ItemSeparatorComponent';
import { MealCard } from './components/MealCard';
import { styles } from './styles';

export function Home() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { top, bottom } = useSafeAreaInsets();

  const { isInitialLoading, meals } = useMeals(new Date());

  async function handleRefresh() {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  }

  if (isInitialLoading) {
    return <FullScreenLoader />;
  }

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <WelcomeModal />

      <FlatList
        data={meals}
        keyExtractor={item => item.id}
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
        renderItem={({ item: meal }) => (
          <MealCard meal={meal} />
        )}
      />
    </View >
  );
}

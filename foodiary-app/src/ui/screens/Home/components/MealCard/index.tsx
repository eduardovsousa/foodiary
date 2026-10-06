import { Platform, Pressable, View } from 'react-native';

import { AppText } from '@ui/components/AppText';
import { theme } from '@ui/styles/theme';
import { styles } from './styles';

export function MealCard() {

  return (
    <View style={styles.container}>
      <AppText color={theme.colors.gray[700]}>12h15</AppText>

      <View style={styles.wrapper}>
        <Pressable
          android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
          style={({ pressed }) => [
            styles.card,
            pressed && Platform.OS === 'ios' && { opacity: 0.5 },
          ]}
        >
          <View style={styles.header}>
            <View style={styles.icon}>
              <AppText>🍞</AppText>
            </View>

            <View style={styles.mealDetails}>
              <AppText
                color={theme.colors.gray[700]}
                size='sm'
                numberOfLines={1}
              >
                Café da manhã
              </AppText>
              <AppText
                weight='medium'
                numberOfLines={2}
              >
                Pão, manteiga e café
              </AppText>
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.mealStatsRow}>
              <View style={styles.mealStat}>
                <AppText color={theme.colors.support.tomato} weight='medium'>
                  200
                </AppText>
                <AppText color={theme.colors.gray[700]}>
                  Kcal
                </AppText>
              </View>

              <View style={styles.mealStat}>
                <AppText color={theme.colors.support.teal} weight='medium'>
                  5g
                </AppText>
                <AppText color={theme.colors.gray[700]}>
                  Proteínas
                </AppText>
              </View>
            </View>

            <View style={styles.mealStatsRow}>
              <View style={styles.mealStat}>
                <AppText color={theme.colors.support.yellow} weight='medium'>
                  25g
                </AppText>
                <AppText color={theme.colors.gray[700]}>
                  Carboidratos
                </AppText>
              </View>

              <View style={styles.mealStat}>
                <AppText color={theme.colors.support.orange} weight='medium'>
                  9g
                </AppText>
                <AppText color={theme.colors.gray[700]}>
                  Gorduras
                </AppText>
              </View>
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

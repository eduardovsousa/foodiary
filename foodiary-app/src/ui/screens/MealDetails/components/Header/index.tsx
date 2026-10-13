import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeftIcon } from 'lucide-react-native';
import { ImageBackground, StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@ui/components/AppText';
import { Button } from '@ui/components/Button';
import { theme } from '@ui/styles/theme';

import { Meal } from '@app/types/Meal';
import { useMemo } from 'react';
import { styles } from './styles';

interface IHeaderProps {
  meal: Meal | undefined;
}

export function Header({ meal }: IHeaderProps) {
  const { top } = useSafeAreaInsets();
  const { goBack } = useNavigation();

  const summary = useMemo(() => (
    (meal?.foods ?? []).reduce(
      (acc, food) => {
        const proteinsCalories = food.proteins * 4;
        const carbohydratesCalories = food.carbohydrates * 4;
        const fatsCalories = food.fats * 9;
        const totalCalories = proteinsCalories + carbohydratesCalories + fatsCalories;

        return {
          calories: Math.round(acc.calories + totalCalories),
          proteins: Math.round(acc.proteins + food.proteins),
          carbohydrates: Math.round(acc.carbohydrates + food.carbohydrates),
          fats: Math.round(acc.fats + food.fats),
        };
      },
      { calories: 0, proteins: 0, carbohydrates: 0, fats: 0 },
    )), [meal?.foods]);

  const percentages = useMemo(() => {
    const proteinsCalories = summary.proteins * 4;
    const carbohydratesCalories = summary.carbohydrates * 4;
    const fatsCalories = summary.fats * 9;

    if (summary.calories === 0) {
      return { proteins: 0, carbohydrates: 0, fats: 0 };
    }

    return {
      proteins: Math.round((proteinsCalories * 100) / summary.calories),
      carbohydrates: Math.round((carbohydratesCalories * 100) / summary.calories),
      fats: Math.round((fatsCalories * 100) / summary.calories),
    };
  }, [summary]);

  const isImageInput = true;

  return (
    <>
      <StatusBar animated translucent barStyle='light-content' />

      <View style={styles.container}>
        {isImageInput && (
          <ImageBackground
            style={styles.image}
            source={{
              uri: 'https://imgs.search.brave.com/YQrwiLzewQO72ljY3QPZQDGbkpmMzBE5_glFZc-Y3ic/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wMi50/cnJzZi5jb20vaW1h/Z2UvZmdldC9jZi83/NzQvMC9pbWFnZXMu/dGVycmEuY29tLzIw/MjAvMDgvMTAvZXN0/cm9nb25vZmUtdHJh/ZGljaW9uYWwtcmFw/aWRvLmpwZw',
            }}

          >
            <LinearGradient
              style={[styles.overlay, { paddingTop: top + 12 }]}
              colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0)']}
              start={{ y: 0.6, x: 0 }}
              end={{ y: 1, x: 0 }}
            >
              <BlurView style={styles.blurView}>
                <Button onPress={goBack} size='icon' variant='ghost'>
                  <ChevronLeftIcon size={20} color={theme.colors.white} />
                </Button>
              </BlurView>
            </LinearGradient>
          </ImageBackground>
        )}

        <View style={[styles.content, { marginTop: !isImageInput ? top : 0 }]}>
          <View style={styles.pageTitleContainer}>
            <Button onPress={goBack} size='icon' variant='ghost'>
              <ChevronLeftIcon size={20} color={theme.colors.white} />
            </Button>
            <AppText weight='medium' color={theme.colors.gray[300]}>
              Refeição
            </AppText>
          </View>

          <View style={styles.caloriesContainer}>
            <AppText color={theme.colors.gray[300]}>
              Calorias
            </AppText>
            <AppText weight='medium' color={theme.colors.white}>
              {summary.calories}kcal
            </AppText>
          </View>
        </View>
      </View>

      <View style={styles.macrosContainer}>
        <View style={styles.macro}>
          <AppText color={theme.colors.gray[700]}>Proteínas</AppText>
          <AppText weight='medium' color={theme.colors.support.teal}>
            {summary.proteins}g ({percentages.proteins}%)
          </AppText>
        </View>
        <View style={styles.macro}>
          <AppText color={theme.colors.gray[700]}>Carboidratos</AppText>
          <AppText weight='medium' color={theme.colors.support.yellow}>
            {summary.carbohydrates}g ({percentages.carbohydrates}%)
          </AppText>
        </View>
        <View style={styles.macro}>
          <AppText color={theme.colors.gray[700]}>Gorduras</AppText>
          <AppText weight='medium' color={theme.colors.support.orange}>
            {summary.fats}g ({percentages.fats}%)
          </AppText>
        </View>
      </View>

      <View style={styles.macrosProgress}>
        <View
          style={[styles.proteinsProgress, { width: `${percentages.proteins}%` }]}
        />
        <View
          style={[styles.carbohydratesProgress, { width: `${percentages.carbohydrates}%` }]}
        />
        <View
          style={[styles.fatsProgress, { width: `${percentages.fats}%` }]}
        />
      </View>
    </>
  );
}

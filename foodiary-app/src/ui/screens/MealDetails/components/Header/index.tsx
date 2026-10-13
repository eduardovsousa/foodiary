import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeftIcon } from 'lucide-react-native';
import { ImageBackground, StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@ui/components/AppText';
import { Button } from '@ui/components/Button';
import { theme } from '@ui/styles/theme';

import { Meal, MealInputType } from '@app/types/Meal';
import { useMemo } from 'react';
import { styles } from './styles';

interface IHeaderProps {
  meal: Meal | undefined;
}

export function Header({ meal }: IHeaderProps) {
  const { top } = useSafeAreaInsets();
  const { goBack } = useNavigation();

  const isPictureInput = meal?.inputType === MealInputType.PICTURE;

  const summary = useMemo(() => (
    (meal?.foods ?? []).reduce(
      (acc, food) => {
        const proteinsCalories = Math.round(food.proteins * 4);
        const carbohydratesCalories = Math.round(food.carbohydrates * 4);
        const fatsCalories = Math.round(food.fats * 9);
        const totalCalories = Math.round(proteinsCalories + carbohydratesCalories + fatsCalories);

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
    const proteinsCalories = Math.round(summary.proteins * 4);
    const carbohydratesCalories = Math.round(summary.carbohydrates * 4);
    const fatsCalories = Math.round(summary.fats * 9);

    if (summary.calories === 0) {
      return { proteins: 0, carbohydrates: 0, fats: 0 };
    }

    return {
      proteins: Math.round((proteinsCalories * 100) / summary.calories),
      carbohydrates: Math.round((carbohydratesCalories * 100) / summary.calories),
      fats: Math.round((fatsCalories * 100) / summary.calories),
    };
  }, [summary]);

  return (
    <>
      <StatusBar animated translucent barStyle='light-content' />

      <View style={styles.container}>
        {isPictureInput && (
          <ImageBackground
            style={styles.image}
            source={{ uri: meal.inputFileURL }}

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

        <View style={[styles.content, { marginTop: !isPictureInput ? top : 0 }]}>
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

      <View style={styles.divider} />

      <AppText size='xl' weight='semiBold' style={styles.mealName}>
        {meal?.name}
      </AppText>

      <AppText weight='semiBold' style={styles.mealItemsHeader} color={theme.colors.gray[700]}>
        Itens
      </AppText>
    </>
  );
}

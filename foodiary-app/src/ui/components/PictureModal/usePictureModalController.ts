import { useCreateMeal } from '@app/hooks/mutations/useCreateMeal';
import { useMeal } from '@app/hooks/queries/useMeal';
import { AppStackNavigationProps } from '@app/navigation/AppStack';
import { MealStatus } from '@app/types/Meal';
import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Alert, Linking } from 'react-native';

interface IUsePictureModalControllerParams {
  onClose: () => void;
  onCreate?: () => void;
}

export function usePictureModalController({ onClose, onCreate }: IUsePictureModalControllerParams) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [photoUri, setPhotoUri] = useState<null | string>(null);
  const { navigate } = useNavigation<AppStackNavigationProps>();

  const queryClient = useQueryClient();

  const memorizedOnCreate = useRef(onCreate);
  useLayoutEffect(() => { memorizedOnCreate.current = onCreate; }, [onCreate]);

  const memorizedOnClose = useRef(onClose);
  useLayoutEffect(() => { memorizedOnClose.current = onClose; }, [onClose]);

  const {
    createMeal,
    isLoading: isCreatingMeal, createdMealId,
  } = useCreateMeal();

  const {
    meal,
    isLoading: isLoadingMeal,
    isProcessing: isProcessingMeal,
  } = useMeal(createdMealId);

  useEffect(() => {
    if (meal?.status === MealStatus.FAILED) {
      Alert.alert('Oops!', 'Ocorreu um erro ao criar a sua refeição. Tente novamente.');
    };

    if (meal?.status === MealStatus.SUCCESS) {
      memorizedOnClose.current();
      memorizedOnCreate.current?.();
      queryClient.invalidateQueries({ queryKey: ['meals'] });
      navigate('MealDetails', { mealId: meal.id });
    };
  }, [meal?.status, meal?.id, navigate, queryClient]);

  async function handleRequestPermission() {
    if (permission?.granted) {
      return;
    }

    if (permission?.canAskAgain) {
      await requestPermission();
      return;
    }

    await Linking.openSettings();
  }

  async function handleTakePicture() {
    if (!cameraRef.current) {
      return;
    }

    const picture = await cameraRef.current.takePictureAsync({
      imageType: 'jpg',
    });

    setPhotoUri(picture.uri);
  }

  function handleTryAgain() {
    setPhotoUri(null);
  }

  async function handleConfirm() {
    if (!photoUri) {
      return;
    }

    try {
      await createMeal(photoUri);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);

      Alert.alert('Oops!', 'Ocorreu um erro ao processar a imagem. Tente novamente.');
    }
  }

  return {
    isLoading: isCreatingMeal || isLoadingMeal || isProcessingMeal,
    permission,
    cameraRef,
    photoUri,
    handleRequestPermission,
    handleTyAgain: handleTryAgain,
    handleConfirm,
    handleTakePicture,
  };
}

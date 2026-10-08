import { useCreateMeal } from '@app/hooks/mutations/useCreateMeal';
import { useMeal } from '@app/hooks/queries/useMeal';
import axios from 'axios';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Linking } from 'react-native';

export function usePictureModalController() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [photoUri, setPhotoUri] = useState<null | string>(null);
  const { createMeal, isLoading: isCreatingMeal, createdMealId } = useCreateMeal();

  const {
    meal,
    isLoading: isLoadingMeal,
    isProcessing: isProcessingMeal,
  } = useMeal(createdMealId);

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
      if (axios.isAxiosError(error)) {
        console.log(
          'DATA:',
          JSON.stringify(error.response?.data, null, 2),
        );
      }
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

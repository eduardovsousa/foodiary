import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Linking } from 'react-native';

export function usePictureModalController() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [photoUri, setPhotoUri] = useState<null | string>(null);

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

  function handleTyAgain() {
    setPhotoUri(null);
  }

  function handleConfirm() {
    alert('confirm');
  }

  return {
    isLoading: false,
    permission,
    cameraRef,
    photoUri,
    handleRequestPermission,
    handleTyAgain,
    handleConfirm,
    handleTakePicture,
  };
}

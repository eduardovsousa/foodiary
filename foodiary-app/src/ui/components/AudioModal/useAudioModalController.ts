import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import {
  AudioModule,
  AudioQuality,
  IOSOutputFormat,
  RecordingOptions,
  setAudioModeAsync,
  useAudioRecorder,
} from 'expo-audio';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';

import { useCreateMeal } from '@app/hooks/mutations/useCreateMeal';
import { useMeal } from '@app/hooks/queries/useMeal';
import { AppStackNavigationProps } from '@app/navigation/AppStack';
import { MealStatus } from '@app/types/Meal';

export type AudioModalState = 'idle' | 'recording' | 'recorded'

const LOW_QUALITY: RecordingOptions = {
  extension: '.m4a',
  sampleRate: 44100,
  numberOfChannels: 2,
  bitRate: 64000,

  android: {
    extension: '.m4a',
    outputFormat: 'mpeg4',
    audioEncoder: 'aac',
  },

  ios: {
    audioQuality: AudioQuality.MIN,
    outputFormat: IOSOutputFormat.MPEG4AAC,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },

  web: {
    mimeType: 'audio/webm',
    bitsPerSecond: 128000,
  },
};

interface IUseAudioModalControllerParams {
  onClose: () => void;
  onCreate?: () => void;
}

export function useAudioModalController({ onClose, onCreate }: IUseAudioModalControllerParams) {
  const [state, setState] = useState<AudioModalState>('idle');
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const audioRecorder = useAudioRecorder(LOW_QUALITY);

  const {
    createMeal,
    isLoading: isCreatingMeal, createdMealId,
  } = useCreateMeal();

  const { navigate } = useNavigation<AppStackNavigationProps>();
  const queryClient = useQueryClient();

  const memorizedOnCreate = useRef(onCreate);
  useLayoutEffect(() => { memorizedOnCreate.current = onCreate; }, [onCreate]);

  const memorizedOnClose = useRef(onClose);
  useLayoutEffect(() => { memorizedOnClose.current = onClose; }, [onClose]);

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

  useEffect(() => {
    async function load() {
      const status = await AudioModule.requestRecordingPermissionsAsync();

      if (!status.granted) {
        Alert.alert('Permissão para acessar o microfone negada');
      }

      setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });
    }

    load();
  }, []);

  async function handleStartRecording() {
    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();

    setState('recording');
  }

  const handleStopRecording = useCallback(async () => {
    await audioRecorder.stop();
    setAudioUri(audioRecorder.uri);

    setState('recorded');
  }, []);

  function handleTyAgain() {
    setState('idle');
  }

  async function handleConfirm() {
    if (!audioUri) {
      return;
    }

    try {
      await createMeal(audioUri);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);

      Alert.alert('Oops!', 'Ocorreu um erro ao processar a imagem. Tente novamente.');
    }
  }

  return {
    state,
    audioUri,
    isLoading: isCreatingMeal || isLoadingMeal || isProcessingMeal,
    handleStartRecording,
    handleStopRecording,
    handleTyAgain,
    handleConfirm,
  };
}

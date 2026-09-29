import { useImperativeHandle, useRef } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Alert, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ISignInBottomSheet } from './ISignInBottomSheet';

export function useSignInBottomSheetController(ref: React.Ref<ISignInBottomSheet>) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { bottom } = useSafeAreaInsets();
  const passwordInputRef = useRef<TextInput>(null);

  useImperativeHandle(ref, () => ({
    open: () => bottomSheetModalRef.current?.present(),
  }), []);

  function handleSubmit() {
    Alert.alert('Sign in...');
  }

  return {
    bottom,
    bottomSheetModalRef,
    passwordInputRef,
    handleSubmit,
  };
}

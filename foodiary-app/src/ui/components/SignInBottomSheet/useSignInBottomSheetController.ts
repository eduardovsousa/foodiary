import { useImperativeHandle, useRef } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Alert, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ISignInBottomSheet } from './ISignInBottomSheet';
import { signInSchema } from './schema';

export function useSignInBottomSheetController(ref: React.Ref<ISignInBottomSheet>) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { bottom } = useSafeAreaInsets();
  const passwordInputRef = useRef<TextInput>(null);

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useImperativeHandle(ref, () => ({
    open: () => bottomSheetModalRef.current?.present(),
  }), []);

  const handleSubmit = form.handleSubmit(formData => {
    Alert.alert(`Email: ${formData.email}\nSenha: ${formData.password}`);
  });

  return {
    bottom,
    bottomSheetModalRef,
    passwordInputRef,
    form,
    handleSubmit,
  };
}

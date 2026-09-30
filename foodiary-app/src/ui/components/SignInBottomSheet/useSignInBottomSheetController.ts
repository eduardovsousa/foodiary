import { useImperativeHandle, useRef } from 'react';

import { AuthService } from '@app/services/AuthService';
import { ErrorCode } from '@app/types/ErrorCode';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
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

  const handleSubmit = form.handleSubmit(async data => {
    try {
      const response = await AuthService.signIn(data);
      console.log(response);
    } catch (error) {
      if (isAxiosError(error) && error.response?.data?.error?.code === ErrorCode.INVALID_CREDENTIALS) {
        Alert.alert('Oops!', 'As credenciais informadas são inválidas.');
        return;
      }

      Alert.alert('Oops!', 'Ocorreu um erro ao acessar a sua conta');
    }
  });

  return {
    bottom,
    bottomSheetModalRef,
    passwordInputRef,
    form,
    handleSubmit,
  };
}

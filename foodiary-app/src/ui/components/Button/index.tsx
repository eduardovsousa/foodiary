import { LucideIcon } from 'lucide-react-native';
import { ActivityIndicator, Platform, Pressable, View } from 'react-native';

import { theme } from '@ui/styles/theme';
import { AppText } from '../AppText';

import { buttonStyles, ButtonVariants, styles } from './styles';

interface IButtonProps extends React.ComponentProps<typeof Pressable>,
  Omit<ButtonVariants, 'disabled'> {
  isLoading?: boolean;
  leftIcon?: LucideIcon;
};

export function Button({
  children,
  size,
  disabled: disabledProp,
  variant,
  style,
  isLoading,
  leftIcon: LeftIcon,
  ...props
}: IButtonProps) {
  const disabled = disabledProp || isLoading;

  const chieldEl = (
    typeof children === 'string'
      ? <AppText weight='medium'> {children}</AppText>
      : children
  );

  return (
    <View style={styles.wrapper}>
      <Pressable
        android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
        style={({ pressed }) => [
          buttonStyles({ size, variant, disabled: disabled ? 'true' : 'false' }),
          pressed && Platform.OS === 'ios' && { opacity: 0.7 },
          typeof style === 'function' ? style({ pressed }) : style,
        ]}
        disabled={disabled}
        {...props}
      >
        {!isLoading ? (
          <View style={styles.content}>
            {LeftIcon && <LeftIcon color={theme.colors.black[700]} size={20} />}
            {chieldEl as React.ReactElement}
          </View>
        ) : (
          <ActivityIndicator color={theme.colors.black[700]} />
        )}
      </Pressable>
    </View>
  );
}

import { Platform, Pressable, View } from 'react-native';

import { AppText } from '../AppText';
import { buttonStyles, ButtonVariants, styles } from './styles';

interface IButtonProps extends React.ComponentProps<typeof Pressable>, Omit<ButtonVariants, 'disabled'> { };

export function Button({
  children,
  size,
  disabled,
  variant,
  style,
  ...props
}: IButtonProps) {
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
          typeof style === 'function' ? style({ pressed }): style,
        ]}
        disabled={disabled}
        {...props}
      >
        {chieldEl}
      </Pressable>
    </View>
  );
}

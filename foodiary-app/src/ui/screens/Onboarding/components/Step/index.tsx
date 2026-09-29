import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@ui/components/AppText';

import { styles } from './styles';

export function Step({ children }: { children: React.ReactNode }) {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      {children}
    </View>
  );
}

export function StepHeader({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.header}>
      {children}
    </View>
  );
}

export function StepTitle({ children }: { children: string }) {
  return (
    <AppText size='3xl' weight='semiBold' style={styles.title}>
      {children}
    </AppText>
  );
}

export function StepSubtitle({ children }: { children: string }) {
  return (
    <AppText style={styles.subtitle}>
      {children}
    </AppText>
  );
}

export function StepContent({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.content}>
      {children}
    </View>
  );
}

export function StepFooter({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.footer}>
      {children}
    </View>
  );
}

import { Modal, StatusBar, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@app/contexts/AuthContext/useAuth';
import { useAccount } from '@app/hooks/queries/useAccount';
import { Goal } from '@app/types/Goal';
import { theme } from '@ui/styles/theme';
import { useState } from 'react';
import { AppText } from '../AppText';
import { Button } from '../Button';
import { GoalStats } from '../GoalStats';
import { styles } from './styles';

const goalsMap: Record<Goal, { icon: string, label: string }> = {
  GAIN: {
    icon: '🥩',
    label: 'Ganhar Peso',
  },
  LOSE: {
    icon: '🥦',
    label: 'Perder Peso',
  },
  MAINTAIN: {
    icon: '🍍',
    label: 'Manter Peso',
  },
};

export function WelcomeModal() {
  const { signedUp } = useAuth();
  const { account } = useAccount();
  const [visible, setVisible] = useState(signedUp);

  const goal = goalsMap[account!.profile.goal];

  function handleClose() {
    setVisible(false);
  }

  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      animationType='fade'
      onRequestClose={handleClose}
    >
      <StatusBar animated barStyle="light-content" />
      <View style={styles.container}>
        <SafeAreaProvider>
          <SafeAreaView style={styles.wrapper}>
            <View style={styles.content}>
              <View style={styles.header}>
                <View style={styles.icon}>
                  <AppText>{goal.icon}</AppText>
                </View>

                <View style={styles.headerContent}>
                  <AppText
                    size='3xl'
                    weight='semiBold'
                    color={theme.colors.gray[100]}
                    align='center'
                    style={styles.title}
                  >
                    Seu plano de dieta para{' '}
                    <Text style={styles.titleHighlight}>
                      {goal.label}
                    </Text>
                    {' '}está pronto!
                  </AppText>
                  <AppText color={theme.colors.gray[600]} align='center'>
                    Essa é a recomendação diária recomendada para o seu plano.
                    Fique tranquilo, você poderá editar depois caso deseje.
                  </AppText>
                </View>
              </View>
              <View style={styles.body}>
                <GoalStats
                  calories={{ goal: account!.goal.calories }}
                  carbohydrates={{ goal: account!.goal.carbohydrates }}
                  fats={{ goal: account!.goal.fats }}
                  proteins={{ goal: account!.goal.proteins }}
                />
              </View>
            </View>

            <View style={styles.footer}>
              <Button onPress={handleClose}>
                Começar meu plano
              </Button>
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
      </View>
    </Modal>
  );
}

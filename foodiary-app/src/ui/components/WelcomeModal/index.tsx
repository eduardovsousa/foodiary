import { Modal, StatusBar, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { theme } from '@ui/styles/theme';
import { AppText } from '../AppText';
import { Button } from '../Button';
import { GoalStats } from '../GoalStats';
import { styles } from './styles';

export function WelcomeModal() {
  return (
    <Modal
      visible
      transparent
      statusBarTranslucent
      animationType='fade'
    >
      <StatusBar animated barStyle="light-content" />
      <View style={styles.container}>
        <SafeAreaProvider>
          <SafeAreaView style={styles.wrapper}>
            <View style={styles.content}>
              <View style={styles.header}>
                <View style={styles.icon}>
                  <AppText>🥦</AppText>
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
                      Perder peso
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
                  calories={{ goal: 2000 }}
                  carbohydrates={{ goal: 200 }}
                  fats={{ goal: 56 }}
                  proteins={{ goal: 175 }}
                />
              </View>
            </View>

            <View style={styles.footer}>
              <Button>
                Começar meu plano
              </Button>
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
      </View>
    </Modal>
  );
}

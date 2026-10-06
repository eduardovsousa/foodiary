import { AppText } from '@ui/components/AppText';
import { Button } from '@ui/components/Button';
import { theme } from '@ui/styles/theme';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react-native';
import { View } from 'react-native';
import { styles } from './styles';

export function DateSwitcher() {
  const date = new Date();

  return (
    <View style={styles.container}>
      <Button size='icon' variant='ghost'>
        <ChevronLeftIcon />
      </Button>

      <AppText
        color={theme.colors.gray[700]}
        style={styles.selectedDate}
        weight='medium'
      >
        {formatDate(date)}
      </AppText>

      <Button size='icon' variant='ghost'>
        <ChevronRightIcon />
      </Button>

    </View>
  );
}

function formatDate(date: Date) {
  const now = new Date();
  const isToday = now.toDateString() === date.toDateString();

  const formattedDate = Intl.DateTimeFormat('pt-BR', {
    weekday: isToday ? undefined : 'long',
    day: '2-digit',
    month: 'long',
  }).format(date);

  return `${isToday ? 'HOJE, ' : ''}${formattedDate}`.toUpperCase();
}

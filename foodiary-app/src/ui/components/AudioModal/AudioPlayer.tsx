import { CheckIcon, PlayIcon, Trash2Icon } from 'lucide-react-native';
import { View } from 'react-native';

import { theme } from '@ui/styles/theme';
import { formatSeconds } from '@ui/utils/formatSeconds';
import { AppText } from '../AppText';
import { Button } from '../Button';
import { styles } from './styles';

interface IAudioPlayerProps {
  duration: number;
}

export function AudioPlayer({ duration }: IAudioPlayerProps) {
  return (
    <>
      <View style={styles.actionsGroup}>
        <Button
          size='icon'
          variant='neutral'
          rippleStyle='light'
        >
          <Trash2Icon
            size={20}
            color={theme.colors.gray[500]}
          />
        </Button>

        <Button
          size='icon'
          variant='neutral'
        >
          <PlayIcon
            size={20}
            color={theme.colors.lime[600]}
            fill={theme.colors.lime[600]}
          />
        </Button>

        <Button
          size='icon'
        >
          <CheckIcon
            size={20}
            color={theme.colors.black[700]}
          />
        </Button>
      </View>

      <AppText
        color={theme.colors.gray[500]}
        style={styles.actionLabel}
        align='center'
      >
        {formatSeconds(0)} / {formatSeconds(duration)}
      </AppText>
    </>
  );
}

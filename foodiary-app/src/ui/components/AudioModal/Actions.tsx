import { theme } from '@ui/styles/theme';
import { formatSeconds } from '@ui/utils/formatSeconds';
import { MicIcon, SquareIcon } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { AppText } from '../AppText';
import { Button } from '../Button';
import { AudioPlayer } from './AudioPlayer';
import { styles } from './styles';
import { AudioModalState } from './useAudioModalController';

interface IActionsProps {
  state: AudioModalState;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

export function Actions({ state, onStartRecording,onStopRecording }: IActionsProps) {
  const [recordingTimeInSeconds, setRecordingTimeInSeconds] = useState(0);

  useEffect(() => {
    if (state !== 'recording') {
      return;
    }

    const intervalId = setInterval(() => {
      setRecordingTimeInSeconds(prevState => prevState + 1);
    }, 1000);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [state]);

  if (state === 'idle') {
    return (
      <>
        <Button
          size='icon'
          variant='neutral'
          rippleStyle='light'
          onPress={onStartRecording}
        >
          <MicIcon size={20} color={theme.colors.lime[600]} />
        </Button>

        <AppText
          color={theme.colors.gray[500]}
          style={styles.actionLabel}
          align='center'
        >
          Clique no microfone para começar a gravar
        </AppText>
      </>
    );
  }

  if (state === 'recording') {
    return (
      <>
        <Button
          size='icon'
          variant='neutral'
          rippleStyle='light'
          onPress={onStopRecording}
        >
          <SquareIcon
            size={20}
            color={theme.colors.lime[600]}
            fill={theme.colors.lime[600]}
          />
        </Button>

        <AppText
          color={theme.colors.gray[500]}
          style={styles.actionLabel}
          align='center'
        >
          {formatSeconds(recordingTimeInSeconds)}
        </AppText>
      </>
    );
  }

  if (state === 'recorded') {
    return <AudioPlayer duration={100} />;
  }

  return null;
}

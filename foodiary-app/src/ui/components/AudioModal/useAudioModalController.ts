import { useState } from 'react';

export type AudioModalState = 'idle' | 'recording' | 'recorded'

export function useAudioModalController() {
  const [state, setState] = useState<AudioModalState>('idle');

  function handleStartRecording() {
    setState('recording');
  }

  function handleStopRecording() {
    setState('recorded');
  }

  return {
    state,
    handleStartRecording,
    handleStopRecording,
  };
}

export const DEFAULT_SKELETON_SIZE = 32;

export const baseColors = {
  dark: {
    primary: 'rgb(17, 17, 17)',
    secondary: 'rgb(51, 51, 51)',
  },
  light: {
    primary: 'rgb(250, 250, 250)',
    secondary: 'rgb(185, 185, 185)',
  },
} as const;

export type SkeletonColorMode = keyof typeof baseColors;

export const makeColors = (mode: SkeletonColorMode): string[] => {
  if (mode === 'dark') {
    return [
      'rgb(17, 17, 17)',
      'rgb(22, 22, 22)',
      'rgb(28, 28, 28)',
      'rgb(35, 35, 35)',
      'rgb(43, 43, 43)',
      'rgb(51, 51, 51)',
      'rgb(43, 43, 43)',
      'rgb(35, 35, 35)',
      'rgb(28, 28, 28)',
      'rgb(22, 22, 22)',
      'rgb(17, 17, 17)',
    ];
  }

  return [
    'rgb(250, 250, 250)',
    'rgb(242, 242, 242)',
    'rgb(232, 232, 232)',
    'rgb(220, 220, 220)',
    'rgb(205, 205, 205)',
    'rgb(190, 190, 190)',
    'rgb(175, 175, 175)',
    'rgb(190, 190, 190)',
    'rgb(205, 205, 205)',
    'rgb(220, 220, 220)',
    'rgb(232, 232, 232)',
    'rgb(242, 242, 242)',
    'rgb(250, 250, 250)',
  ];
};

export const defaultDarkColors = makeColors('dark');
export const defaultLightColors = makeColors('light');

import { OnboardingStackParamsList } from './OnboardingStack';

export const orderedSteps: (keyof OnboardingStackParamsList)[] = [
  'Goal',
  'Gender',
  'BirthDate',
  'Height',
  'Weight',
  'ActivityLevel',
  'CreateAccount',
];

export const TOTAL_STEPS = orderedSteps.length;

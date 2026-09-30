import { ArrowRightIcon } from 'lucide-react-native';

import { Button } from '@ui/components/Button';
import { theme } from '@ui/styles/theme';

import { Gender } from '@app/types/Gender';
import { RadioGroup, RadioGroupIcon, RadioGroupItem, RadioGroupLabel } from '@ui/components/RadioGroup';
import {
  Step,
  StepContent,
  StepFooter,
  StepHeader,
  StepSubtitle,
  StepTitle,
} from '../components/Step';
import { useOnboarding } from '../context/useOnboarding';

export function GenderStep() {
  const { nextStep } = useOnboarding();

  return (
    <Step>
      <StepHeader>
        <StepTitle>Qual é o seu gênero?</StepTitle>
        <StepSubtitle>Seu gênero influencia no tipo da dieta</StepSubtitle>
      </StepHeader>

      <StepContent>
        <RadioGroup orientation='horizontal'>
          <RadioGroupItem value={Gender.MALE}>
            <RadioGroupIcon>👱‍♂️</RadioGroupIcon>
            <RadioGroupLabel>Masculino</RadioGroupLabel>
          </RadioGroupItem>
          <RadioGroupItem value={Gender.FEMALE}>
            <RadioGroupIcon>👩</RadioGroupIcon>
            <RadioGroupLabel>Feminino</RadioGroupLabel>
          </RadioGroupItem>
        </RadioGroup>
      </StepContent>

      <StepFooter>
        <Button size='icon' onPress={nextStep}>
          <ArrowRightIcon size={20} color={theme.colors.black[700]} />
        </Button>
      </StepFooter>
    </Step>
  );
}

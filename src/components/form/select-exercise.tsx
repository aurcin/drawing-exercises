import { useState } from 'react';
import { Plus } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

import { useExercisesStore } from '@/store/exercises';
import { useThemeStore } from '@/store/theme';

interface ExerciseSelectProps {
  className?: string;
}

function ExerciseSelect(props: ExerciseSelectProps) {
  const { className = '' } = props;

  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);

  const { theme } = useThemeStore();
  const { exercises } = useExercisesStore();

  const buttonText = selectedExercise ? `Add` : 'Select an exercise first';

  return (
    <div className={`flex flex-col md:flex-row  gap-2 ${className}`}>
      <Select onValueChange={value => setSelectedExercise(value)}>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Select an exercise to add' />
        </SelectTrigger>
        <SelectContent className={theme}>
          {Object.keys(exercises).map(exercise => {
            const { title, id } = exercises[exercise];
            return (
              <SelectItem key={id} value={id}>
                {title}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Button
        type='button'
        variant='outline'
        disabled={selectedExercise ? false : true}>
        <Plus className='mr-1 h-4 w-4' />
        {buttonText}
      </Button>
    </div>
  );
}

export default ExerciseSelect;

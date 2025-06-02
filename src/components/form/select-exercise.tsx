import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useExercisesStore } from '@/store/exercises';

interface ExerciseSelectProps {
  className?: string;
}

function ExerciseSelect(props: ExerciseSelectProps) {
  const { className = '' } = props;

  const { exercises } = useExercisesStore();
  return (
    <div className={className}>
      <Select>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Select an exercise to add' />
        </SelectTrigger>
        <SelectContent>
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
    </div>
  );
}

export default ExerciseSelect;

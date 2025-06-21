import type { ScheduleExerciseCell } from '@/lib/types';

import { useExercisesStore } from '@/store/exercises';

interface ScheduleCellProps {
  exercise: ScheduleExerciseCell;
}

function ScheduleCell(props: ScheduleCellProps) {
  const { exercise } = props.exercise;

  const { exercises } = useExercisesStore();

  const currentExercise = exercises[exercise];

  if (!currentExercise) {
    return <div className='border-1 p-2'>Failed to load exercise</div>;
  }

  return (
    <div className='border-1 p-2 h-full'>
      <h2 className='font-semibold text-primary'>{currentExercise.title}</h2>

      <div className='text-sm'>
        {currentExercise.images_per_exercise} img{' '}
        <span className='text-muted-foreground text-xs'>
          (
          {Math.floor(currentExercise.time / 60) === currentExercise.time / 60
            ? currentExercise.time / 60
            : (currentExercise.time / 60).toFixed(2)}
          min)
        </span>
      </div>
    </div>
  );
}

export default ScheduleCell;

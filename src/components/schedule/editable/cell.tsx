import { Trash2 } from 'lucide-react';

import type { ScheduleExerciseCell } from '@/lib/types';

import { useExercisesStore } from '@/store/exercises';
import { Button } from '@/components/ui/button';

interface ScheduleCellProps {
  exercise: ScheduleExerciseCell;
  onDelete: () => void;
}

function ScheduleCell(props: ScheduleCellProps) {
  const {
    exercise: { exercise },
    onDelete,
  } = props;

  const { exercises } = useExercisesStore();

  const currentExercise = exercises[exercise];

  if (!currentExercise) {
    return <div className='border-1 p-2'>Failed to load exercise</div>;
  }

  return (
    <div className='border-1 p-2 h-full flex flex-col'>
      <h2 className='font-semibold text-primary line-clamp-2'>
        {currentExercise.title}
      </h2>

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

      <div className='flex justify-between mt-auto'>
        <Button
          onClick={onDelete}
          variant='ghost'
          className='mt-2 ml-auto'
          size='icon'
          title='Remove exercise'>
          <Trash2 className='size-3' />
        </Button>
      </div>
    </div>
  );
}

export default ScheduleCell;

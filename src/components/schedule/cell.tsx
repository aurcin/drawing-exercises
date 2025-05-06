import { Link, useParams } from 'react-router';

import { PATHS } from '@/routes/paths';

import { useExercisesStore } from '@/store/exercises';

import { cn } from '@/lib/utils';
import type { ScheduleExerciseCell } from '@/lib/types';
import ClickableStatusButton from '../ui/clickable-status-button';
import { useScheduleStore } from '@/store/schedules';

interface ScheduleCellProps {
  exercise: ScheduleExerciseCell;
}

function ScheduleCell(props: ScheduleCellProps) {
  const { exercise, isCompleted } = props.exercise;

  let { id } = useParams();

  const { exercises } = useExercisesStore();
  const { toggleExerciseStatus } = useScheduleStore();

  const currentExercise = exercises[exercise];

  if (!currentExercise) {
    return <div className='border-1 p-2'>Failed to load exercise</div>;
  }

  return (
    <div className='border-1 p-4 relative h-full '>
      <div className='pr-10'>
        <h2
          className={cn('text-xl font-semibold text-primary', {
            'text-muted-foreground': isCompleted,
          })}>
          <Link
            to={PATHS.EXERCISE_REFFERED(currentExercise.id, {
              scheduleId: id as string,
              exerciseId: props.exercise.id,
            })}>
            {currentExercise.title}
          </Link>
        </h2>

        <div>
          {currentExercise.images_per_exercise} img{' '}
          <span className='text-muted-foreground text-sm'>
            ({currentExercise.time / 60}
            min)
          </span>
        </div>
      </div>
      <ClickableStatusButton
        onClick={() => toggleExerciseStatus(id as string, props.exercise.id)}
        status={isCompleted ? 'completed' : 'not-completed'}
        className='absolute top-2 right-2'
      />
    </div>
  );
}

export default ScheduleCell;

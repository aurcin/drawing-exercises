import ScheduleCell from '@/components/schedule/editable/cell';

import type { ScheduleExerciseCell } from '@/lib/types';

interface ScheduleBoardProps {
  exercises: ScheduleExerciseCell[];
}

function ScheduleBoard(props: ScheduleBoardProps) {
  const { exercises } = props;

  if (!exercises || exercises.length === 0) {
    return (
      <div className='mt-6 text-muted-foreground'>
        There are no exercises in this schedule
      </div>
    );
  }

  return (
    <ul className='grid grid-cols-1 lg:grid-cols-5 gap-0 mt-2 rounded-lg border-1 shadow'>
      {exercises.map(exercise => {
        return (
          <li key={exercise.id}>
            <ScheduleCell exercise={exercise} />
          </li>
        );
      })}
    </ul>
  );
}

export default ScheduleBoard;

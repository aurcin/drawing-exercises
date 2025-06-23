import type { Schedule, ScheduleExerciseCell } from '@/lib/types';
import ScheduleCell from '@/components/schedule/cell';

interface ScheduleProps {
  exercises: ScheduleExerciseCell[];
}

function Schedule(props: ScheduleProps) {
  const { exercises } = props;

  return (
    <ul className='grid grid-cols-1 lg:grid-cols-5 gap-x-0.5 gap-y-0.5 lg:gap-y-3 mt-2'>
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

export default Schedule;

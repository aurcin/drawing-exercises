import type { Schedule, ScheduleExerciseCell } from '@/lib/types';
import ScheduleCell from '@/components/schedule/cell';

interface ScheduleProps {
  exercises: ScheduleExerciseCell[];
}

function Schedule(props: ScheduleProps) {
  const { exercises } = props;

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

export default Schedule;

import { Link } from 'react-router';

import CollapsibleItem from '@/components/navigation/sidebar/colapsible';
import { PATHS } from '@/routes/paths';
import { useScheduleStore } from '@/store/schedules';
import { Check } from 'lucide-react';

function Schedules() {
  const { schedules } = useScheduleStore();

  return (
    <CollapsibleItem title='Schedules'>
      <ul className=' mt-2 space-y-4 md:space-y-2'>
        {Object.keys(schedules).map(schedule => {
          const { name, id, exercises } = schedules[schedule];
          return (
            <li key={id} className='flex justify-between px-4'>
              <Link to={PATHS.SCHEDULE(id)}>{name}</Link>
              {exercises.every(exercise => exercise.isCompleted) && (
                <Check className='stroke-primary size-4' />
              )}
            </li>
          );
        })}
      </ul>
    </CollapsibleItem>
  );
}

export default Schedules;

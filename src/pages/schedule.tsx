import { useParams } from 'react-router';
import { ArrowRight } from 'lucide-react';

import Schedule from '@/components/schedule';

import NotFound from '@/pages/not-found';

import { useScheduleStore } from '@/store/schedules';

function ShedulePage() {
  let { id } = useParams();

  const { schedules } = useScheduleStore();
  const schedule = schedules[id as string];

  if (!schedule) {
    return <NotFound title='Schedule not found' />;
  }

  return (
    <section>
      <h1 className='text-2xl'>{schedule.name}</h1>
      <p className='text-sm text-muted-foreground mt-4'>
        (from left to right{' '}
        <ArrowRight
          aria-hidden
          className='inline w-3.5 stroke-muted-foreground'
        />
        )
      </p>
      <Schedule data={schedule} />
    </section>
  );
}

export default ShedulePage;

import { useParams } from 'react-router';
import { ArrowRight, RotateCcw, Check } from 'lucide-react';

import Schedule from '@/components/schedule';

import NotFound from '@/pages/not-found';

import { useScheduleStore } from '@/store/schedules';
import { Button } from '@/components/ui/button';

function ShedulePage() {
  let { id } = useParams();

  const {
    schedules,
    completeSheduleById,
    getScheduleStatus,
    resetSheduleById,
  } = useScheduleStore();
  const schedule = schedules[id as string];
  const status = getScheduleStatus(id as string);

  if (!schedule) {
    return <NotFound title='Schedule not found' />;
  }

  return (
    <section>
      <h1 className='text-2xl'>{schedule.title}</h1>
      <div className='flex justify-end gap-1'>
        <p className='text-sm text-muted-foreground mt-4 mr-auto'>
          (from left to right{' '}
          <ArrowRight
            aria-hidden
            className='inline w-3.5 stroke-muted-foreground'
          />
          )
        </p>
        {status !== 'completed' && (
          <Button
            size='sm'
            variant='outline'
            title='Mark all as done'
            onClick={() => completeSheduleById(id as string)}>
            <Check className='bg-transparent stroke-primary stroke-3 size-4' />
          </Button>
        )}
        {status !== 'not-started' && (
          <Button
            size='sm'
            variant='outline'
            title='Reset schedule progress'
            onClick={() => resetSheduleById(id as string)}>
            <RotateCcw className='bg-transparent stroke-destructive stroke-3 size-4' />
          </Button>
        )}
      </div>
      <Schedule data={schedule} />
    </section>
  );
}

export default ShedulePage;

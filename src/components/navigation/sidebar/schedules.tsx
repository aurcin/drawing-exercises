import { useState, useEffect } from 'react';
import { Link, useMatch } from 'react-router';
import { Check, FilePlus2 } from 'lucide-react';

import CollapsibleItem from '@/components/navigation/sidebar/colapsible';
import { Button } from '@/components/ui/button';

import { PATHS } from '@/routes/paths';

import { useScheduleStore } from '@/store/schedules';

function Schedules() {
  const { schedules } = useScheduleStore();
  const match = useMatch(PATHS.SCHEDULES);
  const [selected, setSelected] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (match && match.params && match.params.id) {
      setSelected(match.params.id);
    } else {
      setSelected(undefined);
    }
  }, [match]);

  return (
    <CollapsibleItem title='Schedules'>
      <ul className=' mt-2 space-y-4 md:space-y-2'>
        {Object.keys(schedules).map(schedule => {
          const { title, id, exercises } = schedules[schedule];
          const isSelected = id === selected;
          return (
            <li
              key={id}
              className={`px-4 py-4 md:py-2 flex justify-between ${
                isSelected ? 'bg-neutral-300 dark:bg-neutral-700 rounded' : ''
              }`}>
              <Link to={PATHS.SCHEDULE(id)} className='bg-transparent'>
                {title}
              </Link>
              {exercises.length > 0 &&
                exercises.every(exercise => exercise.isCompleted) && (
                  <Check className='stroke-primary size-4 bg-transparent' />
                )}
            </li>
          );
        })}
      </ul>
      <div className='border-b mt-2 px-4 py-2 flex gap-2'>
        <Button asChild variant='outline' size='sm'>
          <Link to={PATHS.CREATE_SCHEDULES} title='New Schedule'>
            <FilePlus2 className='size-4 bg-transparent' />
          </Link>
        </Button>
        {/* 
        {selected && (
          <>
            <Button variant='outline' asChild size='sm'>
              <Link
                to={PATHS.EDIT_EXERCISE(selected)}
                title={`Edit an Exercise ${exercises[selected].title}`}>
                <SquarePen />
              </Link>
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className='ml-auto'
                  variant='outline'
                  size='sm'
                  title={`Delete an Exercise ${exercises[selected].title}`}>
                  <Trash2 className='bg-transparen' />
                </Button>
              </DialogTrigger>
              <DialogContent className={theme}>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  This action cannot be undone. It will permanently delete the
                  exercise <b>'{exercises[selected].title}'</b> and remove it
                  from any schedules that include it.
                </DialogDescription>
                <DialogFooter className='sm:justify-start'>
                  <DialogClose asChild>
                    <Button asChild type='submit' variant='destructive'>
                      <Link to={PATHS.DELETE_EXERCISE(selected)}>
                        Yes, Delete it
                      </Link>
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}
         */}
      </div>
    </CollapsibleItem>
  );
}

export default Schedules;

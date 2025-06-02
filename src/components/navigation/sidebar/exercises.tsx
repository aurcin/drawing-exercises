import { Link, useMatch } from 'react-router';
import { FilePlus2, SquarePen, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

import CollapsibleItem from '@/components/navigation/sidebar/colapsible';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import { PATHS } from '@/routes/paths';

import { useExercisesStore } from '@/store/exercises';
import { useThemeStore } from '@/store/theme';

function Exercises() {
  const { exercises } = useExercisesStore();
  const match = useMatch(PATHS.EXERCISES);
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const { theme } = useThemeStore();

  useEffect(() => {
    if (match && match.params && match.params.id) {
      setSelected(match.params.id);
    } else {
      setSelected(undefined);
    }
  }, [match]);

  return (
    <CollapsibleItem title='Exercises'>
      <ul className='mt-2 '>
        {Object.keys(exercises).map(exercise => {
          const { title, id } = exercises[exercise];
          const isSelected = id === selected;
          return (
            <li
              key={id}
              className={`px-4 py-4 md:py-2 ${
                isSelected ? 'bg-neutral-300 dark:bg-neutral-700 rounded' : ''
              }`}>
              <Link to={PATHS.EXERCISE(id)}>{title}</Link>
            </li>
          );
        })}
      </ul>
      <div className='border-b mt-2 px-4 py-2 flex gap-2'>
        <Button asChild variant='outline' size='sm'>
          <Link to={PATHS.CREATE_EXERCISES} title='New Exercise'>
            <FilePlus2 className='size-4 ' />
          </Link>
        </Button>
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
                  <Trash2 />
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
      </div>
    </CollapsibleItem>
  );
}

export default Exercises;

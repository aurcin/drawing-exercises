import { Link } from 'react-router';
import { SquarePen, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
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

import { PATHS } from '@/routes/paths';

import { useThemeStore } from '@/store/theme';

interface ManageExerciseButtonsProps {
  title: string;
  id: string;
  className?: string;
}

function ManageExerciseButtons(props: ManageExerciseButtonsProps) {
  const { title, id, className = '' } = props;

  const { theme } = useThemeStore();

  return (
    <div className={`flex gap-1 ${className}`}>
      <Button variant='outline' asChild size='sm'>
        <Link to={PATHS.EDIT_EXERCISE(id)} title={`edit an exercise ${title}`}>
          <SquarePen />
        </Link>
      </Button>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant='destructive'
            size='sm'
            title={`delete an exercise ${title}`}>
            <Trash2 className='bg-transparent stroke-white' />
          </Button>
        </DialogTrigger>
        <DialogContent className={theme}>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            This action cannot be undone. It will permanently delete the
            exercise <b>'{title}'</b> and remove it from any schedules that
            include it.
          </DialogDescription>
          <DialogFooter className='sm:justify-start'>
            <DialogClose asChild>
              <Button asChild type='submit' variant='destructive'>
                <Link to={PATHS.DELETE_EXERCISE(id)}>Yes, Delete it</Link>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ManageExerciseButtons;

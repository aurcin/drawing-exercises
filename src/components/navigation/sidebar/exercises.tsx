import { Link } from 'react-router';
import { FilePlus2 } from 'lucide-react';

import CollapsibleItem from '@/components/navigation/sidebar/colapsible';

import { PATHS } from '@/routes/paths';

import { useExercisesStore } from '@/store/exercises';
import { Button } from '@/components/ui/button';

function Exercises() {
  const { exercises } = useExercisesStore();

  return (
    <CollapsibleItem title='Exercises'>
      <ul className='mt-2 space-y-4 md:space-y-2'>
        {Object.keys(exercises).map(exercise => {
          const { title, id } = exercises[exercise];
          return (
            <li key={id} className='px-4'>
              <Link to={PATHS.EXERCISE(id)}>{title}</Link>
            </li>
          );
        })}
      </ul>
      <ul className='border-b mt-2 px-4 py-2'>
        <li>
          <Button asChild variant='outline' size='sm'>
            <Link to={PATHS.CREATE_EXERCISES} title='New Exercise'>
              <FilePlus2 className='size-4  bg-transparent' />
            </Link>
          </Button>
        </li>
      </ul>
    </CollapsibleItem>
  );
}

export default Exercises;

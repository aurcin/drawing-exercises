import { Link } from 'react-router';

import CollapsibleItem from '@/components/navigation/sidebar/colapsible';

import { PATHS } from '@/routes/paths';

import { useExercisesStore } from '@/store/exercises';

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
    </CollapsibleItem>
  );
}

export default Exercises;

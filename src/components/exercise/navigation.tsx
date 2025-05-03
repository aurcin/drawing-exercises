import type { ExerciseState } from '@/lib/types';

import { Button } from '@/components/ui/button';

interface ExerciseNavigationProps {
  state: ExerciseState;

  onStart: () => void;

  children?: React.ReactNode;
}

function ExerciseNavigation(props: ExerciseNavigationProps) {
  const { state, onStart, children } = props;

  if (state === 'description') {
    return (
      <Button size='lg' className='my-4' onClick={onStart}>
        Exercise
      </Button>
    );
  }

  return children;
}

export default ExerciseNavigation;

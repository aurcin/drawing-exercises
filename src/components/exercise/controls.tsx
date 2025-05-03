import { Link } from 'react-router';

import { Button } from '@/components/ui/button';

import { PATHS } from '@/routes/paths';

interface ControlsProps {
  statusText: string;
  hasNext: boolean;
  isLastImage: boolean;
  schouldMarkAsComplete: boolean;
  timeLeft: string;

  onStop: () => void;
  onReset: () => void;
  onNext: () => void;
  onComplete: () => void;
}

function Controls(props: ControlsProps) {
  const {
    statusText,
    hasNext,
    isLastImage,
    schouldMarkAsComplete,
    timeLeft,
    onStop,
    onReset,
    onNext,
    onComplete,
  } = props;

  return (
    <div className='mt-4 lg:mt-0 flex flex-col lg:flex-row gap-4 lg:items-end justify-between mb-2'>
      <Button variant='outline' onClick={onStop}>
        Exercise Description
      </Button>

      <div>
        <div className='text-xs text-muted-foreground text-center'>
          {statusText}
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-1 mt-3 lg:mt-1'>
          <Button
            className='w-full  lg:w-[140px]'
            variant='destructive'
            onClick={onReset}>
            Another Image
          </Button>
          {hasNext && (
            <Button className='w-full lg:w-[140px]' onClick={onNext}>
              Next Image
            </Button>
          )}

          {isLastImage &&
            (schouldMarkAsComplete ? (
              <Button className='w-full lg:w-[140px]' onClick={onComplete}>
                Done
              </Button>
            ) : (
              <Button className='w-full lg:w-[140px]' asChild>
                <Link to={PATHS.HOME}>Done</Link>
              </Button>
            ))}
        </div>
      </div>

      <div className='text-center'>
        <span className='text-xs text-muted-foreground text-center'>
          time for this image
        </span>
        <div className='text-4xl font-bold text-complimentary'>{timeLeft}</div>
      </div>
    </div>
  );
}

export default Controls;

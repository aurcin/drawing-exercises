import { Check, Minus } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface ClickableStatusButtonProps {
  onClick: () => void;

  status?: 'completed' | 'not-completed';
  className?: string;
}

function ClickableStatusButton(props: ClickableStatusButtonProps) {
  const { onClick, status = 'not-completed', className = '' } = props;

  return (
    <>
      <Button className={className} variant='ghost' onClick={onClick}>
        {status === 'completed' ? (
          <Check className='stroke-primary size-8 bg-transparent' />
        ) : (
          <Minus className='stroke-neutral-400 dark:stroke-neutral-600 size-8 bg-transparent' />
        )}
      </Button>
    </>
  );
}

export default ClickableStatusButton;

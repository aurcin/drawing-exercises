import { Link } from 'react-router';

import { Button } from '@/components/ui/button';

import { PATHS } from '@/routes/paths';

interface NotFoundProps {
  title?: string;
}

function NotFound(props: NotFoundProps) {
  const { title = '404 Page not found' } = props;
  return (
    <div>
      <h1 className='text-2xl'>{title}</h1>
      <Button asChild className='mt-4'>
        <Link to={PATHS.HOME}>Back to home</Link>
      </Button>
    </div>
  );
}

export default NotFound;

import { Link } from 'react-router';
import { SidebarTrigger } from '../ui/sidebar';
import { PATHS } from '@/routes/paths';

function Navbar() {
  return (
    <header className='border-b-1 py-2'>
      <div className='container mx-auto flex gap-4 items-center'>
        <SidebarTrigger
          title='Show Exercises'
          variant={'outline'}
          size={'icon'}
          className='size-[36px] ml-2'
        />

        <h1 className='text-xl font-semibold'>
          <Link to={PATHS.HOME} className='text-primary'>
            Drawing Exercises
          </Link>
        </h1>
      </div>
    </header>
  );
}

export default Navbar;

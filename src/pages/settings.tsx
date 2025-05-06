import { RotateCcw } from 'lucide-react';

import ThemeToggle from '@/components/navigation/theme-toggle';
import { Button } from '@/components/ui/button';

import { useExercisesStore } from '@/store/exercises';
import { useScheduleStore } from '@/store/schedules';

function SettingsPage() {
  const { resetExercises } = useExercisesStore();
  const { resetAllSchedules } = useScheduleStore();

  function handleReset() {
    resetExercises();
    resetAllSchedules();
  }

  return (
    <>
      <h1 className='text-2xl'>Settings</h1>
      <ul className='mt-4 space-y-4 max-w-[400px]'>
        <li className='flex justify-between items-center'>
          Theme <ThemeToggle className='' />
        </li>
        <li className='flex justify-between items-center'>
          Reset all progress and data to default
          <Button
            variant='destructive'
            size='icon'
            onClick={handleReset}
            title='Reset all progress and data to default'>
            <RotateCcw className='bg-transparent stroke-white' />
          </Button>
        </li>
      </ul>
    </>
  );
}

export default SettingsPage;

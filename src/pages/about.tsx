import { Link } from 'react-router';
import { RotateCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { PATHS } from '@/routes/paths';

import { useExercisesStore } from '@/store/exercises';
import { useScheduleStore } from '@/store/schedules';

function AboutPage() {
  const { resetExercises } = useExercisesStore();
  const { resetAllSchedules } = useScheduleStore();

  function handleReset() {
    resetExercises();
    resetAllSchedules();
  }
  return (
    <section className='container max-w-[800px] space-y-4'>
      <h1 className='text-2xl'>About</h1>
      <p className='text-neutral-800 dark:text-neutral-200 '>
        This project is my personal take on drawing exercises, inspired by the
        book <b>The Natural Way to Draw by Kimon Nicolaides</b>. I'm not a
        professional artist, nor do I attend art school or have access to live
        models—so I created this tool to help track my progress and organize my
        practice.
      </p>
      <p>
        Each exercise shows an image along with a suggested amount of time for
        drawing. If you're not satisfied with the image, you can generate a new
        one by clicking on <i>Another Image</i> button. When you're done, click
        the <i>Next Image</i> button (if the exercise includes multiple images)
        or mark the exercise as complete.
      </p>
      <p>
        By default, the images are AI-generated and follow the subjects
        recommended in the book. And yes—they're AI-generated, so please forgive
        the occasional model with extra fingers or other anomalies. If you
        prefer to use your own materials, you can edit the exercises to set your
        own time limits and upload custom images. Currently, this requires
        opening your browser's developer tools and manually editing local
        storage (<i>schedules</i> and <i>exercises</i>). In the future, I plan
        to add a user interface for editing, saving, importing, and exporting
        exercises.
      </p>

      <p>
        You're welcome to contribute to the project{' '}
        <Link
          className='text-primary underline'
          to={PATHS.REPO}
          target='_blank'>
          github repository
        </Link>{' '}
        or share your ideas and drawings with me at{' '}
        <Link className='text-primary underline' to={`mailto: ${PATHS.EMAIL}`}>
          {PATHS.EMAIL}
        </Link>
        —I may even add a gallery in the future.
      </p>

      <h2 className='text-2xl mt-12'>Updates</h2>

      <h3 className=' text-foreground/60 flex justify-between'>
        <i>2025.05.08</i>
        <span className='text-sm'>v 0.2</span>
      </h3>
      <ul className='list-disc list-inside space-y-2'>
        <li>Added the ability to manage exercise and schedule progress</li>
        <li>
          Implemented Exercise 2.{' '}
          <div>
            (if you alredy used this app and loaded previous exercise data, you
            need to{' '}
            <Button
              size='sm'
              variant='destructive'
              onClick={handleReset}
              title='Reset all progress and data to default'>
              <RotateCcw className='bg-transparent stroke-white' />
              Reset
            </Button>{' '}
            data to see updated exercises)
          </div>
        </li>
      </ul>
    </section>
  );
}

export default AboutPage;

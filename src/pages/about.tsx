import { PATHS } from '@/routes/paths';
import { Link } from 'react-router';

function AboutPage() {
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
    </section>
  );
}

export default AboutPage;

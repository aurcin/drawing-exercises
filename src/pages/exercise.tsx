import { useParams, useSearchParams } from 'react-router';

import useExercise from '@/hooks/use-exercise';

import Description from '@/components/exercise/description';
import Preview from '@/components/exercise/preview';
import ExerciseNavigation from '@/components/exercise/navigation';
import Controls from '@/components/exercise/controls';

import NotFound from '@/pages/not-found';

import { useExercisesStore } from '@/store/exercises';

function ExercisePage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const scheduleId = searchParams.get('scheduleId') || null;
  const exerciseId = searchParams.get('exerciseId') || null;

  const { exercises } = useExercisesStore();
  const exercise = exercises[id as string];
  if (!exercise) {
    return <NotFound title='Exercise not found' />;
  }

  const {
    state,
    image,
    timer,
    startExercise,
    stopExercise,
    resetImage,
    nextImage,
    completeExercise,
  } = useExercise(exercise, scheduleId, exerciseId);

  const { title, description, examples, images_per_exercise } = exercise;

  return (
    <section className='max-w-[700px]'>
      <h1 className='text-2xl'>{title}</h1>

      <ExerciseNavigation state={state} onStart={startExercise}>
        <Controls
          statusText={`Image ${image?.index || 1} of ${image?.total}`}
          hasNext={(image?.index || 0) < images_per_exercise}
          isLastImage={(image?.index || 0) == images_per_exercise}
          schouldMarkAsComplete={scheduleId && exerciseId ? true : false}
          timeLeft={timer.get()}
          onStop={stopExercise}
          onReset={resetImage}
          onNext={nextImage}
          onComplete={completeExercise}
        />
      </ExerciseNavigation>

      {state === 'description' ? (
        <Description description={description} examples={examples} />
      ) : (
        <Preview image={image?.image || null} />
      )}
    </section>
  );
}

export default ExercisePage;

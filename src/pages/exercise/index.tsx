import { useParams, useSearchParams } from 'react-router';

import Description from '@/components/exercise/description';
import Preview from '@/components/exercise/preview';
import ExerciseNavigation from '@/components/exercise/navigation';
import Controls from '@/components/exercise/controls';

import useExercise from '@/hooks/use-exercise';

import NotFound from '@/pages/not-found';

import { useExercisesStore } from '@/store/exercises';

import ManageExerciseButtons from '@/components/exercise/manage-buttons';

function ExercisePage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  if (!id) {
    return <NotFound title='Exercise not found' />;
  }

  const scheduleId = searchParams.get('scheduleId') || null;
  const exerciseId = searchParams.get('exerciseId') || null;

  const exercise = useExercisesStore().exercises[id];
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
      <div className='flex items-center gap-4'>
        <h1 className='text-2xl'>{title}</h1>
        {state === 'description' && id && (
          <ManageExerciseButtons title={title} id={id} />
        )}
      </div>

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

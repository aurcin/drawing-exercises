import { useParams, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { LoaderCircle } from 'lucide-react';

import NotFound from '@/pages/not-found';

import { useExercisesStore } from '@/store/exercises';
import { useScheduleStore } from '@/store/schedules';

import { PATHS } from '@/routes/paths';

function DeleteExercisePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    return <NotFound title='Exercise not found' />;
  }

  const { deleteExercise } = useExercisesStore();
  const { removeExerciseFromAllSchedules } = useScheduleStore();

  useEffect(() => {
    removeExerciseFromAllSchedules(id);
    deleteExercise(id);
    navigate(PATHS.HOME);
  }, [id]);

  return (
    <>
      <div className='flex gap-2 mt-8'>
        <LoaderCircle className='animate-spin' /> Deleting Exercise <b>{id}</b>
      </div>
    </>
  );
}

export default DeleteExercisePage;

import { useParams, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import FormField from '@/components/form/field';
import { Button } from '@/components/ui/button';
import ScheduleBoard from '@/components/schedule/editable';
import ExerciseSelect from '@/components/form/select-exercise';

import useScheduleBoard from '@/hooks/use-schedule-board';

import { type ScheduleFormData, ScheduleSchema } from '@/lib/types';

import NotFound from '@/pages/not-found';

import { PATHS } from '@/routes/paths';

import { useScheduleStore } from '@/store/schedules';

function EditSchedulePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { schedules, updateSchedule } = useScheduleStore();

  if (!id) {
    return <NotFound title='Schedule not found' />;
  }

  const schedule = schedules[id];
  const { title } = schedule;

  const { exercises, addExercise, removeExercise, swapExercises } =
    useScheduleBoard(schedule.exercises);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleFormData>({
    resolver: zodResolver(ScheduleSchema),
  });

  async function onSubmit(data: ScheduleFormData) {
    updateSchedule({ ...data, id: schedule.id, exercises });
    toast('Schedule has been updated.');
    navigate(PATHS.SCHEDULE(id!));
  }

  return (
    <section className='max-w-[700px]'>
      <h1 className='text-2xl'>
        <b>{title}</b> schedule update
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className='text-lg mt-6 '>Schedule fields</h2>
        <FormField
          className='mt-6'
          label='Title'
          type='text'
          placeholder='Schedule 1'
          name='title'
          register={register}
          error={errors.title}
          defaultValue={title}
        />

        <hr className='my-8' />
        <h2 className='text-lg mt-6'>Exercises</h2>

        <ScheduleBoard
          exercises={exercises}
          onSwap={swapExercises}
          onDelete={removeExercise}
        />

        <ExerciseSelect className='mt-4' onAdd={addExercise} />

        <hr className='my-8' />

        <Button type='submit' className='mt-6 w-full md:w-fit'>
          Update Schedule
        </Button>
      </form>
    </section>
  );
}

export default EditSchedulePage;

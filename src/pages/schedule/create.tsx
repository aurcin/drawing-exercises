import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import FormField from '@/components/form/field';
import { Button } from '@/components/ui/button';
import ExerciseSelect from '@/components/form/select-exercise';
import ScheduleBoard from '@/components/schedule/editable';

import { ScheduleSchema, type ScheduleFormData } from '@/lib/types';
import { generateId } from '@/lib/utils';

import { PATHS } from '@/routes/paths';

import { useScheduleStore } from '@/store/schedules';
import useScheduleBoard from '@/hooks/use-schedule-board';

function CreateShedulePage() {
  const { createSchedule } = useScheduleStore();
  const navigate = useNavigate();

  const { exercises, addExercise, removeExercise, swapExercises } =
    useScheduleBoard([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleFormData>({
    resolver: zodResolver(ScheduleSchema),
  });

  async function onSubmit(data: ScheduleFormData) {
    const id = generateId();

    createSchedule({ ...data, id, exercises });
    toast('Schedule has been created.');
    navigate(PATHS.SCHEDULE(id));
  }

  return (
    <section className='max-w-[700px]'>
      <h1 className='text-2xl font-medium'>Create a new schedule</h1>
      <h2></h2>
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
          Create Schedule
        </Button>
      </form>
    </section>
  );
}

export default CreateShedulePage;

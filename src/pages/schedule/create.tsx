import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import FormField from '@/components/form/field';
import { Button } from '@/components/ui/button';

import { useScheduleStore } from '@/store/schedules';

import {
  ScheduleSchema,
  type ScheduleFormData,
  type ScheduleExerciseCell,
} from '@/lib/types';
import { PATHS } from '@/routes/paths';
import ExerciseSelect from '@/components/form/select-exercise';

function CreateShedulePage() {
  const { createSchedule } = useScheduleStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleFormData>({
    resolver: zodResolver(ScheduleSchema),
  });

  const generateId = () =>
    's_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);

  const onSubmit = async (data: ScheduleFormData) => {
    const id = generateId();
    const exercises: ScheduleExerciseCell[] = [];
    createSchedule({ ...data, id, exercises });
    toast('Schedule has been created.');
    navigate(PATHS.SCHEDULE(id));
  };
  return (
    <section className='max-w-[700px]'>
      <h1 className='text-2xl'>Create a new schedule:</h1>
      <h2></h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className='text-xl mt-6 font-medium'>Schedule fields</h2>
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
        <h2 className='text-xl mt-6 font-medium'>Exercises</h2>
        <ExerciseSelect className='mt-4' />

        <Button type='submit' className='mt-6 w-full md:w-fit'>
          Create
        </Button>
      </form>
    </section>
  );
}

export default CreateShedulePage;

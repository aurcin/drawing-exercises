import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';

import FormField from '@/components/form/field';

import NotFound from '@/pages/not-found';

import { useExercisesStore } from '@/store/exercises';

import type { Exercise } from '@/lib/types';
import { Button } from '@/components/ui/button';

function EditExercisePage() {
  const { id } = useParams();
  const { getExerciseById } = useExercisesStore();

  if (!id) {
    return <NotFound title='Exercise not found' />;
  }
  const exercise = getExerciseById(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Exercise>();

  const onSubmit = async (data: Exercise) => {
    console.log('SUCCESS', data);
  };

  return (
    <section className='max-w-[700px]'>
      <h1 className='text-2xl'>
        Update Exercise: <span className='font-bold'>{id}</span>
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          className='mt-6'
          label='Title'
          type='text'
          placeholder='Exercise 1'
          name='title'
          register={register}
          error={errors.title}
        />

        <FormField
          className='mt-6'
          label='Description'
          type='textarea'
          placeholder='In this exercise, you will train your eyes, hand, and mind to work together by practicing pure observation...'
          name='description'
          register={register}
          error={errors.description}
        />

        <div className='mt-6 flex gap-2'>
          <FormField
            className='grow'
            label='Exercise duration (in seconds)'
            type='number'
            placeholder='600'
            name='time'
            valueAsNumber
            register={register}
            error={errors.time}
          />
          <FormField
            className='grow'
            label='Image count per exercise'
            type='number'
            placeholder='5'
            name='images_per_exercise'
            valueAsNumber
            register={register}
            error={errors.images_per_exercise}
          />
        </div>
        <Button type='submit' className='mt-6 w-full md:w-fit'>
          Update
        </Button>
      </form>
    </section>
  );
}

export default EditExercisePage;

import { useParams, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import FormField from '@/components/form/field';
import { Button } from '@/components/ui/button';

import NotFound from '@/pages/not-found';

import { useExercisesStore } from '@/store/exercises';

import { ExerciseSchema, type ExerciseFormData } from '@/lib/types';
import { PATHS } from '@/routes/paths';

function EditExercisePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { exercises, updateExercise } = useExercisesStore();

  if (!id) {
    return <NotFound title='Exercise not found' />;
  }
  const exercise = exercises[id];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExerciseFormData>({
    resolver: zodResolver(ExerciseSchema),
  });

  const onSubmit = async (data: ExerciseFormData) => {
    updateExercise(id, { id, ...data });
    toast('Exercise has been updated');
    navigate(PATHS.EXERCISE(id));
  };

  return (
    <section className='max-w-[700px]'>
      <h1 className='text-2xl'>
        <b>{id}</b> exercise update
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className='text-lg mt-6'>Exercise description fields</h2>
        <FormField
          className='mt-6'
          label='Title'
          type='text'
          placeholder='Exercise 1'
          name='title'
          register={register}
          error={errors.title}
          defaultValue={exercise?.title}
        />

        <FormField
          className='mt-6'
          label='Description'
          type='textarea'
          placeholder='In this exercise, you will train your eyes, hand, and mind to work together by practicing pure observation...'
          name='description'
          register={register}
          error={errors.description}
          defaultValue={exercise?.description}
        />

        <FormField
          className='mt-6'
          label='Example image(s)'
          type='textarea'
          placeholder={`https://raw.githubusercontent.com/aurcin/exercise-images/refs/heads/master/examples/1.jpg, https://raw.githubusercontent.com/aurcin/exercise-images/refs/heads/master/examples/2.jpg`}
          name='examples'
          register={register}
          error={
            Array.isArray(errors.examples)
              ? errors.examples[0]
              : errors.examples
          }
          defaultValue={exercise?.examples.join(',\n')}
          description='An URL of completed exercise image. Enter urls separated by commas or new lines. Each example must be a valid URL.'
        />

        <div className='mt-6 flex gap-2'>
          <FormField
            className='grow'
            label='Total exercise duration (in seconds)'
            type='number'
            placeholder='600'
            name='time'
            valueAsNumber
            register={register}
            error={errors.time}
            defaultValue={exercise?.time}
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
            defaultValue={exercise?.images_per_exercise}
          />
        </div>
        <p className='text-sm mt-2 text-muted-foreground'>
          Time per image is calculated by dividing the total exercise duration
          by the image count per exercise. For example, if the duration is 600
          seconds and the image count is 5, the time per image will be 120
          seconds.
        </p>

        <hr className='my-8' />

        <h2 className='text-lg mt-6 '>Exercise images</h2>

        <FormField
          className='mt-6'
          label='Images'
          type='textarea'
          placeholder={`https://raw.githubusercontent.com/aurcin/exercise-images/refs/heads/master/examples/1.jpg, https://raw.githubusercontent.com/aurcin/exercise-images/refs/heads/master/examples/2.jpg`}
          name='images'
          register={register}
          error={
            Array.isArray(errors.images) ? errors.images[0] : errors.images
          }
          defaultValue={exercise?.images.join(',\n')}
          description='A URL of images to draw. Each time the exercise runs, it takes the first image from the list and moves it to the end. If your exercise has 5 images to draw and you plan to use this exercise in a schedule 3 times, ensure the exercise has at least 15 images (5 for each exercise in the schedule). Otherwise, images will be repeated. Enter URLs separated by commas, spaces, or new lines. Each image must be a valid URL.'
        />
        <Button type='submit' className='mt-6 w-full md:w-fit'>
          Update
        </Button>
      </form>
    </section>
  );
}

export default EditExercisePage;

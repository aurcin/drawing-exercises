import { z, ZodType } from 'zod';
import { FieldError, UseFormRegister } from 'react-hook-form';

import type { ExerciseFormData } from '@/lib/types/exercises';

export type ValidFieldNames =
  | 'title'
  | 'description'
  | 'time'
  | 'images_per_exercise'
  | 'images'
  | 'examples';

export type FormFieldProps = {
  type: string;
  placeholder: string;
  label: string;
  name: ValidFieldNames;
  register: UseFormRegister<ExerciseFormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
  className?: string;
  defaultValue?: string | number;
};

export const ExerciseSchema: ZodType<ExerciseFormData> = z.object({
  title: z.string().min(1, { message: 'Title is required' }),

  description: z.string().min(1, {
    message: 'Description is required',
  }),

  time: z
    .number({
      required_error: 'Time for exercise is required',
      invalid_type_error: 'Time for exercise is required',
    })
    .min(1, { message: 'Time must be a positive number' }),

  images_per_exercise: z
    .number({
      required_error: 'Number of images for exercise is required',
      invalid_type_error: 'Number of images for exercise is required',
    })
    .min(1, { message: 'Number of images must be a positive number' }),
});

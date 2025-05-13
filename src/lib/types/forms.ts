import { z } from 'zod';
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
  description?: string;
};

export const ExerciseSchema: any = z.object({
  title: z.string().min(1, { message: 'Title is required' }),

  description: z.string().min(1, {
    message: 'Description is required',
  }),

  examples: z
    .string()
    .optional()
    .transform(
      value =>
        value
          ?.split(/[\s,]+/)
          .map(url => url.trim())
          .filter(Boolean) || []
    )
    .refine(
      urls => urls.every(url => z.string().url().safeParse(url).success),
      { message: 'Each example must be a valid URL' }
    ),

  images: z
    .string()
    .transform(
      value =>
        value
          ?.split(/[\s,]+/)
          .map(url => url.trim())
          .filter(Boolean) || []
    )
    .refine(
      urls =>
        urls.length > 0 &&
        urls.every(url => z.string().url().safeParse(url).success),
      { message: 'Each example must be a valid URL' }
    ),

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

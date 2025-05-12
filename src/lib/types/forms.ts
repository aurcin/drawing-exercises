import { FieldError, UseFormRegister } from 'react-hook-form';

import type { Exercise } from '@/lib/types/exercises';

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
  register: UseFormRegister<Exercise>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
  className?: string;
};

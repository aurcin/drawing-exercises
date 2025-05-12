import type { FormFieldProps } from '@/lib/types';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { cn } from '@/lib/utils';

function FormField(props: FormFieldProps) {
  const {
    type,
    placeholder,
    register,
    valueAsNumber,
    name,
    error,
    label,
    className = '',
    defaultValue,
  } = props;

  return (
    <div className={className}>
      <label htmlFor={name}>{label}</label>
      {type !== 'textarea' ? (
        <Input
          defaultValue={defaultValue}
          className={cn('mt-2', { 'border-red-500': error })}
          type={type}
          id={name}
          placeholder={placeholder}
          {...register(name, { valueAsNumber })}
        />
      ) : (
        <Textarea
          defaultValue={defaultValue}
          className={cn('mt-2', { 'border-red-500': error })}
          id={name}
          placeholder={placeholder}
          {...register(name, { valueAsNumber })}
        />
      )}
      {error && (
        <span className='text-red-500 dark:text-red-400'>{error.message}</span>
      )}
    </div>
  );
}

export default FormField;

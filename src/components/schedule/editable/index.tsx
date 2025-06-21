import { useState } from 'react';
import { Trash2 } from 'lucide-react';

import ScheduleCell from '@/components/schedule/editable/cell';

import type { ScheduleExerciseCell } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ScheduleBoardProps {
  exercises: ScheduleExerciseCell[];
  onSwap: (sourceIndex: number, targetIndex: number) => void;
  onDelete: (exerciseId: string) => void;
}

function ScheduleBoard(props: ScheduleBoardProps) {
  const { exercises, onDelete, onSwap } = props;

  const [source, setSource] = useState<number | null>(null);
  const [target, setTarget] = useState<number | null>(null);

  function handleDragStart(
    _event: React.DragEvent<HTMLLIElement>,
    idx: number
  ) {
    setSource(idx);
  }

  function handleDragOver(event: React.DragEvent<HTMLLIElement>, idx: number) {
    event.preventDefault();
    if (source === null) {
      return;
    }

    if (source === idx) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    let targetIndex = x < rect.width / 2 ? idx : idx + 1;

    if (targetIndex < 0) {
      targetIndex = 0;
    } else if (targetIndex > exercises.length) {
      targetIndex = exercises.length;
    }

    if (targetIndex === source) {
      return;
    }

    setTarget(targetIndex);
  }

  function handleDragLeave() {
    setTarget(null);
  }

  function handleDrop(event: React.DragEvent<HTMLUListElement>) {
    event.preventDefault();

    if (target !== null && source !== null && source !== target) {
      onSwap(source, target);
    }

    setSource(null);
    setTarget(null);
  }

  function handleDragEnd() {
    setSource(null);
    setTarget(null);
  }

  function handleDelete() {
    console.log('delete', source);

    if (source !== null) {
      onDelete(exercises[source].id);
      setSource(null);
      setTarget(null);
    }
  }

  if (!exercises || exercises.length === 0) {
    return (
      <div className='mt-6 text-muted-foreground'>
        There are no exercises in this schedule
      </div>
    );
  }

  return (
    <div className='flex flex-col md:flex-row gap-2'>
      <ul
        onDragOver={e => e.preventDefault()}
        onDrop={handleDrop}
        className='grow grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-lg border-1 shadow'>
        {exercises.map((exercise, idx) => {
          return (
            <li
              key={exercise.id}
              draggable
              onDragStart={e => handleDragStart(e, idx)}
              onDragOver={e => handleDragOver(e, idx)}
              onDragLeave={handleDragLeave}
              onDragEnd={handleDragEnd}>
              <ScheduleCell
                className={cn('cursor-move', {
                  'opacity-20': source == idx,
                  'border-r-primary': target === idx + 1,
                  'border-l-primary': target === idx,
                })}
                exercise={exercise}
              />
            </li>
          );
        })}
      </ul>
      <div
        className='flex flex-col items-center justify-center gap-2 p-4 bg-rose-400 text-background dark:bg-rose-600 dark:text-foreground text-xs rounded text-center'
        onDragOver={e => e.preventDefault()}
        onDrop={handleDelete}>
        <Trash2 className='size-4' />
        Drag here to delete
      </div>
    </div>
  );
}

export default ScheduleBoard;

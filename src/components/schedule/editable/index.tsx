import { useState } from 'react';

import ScheduleCell from '@/components/schedule/editable/cell';

import type { ScheduleExerciseCell } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ScheduleBoardProps {
  exercises: ScheduleExerciseCell[];
  onDelete: (exerciseId: string) => void;
}

function ScheduleBoard(props: ScheduleBoardProps) {
  const { exercises, onDelete } = props;

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
    setSource(null);
    setTarget(null);

    event.preventDefault();
  }

  if (!exercises || exercises.length === 0) {
    return (
      <div className='mt-6 text-muted-foreground'>
        There are no exercises in this schedule
      </div>
    );
  }

  return (
    <>
      <p>
        source: {source} | taget: {target}
      </p>
      <ul
        onDragOver={e => e.preventDefault()}
        onDrop={handleDrop}
        className='grid grid-cols-1 lg:grid-cols-5 gap-0 mt-2 rounded-lg border-1 shadow'>
        {exercises.map((exercise, idx) => {
          return (
            <li
              key={exercise.id}
              draggable
              onDragStart={e => handleDragStart(e, idx)}
              onDragOver={e => handleDragOver(e, idx)}
              onDragLeave={handleDragLeave}>
              <ScheduleCell
                className={cn('cursor-move', {
                  'opacity-20': source == idx,
                  'border-r-primary': target === idx + 1,
                  'border-l-primary': target === idx,
                })}
                exercise={exercise}
                onDelete={() => onDelete(exercise.id)}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ScheduleBoard;

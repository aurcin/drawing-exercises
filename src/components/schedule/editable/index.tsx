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

  function handleDragStart(event: React.DragEvent<HTMLLIElement>) {
    event.dataTransfer.setData('id', event.currentTarget.id);
    console.log('Drag started for:', event.currentTarget.id);
  }

  function handleDrop(event: React.DragEvent<HTMLUListElement>) {
    event.preventDefault();
    const id = event.dataTransfer.getData('id');
    console.log('Drop event for:', id);
  }

  if (!exercises || exercises.length === 0) {
    return (
      <div className='mt-6 text-muted-foreground'>
        There are no exercises in this schedule
      </div>
    );
  }

  return (
    <ul
      onDragOver={e => e.preventDefault()}
      onDrop={handleDrop}
      className='grid grid-cols-1 lg:grid-cols-5 gap-0 mt-2 rounded-lg border-1 shadow'>
      {exercises.map(exercise => {
        const { id } = exercise;
        return (
          <li
            key={id}
            id={id}
            className='cursor-move'
            draggable
            onDragStart={handleDragStart}>
            <ScheduleCell exercise={exercise} onDelete={() => onDelete(id)} />
          </li>
        );
      })}
    </ul>
  );
}

export default ScheduleBoard;

import { useState } from 'react';

import type { ScheduleExerciseCell } from '@/lib/types';
import { generateId } from '@/lib/utils';

function useScheduleBoard(initialExercises: ScheduleExerciseCell[]) {
  const [exercises, setExercises] =
    useState<ScheduleExerciseCell[]>(initialExercises);

  function addExercise(exerciseId: string) {
    const id = generateId();
    setExercises(previousState => {
      return [
        ...previousState,
        { id, exercise: exerciseId, isCompleted: false },
      ];
    });
  }

  function removeExercise(exerciseId: string) {
    setExercises(previousState => {
      return previousState.filter(exercise => exercise.id !== exerciseId);
    });
  }

  function swapExercises(sourceIndex: number, targetIndex: number) {
    setExercises(previousExercises => {
      const updatedExercises: any[] = [...previousExercises];

      updatedExercises[sourceIndex] = null;
      updatedExercises.splice(targetIndex, 0, previousExercises[sourceIndex]);

      return updatedExercises.filter(exercise => exercise !== null);
    });
  }

  return {
    exercises,
    addExercise,
    removeExercise,
    swapExercises,
  };
}

export default useScheduleBoard;

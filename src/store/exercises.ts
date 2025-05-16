import { create } from 'zustand';

import data from '@/data/exercises.json';
import { EXERCISES_KEY } from '@/lib/constants';
import { deepClone } from '@/lib/utils';
import type { ExercisesStoreState, ExercisesData } from '@/lib/types';

export const useExercisesStore = create<ExercisesStoreState>()(set => {
  const storedExercises = localStorage.getItem(EXERCISES_KEY);

  let exercises: ExercisesData = {};

  if (storedExercises) {
    exercises = JSON.parse(storedExercises) as ExercisesData;
  } else {
    exercises = deepClone(data);
    localStorage.setItem(EXERCISES_KEY, JSON.stringify(exercises));
  }

  return {
    exercises,

    getExerciseById: (id: string) => {
      const exercise = exercises[id];
      if (!exercise) {
        return null;
      }

      return exercise;
    },

    createExercise: (exercise: ExercisesData[string]) => {
      set(state => {
        const updatedExercises = {
          ...state.exercises,
          [exercise.id]: exercise,
        };
        localStorage.setItem(EXERCISES_KEY, JSON.stringify(updatedExercises));
        return { ...state, exercises: updatedExercises };
      });
    },

    updateExercise: (id: string, exercise: ExercisesData[string]) => {
      set(state => {
        const updatedExercises = { ...state.exercises, [id]: exercise };
        localStorage.setItem(EXERCISES_KEY, JSON.stringify(updatedExercises));
        return { ...state, exercises: updatedExercises };
      });
    },

    deleteExercise: (id: string) => {
      let wasDeleted = false;
      set(state => {
        const updatedExercises = { ...state.exercises };
        if (!updatedExercises[id]) {
          return { ...state };
        }
        delete updatedExercises[id];
        localStorage.setItem(EXERCISES_KEY, JSON.stringify(updatedExercises));
        wasDeleted = true;
        return { ...state, exercises: updatedExercises };
      });
      return wasDeleted;
    },

    getNextImage: (id: string) => {
      let pulledImage: string | null = null;

      set(state => {
        const updatedExercises = { ...state.exercises };
        const images = updatedExercises[id]?.images;

        if (images && images.length !== 0) {
          pulledImage = images.shift() || null;
          if (pulledImage) {
            images.push(pulledImage);
            updatedExercises[id].images = images;
            localStorage.setItem(
              EXERCISES_KEY,
              JSON.stringify(updatedExercises)
            );
            return { ...state, exercises: updatedExercises };
          }
        }

        return { ...state };
      });

      return pulledImage;
    },

    resetExercises: () => {
      const exercises = deepClone(data);
      localStorage.setItem(EXERCISES_KEY, JSON.stringify(exercises));
      set({ exercises });
    },
  };
});

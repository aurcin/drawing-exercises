import { create } from 'zustand';

import data from '@/data/schedules.json';
import { SCHEDULES_KEY } from '@/lib/constants';
import { deepClone } from '@/lib/utils';
import type { SchedulesStoreState, SchedulesData } from '@/lib/types';

export const useScheduleStore = create<SchedulesStoreState>()((set, get) => {
  const storedSchedules = localStorage.getItem(SCHEDULES_KEY);

  let schedules: SchedulesData = {};

  if (storedSchedules) {
    schedules = JSON.parse(storedSchedules) as SchedulesData;
  } else {
    schedules = deepClone(data);
    localStorage.setItem(SCHEDULES_KEY, JSON.stringify(schedules));
    schedules = data;
  }

  return {
    schedules,

    markExerciseAsCompleted: (scheduleId: string, exerciseId: string) => {
      set(state => {
        const updatedSchedules = { ...state.schedules };
        const schedule = updatedSchedules[scheduleId];
        const exercise = schedule.exercises.find(
          (exercise: { id: string }) => exercise.id === exerciseId
        );

        if (!exercise) {
          return { ...state };
        }

        exercise.isCompleted = true;
        localStorage.setItem(SCHEDULES_KEY, JSON.stringify(updatedSchedules));
        return { ...state, schedules: updatedSchedules };
      });
    },

    toggleExerciseStatus: (scheduleId: string, exerciseId: string) => {
      set(state => {
        const updatedSchedules = { ...state.schedules };
        const schedule = updatedSchedules[scheduleId];
        const exercise = schedule.exercises.find(
          (exercise: { id: string }) => exercise.id === exerciseId
        );

        if (!exercise) {
          return { ...state };
        }

        exercise.isCompleted = !exercise.isCompleted;
        localStorage.setItem(SCHEDULES_KEY, JSON.stringify(updatedSchedules));
        return { ...state, schedules: updatedSchedules };
      });
    },

    completeSheduleById: (scheduleId: string) => {
      set(state => {
        const updatedSchedules = { ...state.schedules };
        const schedule = updatedSchedules[scheduleId];
        if (!schedule) {
          return { ...state };
        }

        const exercises = schedule.exercises.map(exercise => {
          return { ...exercise, isCompleted: true };
        });

        schedule.exercises = exercises;

        localStorage.setItem(SCHEDULES_KEY, JSON.stringify(updatedSchedules));
        return { ...state, schedules: updatedSchedules };
      });
    },

    resetSheduleById: (scheduleId: string) => {
      set(state => {
        const updatedSchedules = { ...state.schedules };
        const schedule = updatedSchedules[scheduleId];
        if (!schedule) {
          return { ...state };
        }

        const exercises = schedule.exercises.map(exercise => {
          return { ...exercise, isCompleted: false };
        });

        schedule.exercises = exercises;

        localStorage.setItem(SCHEDULES_KEY, JSON.stringify(updatedSchedules));
        return { ...state, schedules: updatedSchedules };
      });
    },

    getScheduleStatus: (scheduleId: string) => {
      const schedule = get().schedules[scheduleId];

      if (!schedule) {
        return 'not-started';
      }

      const allCompleted = schedule.exercises.every(
        exercise => exercise.isCompleted
      );
      if (allCompleted) {
        return 'completed';
      }

      const noneCompleted = schedule.exercises.every(
        exercise => !exercise.isCompleted
      );
      if (noneCompleted) {
        return 'not-started';
      }

      return 'in-progress';
    },

    removeExerciseFromAllSchedules: (exerciseId: string) => {
      set(state => {
        const updatedSchedules = { ...state.schedules };

        Object.keys(updatedSchedules).forEach(scheduleId => {
          const schedule = updatedSchedules[scheduleId];
          schedule.exercises = schedule.exercises.filter(
            exercise => exercise.exercise !== exerciseId
          );
        });

        localStorage.setItem(SCHEDULES_KEY, JSON.stringify(updatedSchedules));
        return { ...state, schedules: updatedSchedules };
      });
    },

    resetAllSchedules: () => {
      const schedules = deepClone(data);
      localStorage.setItem(SCHEDULES_KEY, JSON.stringify(schedules));
      set({ schedules });
    },
  };
});

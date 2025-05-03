import { create } from 'zustand';

import data from '@/data/schedules.json';
import { SCHEDULES_KEY } from '@/lib/constants';
import { deepClone } from '@/lib/utils';
import type { SchedulesStoreState, SchedulesData } from '@/lib/types';

export const useScheduleStore = create<SchedulesStoreState>()(set => {
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

    resetSchedules: () => {
      const schedules = deepClone(data);
      localStorage.setItem(SCHEDULES_KEY, JSON.stringify(schedules));
      set({ schedules });
    },
  };
});

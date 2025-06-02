export type ScheduleExerciseCell = {
  id: string;
  exercise: string;
  isCompleted: boolean;
};

export type Schedule = {
  id: string;
  title: string;
  exercises: ScheduleExerciseCell[];
};

export type ScheduleStatus = 'completed' | 'in-progress' | 'not-started';

export type SchedulesData = Record<string, Schedule>;
export type SchedulesStoreState = {
  schedules: SchedulesData;

  createSchedule: (schedule: Schedule) => void;

  markExerciseAsCompleted: (scheduleId: string, exerciseId: string) => void;
  toggleExerciseStatus: (scheduleId: string, exerciseId: string) => void;

  getScheduleStatus: (scheduleId: string) => ScheduleStatus;
  completeSheduleById: (scheduleId: string) => void;
  resetSheduleById: (scheduleId: string) => void;

  removeExerciseFromAllSchedules: (exerciseId: string) => void;

  resetAllSchedules: () => void;
};

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
  deleteSchedule: (id: string) => boolean;
  updateSchedule: (schedule: Schedule) => void;

  markExerciseAsCompleted: (scheduleId: string, exerciseId: string) => void;
  removeExerciseFromAllSchedules: (exerciseId: string) => void;
  toggleExerciseStatus: (scheduleId: string, exerciseId: string) => void;

  completeSheduleById: (scheduleId: string) => void;
  getScheduleStatus: (scheduleId: string) => ScheduleStatus;
  resetAllSchedules: () => void;
  resetSheduleById: (scheduleId: string) => void;
};

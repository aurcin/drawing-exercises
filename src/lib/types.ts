// ------------ THEMING ------------- //

export type Theme = 'light' | 'dark';

export type ThemeStoreState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

// ----------- EXERCISES and SCHEDULES ------------- //

export type Exercise = {
  id: string;
  title: string;
  description: string;
  time: number;
  images_per_exercise: number;
  images: string[];
  examples: string[];
};

export type ExerciseState = 'description' | 'preview';

export type ExerciseImageState = {
  image: string;
  index: number;
  total: number;
};

export type ExercisesData = Record<string, Exercise>;

export type ExercisesStoreState = {
  exercises: ExercisesData;

  getNextImage: (id: string) => string | null;
  resetExercises: () => void;
};

export type ScheduleExerciseCell = {
  id: string;
  exercise: string;
  isCompleted: boolean;
};

export type Schedule = {
  id: string;
  name: string;
  exercises: ScheduleExerciseCell[];
};

export type SchedulesData = Record<string, Schedule>;
export type SchedulesStoreState = {
  schedules: SchedulesData;

  markExerciseAsCompleted: (scheduleId: string, exerciseId: string) => void;
  resetSchedules: () => void;
};

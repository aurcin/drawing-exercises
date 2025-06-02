import type { Exercise, Theme, Schedule } from '@/lib/types';

// ------------ THEMING ------------- //
export const DEFAULT_THEME: Theme = 'light';
export const THEME_KEY = 'theme';

// ----------- EXERCISES ------------- //
export const DEFAULT_EXERCISE: Exercise = {
  id: 'default',
  title: 'Default Exercise',
  description: 'Exercise Description',
  time: 0,
  images_per_exercise: 0,
  images: [],
  examples: [],
};

export const DEFAULT_SCHEDULE: Schedule = {
  id: 'default',
  title: 'Default',
  exercises: [],
};

export const EXERCISES_KEY = 'exercises';
export const SCHEDULES_KEY = 'schedules';

export const BASE_URL = 'https://aurcin.github.io/drawing-exercises';

export const CURRENT_VERSION = 'v 0.2';

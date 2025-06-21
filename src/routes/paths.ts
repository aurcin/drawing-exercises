export const PATHS = {
  HOME: '/drawing-exercises',
  SCHEDULES: '/schedules/:id',
  SCHEDULE: (id: string) => `/schedules/${id}`,
  CREATE_SCHEDULES: '/create/schedules',
  EDIT_SCHEDULES: '/edit/schedules/:id',
  EDIT_SCHEDULE: (id: string) => `/edit/schedules/${id}`,
  DELETE_SCHEDULES: '/delete/schedules/:id',
  DELETE_SCHEDULE: (id: string) => `/delete/schedules/${id}`,

  EXERCISES: '/exercises/:id',
  EXERCISE: (id: string) => `/exercises/${id}`,
  EXERCISE_REFFERED: (
    id: string,
    ref: { scheduleId: string; exerciseId: string }
  ) =>
    `/exercises/${id}?scheduleId=${ref.scheduleId}&exerciseId=${ref.exerciseId}`,
  CREATE_EXERCISES: '/create/exercises',
  EDIT_EXERCISES: '/edit/exercises/:id',
  EDIT_EXERCISE: (id: string) => `/edit/exercises/${id}`,
  DELETE_EXERCISES: '/delete/exercises/:id',
  DELETE_EXERCISE: (id: string) => `/delete/exercises/${id}`,

  SETTINGS: '/settings',
  ABOUT: '/about',
  EMAIL: 'aurcin@gmail.com',
  REPO: 'https://github.com/aurcin/drawing-exercises',
};

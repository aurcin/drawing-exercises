export const PATHS = {
  HOME: '/drawing-exercises',
  SCHEDULES: 'schedules/:id',
  SCHEDULE: (id: string) => `/schedules/${id}`,
  EXERCISES: 'exercises/:id',
  EXERCISE: (id: string) => `/exercises/${id}`,
  EXERCISE_REFFERED: (
    id: string,
    ref: { scheduleId: string; exerciseId: string }
  ) =>
    `/exercises/${id}?scheduleId=${ref.scheduleId}&exerciseId=${ref.exerciseId}`,
  SETTINGS: '/settings',
  ABOUT: '/about',
  EMAIL: 'aurcin@gmail.com',
  REPO: 'https://github.com/aurcin/drawing-exercises',
};

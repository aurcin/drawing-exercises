export type Exercise = {
  id: string;
  title: string;
  description: string;
  time: number;
  images_per_exercise: number;
  images: string[];
  examples: string[];
};

export type ExerciseFormData = {
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

  getExerciseById: (id: string) => Exercise | null;
  updateExercise: (id: string, exercise: Exercise) => void;
  deleteExercise: (id: string) => void;

  getNextImage: (id: string) => string | null;
  resetExercises: () => void;
};

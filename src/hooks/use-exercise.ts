import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import useTimer from '@/hooks/use-timer';

import { useExercisesStore } from '@/store/exercises';
import { useScheduleStore } from '@/store/schedules';

import type { Exercise, ExerciseImageState, ExerciseState } from '@/lib/types';

import { PATHS } from '@/routes/paths';

function useExercise(
  exercise: Exercise,
  scheduleId: string | null = null,
  exerciseId: string | null = null
) {
  const { id, time, images_per_exercise } = exercise;

  const [state, setState] = useState<ExerciseState>('description');
  const [image, setImage] = useState<ExerciseImageState | null>(null);

  const navigate = useNavigate();

  const timer = useTimer((time / images_per_exercise) as number);
  const { getNextImage } = useExercisesStore();
  const { markExerciseAsCompleted } = useScheduleStore();

  useEffect(() => {
    resetExercise();
  }, [id, scheduleId, exerciseId]);

  function startExercise() {
    setState('preview');

    if (!image) {
      const img = getNextImage(id);
      if (!img) {
        return;
      }

      setImage({
        image: img,
        index: 1,
        total: images_per_exercise,
      });
      timer.set();
    } else {
      timer.unpause();
    }
  }

  function resetExercise() {
    setState('description');
    setImage(null);
    timer.reset();
    timer.pause();
  }

  function resetImage() {
    const nextImage = getNextImage(id);
    setImage(previousImage => {
      if (!nextImage) {
        return previousImage;
      }

      return {
        image: nextImage,
        index: previousImage?.index || 1,
        total: images_per_exercise,
      };
    });
    timer.reset();
  }

  function nextImage() {
    if (!image) return;
    const nextImage = getNextImage(id);
    if (!nextImage) {
      return;
    }

    setImage(previousImage => {
      return {
        image: nextImage,
        index: (previousImage?.index || 1) + 1,
        total: images_per_exercise,
      };
    });
    timer.reset();
  }

  function stopExercise() {
    timer.pause();
    setState('description');
  }

  function completeExercise() {
    if (!scheduleId || !exerciseId) {
      return;
    }

    markExerciseAsCompleted(scheduleId, exerciseId);
    navigate(PATHS.SCHEDULE(scheduleId));
  }

  return {
    state,
    image,
    timer,
    startExercise,
    resetExercise,
    resetImage,
    nextImage,
    stopExercise,
    completeExercise,
  };
}

export default useExercise;

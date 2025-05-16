import { Routes, Route } from 'react-router';

import RootLayout from '@/components/layouts/root';
import NotFound from '@/pages/not-found';
import AboutPage from '@/pages/about';
import SettingsPage from '@/pages/settings';
import SchedulePage from '@/pages/schedule';
import ExercisePage from '@/pages/exercise';
import EditExercisePage from '@/pages/exercise/edit';

import { PATHS } from '@/routes/paths';
import DeleteExercisePage from '@/pages/exercise/delete';

function PageRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index path={'/'} element={<AboutPage />} />
        <Route path={PATHS.HOME} element={<AboutPage />} />
        <Route path={PATHS.ABOUT} element={<AboutPage />} />
        <Route path={PATHS.SETTINGS} element={<SettingsPage />} />
        <Route path={PATHS.SCHEDULES} element={<SchedulePage />} />
        <Route path={PATHS.EXERCISES} element={<ExercisePage />} />
        <Route path={PATHS.EDIT_EXERCISES} element={<EditExercisePage />} />
        <Route path={PATHS.DELETE_EXERCISES} element={<DeleteExercisePage />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}
export default PageRoutes;

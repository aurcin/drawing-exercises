import { useParams, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

import NotFound from '@/pages/not-found';

import { useScheduleStore } from '@/store/schedules';

import { PATHS } from '@/routes/paths';

function DeleteSchedulePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    return <NotFound title='Schedule not found' />;
  }

  const { deleteSchedule } = useScheduleStore();

  useEffect(() => {
    if (deleteSchedule(id)) {
      toast('Schedule has been deleted');
      navigate(PATHS.HOME);
    }
  }, []);

  return (
    <>
      <div className='flex gap-2 mt-8'>
        <LoaderCircle className='animate-spin' /> Deleting Schedule <b>{id}</b>
      </div>
    </>
  );
}

export default DeleteSchedulePage;

import { Settings, CircleHelp } from 'lucide-react';
import { Link } from 'react-router';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { Collapsible } from '@/components/ui/collapsible';
import Schedules from '@/components/navigation/sidebar/schedules';
import Exercises from '@/components/navigation/sidebar/exercises';
import ThemeToggle from '@/components/navigation/theme-toggle';
import { Button } from '@/components/ui/button';

import { useThemeStore } from '@/store/theme';

import { CURRENT_VERSION } from '@/lib/constants';

import { PATHS } from '@/routes/paths';

function AppSidebar() {
  const { theme } = useThemeStore();
  return (
    <Sidebar collapsible='offcanvas'>
      <SidebarHeader className={theme} />
      <SidebarContent className={theme}>
        <Collapsible className='group/collapsible'>
          <Schedules />
        </Collapsible>

        <Collapsible className='group/collapsible'>
          <Exercises />
        </Collapsible>
      </SidebarContent>
      <SidebarFooter className={theme}>
        <div className='text-right text-sm text-neutral-500'>
          {CURRENT_VERSION}
        </div>
        <div className='py-2 flex gap-2 justify-end'>
          <ThemeToggle />
          <Button
            asChild
            variant='outline'
            title='Go to the settings page'
            className='clickable'>
            <Link to={PATHS.SETTINGS}>
              <Settings />
            </Link>
          </Button>
          <Button
            asChild
            variant='outline'
            title='Go to the about page'
            className='clickable'>
            <Link to={PATHS.ABOUT}>
              <CircleHelp />
            </Link>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;

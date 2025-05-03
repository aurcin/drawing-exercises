import { Outlet } from 'react-router';

import Navbar from '@/components/navigation/navbar';
import AppSidebar from '@/components/navigation/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

function RootLayout() {
  return (
    <SidebarProvider defaultOpen>
      <AppSidebar />
      <div className='w-full'>
        <Navbar />
        <main className='p-4 container mx-auto'>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}

export default RootLayout;

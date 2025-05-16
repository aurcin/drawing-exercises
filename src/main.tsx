import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import { Toaster } from '@/components/ui/sonner';

import { ThemeProvider } from '@/providers/theme';

import PageRoutes from '@/routes';

import './globals.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <PageRoutes />
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);

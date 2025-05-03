import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import PageRoutes from '@/routes';
import { ThemeProvider } from '@/providers/theme';

import './globals.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <PageRoutes />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);

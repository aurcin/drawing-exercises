import { create } from 'zustand';

import { DEFAULT_THEME, THEME_KEY } from '@/lib/constants';
import type { ThemeStoreState, Theme } from '@/lib/types';

export const useThemeStore = create<ThemeStoreState>()(set => {
  const storedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
  let initialTheme: Theme = DEFAULT_THEME;

  if (!storedTheme) {
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    initialTheme = prefersDark ? 'dark' : 'light';
  } else {
    initialTheme = storedTheme;
  }

  return {
    theme: initialTheme,

    setTheme: (newTheme: Theme) => {
      localStorage.setItem(THEME_KEY, newTheme);
      set({ theme: newTheme });
    },

    toggleTheme: () => {
      set(state => {
        const newTheme = state.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem(THEME_KEY, newTheme);
        return { theme: newTheme };
      });
    },
  };
});

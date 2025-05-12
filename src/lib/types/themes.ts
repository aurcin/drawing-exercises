export type Theme = 'light' | 'dark';

export type ThemeStoreState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

import { Sun, Moon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useThemeStore } from '@/store/theme';

interface ThemeToggleProps {
  className?: string;
}
function ThemeToggle(props: ThemeToggleProps) {
  const { className = '' } = props;

  const { theme, toggleTheme } = useThemeStore();

  return (
    <Button
      className={className}
      size={'icon'}
      variant={'outline'}
      onClick={toggleTheme}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
      {theme === 'dark' ? (
        <Moon className='bg-transparent' />
      ) : (
        <Sun className='bg-transparent' />
      )}
    </Button>
  );
}

export default ThemeToggle;

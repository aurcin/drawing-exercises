import { useThemeStore } from '@/store/theme';

export const ThemeProvider = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  const { theme } = useThemeStore();

  return (
    <div className={theme} {...props}>
      {children}
    </div>
  );
};

import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const [ isDark, setIsDark ] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true'
    setIsDark(isDarkMode);
    if(isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, [])

  const toggleTheme = () => {
    const newDarkMode = !isDark
    setIsDark(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    if(newDarkMode) {
      document.documentElement.classList.add('dark')
    }else{
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="hover:bg-secondary-foreground transition-colors"
    >
      {isDark ? (
        <Sun className="h-4 w-4" data-testid="sun-icon" />
      ) : (
        <Moon className="h-4 w-4" data-testid="moon-icon" />
      )}
    </Button>
  );
}
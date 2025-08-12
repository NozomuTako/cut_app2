import { useState, useEffect } from 'react';

function useDarkModeCheck() {
  const [darkMode, setDarkMode] = useState(false);


  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => {
      setDarkMode(event.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    setDarkMode(mediaQuery.matches);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return { darkMode}
  };

export default useDarkModeCheck;
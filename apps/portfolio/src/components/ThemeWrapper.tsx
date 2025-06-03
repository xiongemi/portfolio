'use client';

import React, { useEffect, ReactNode } from 'react';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

function ThemeClassHandler({ children }: { children: ReactNode }) {
  const { theme } = useTheme();

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }, [theme]);

  return <>{children}</>;
}

export default function ThemeWrapper({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ThemeClassHandler>{children}</ThemeClassHandler>
    </ThemeProvider>
  );
}

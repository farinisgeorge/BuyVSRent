'use client';

import React from 'react';
import { useTheme } from '@/src/contexts/ThemeContext';

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { isDark } = useTheme();

  return (
    <div
      style={{
        backgroundColor: isDark ? '#0f172a' : '#ffffff',
        color: isDark ? '#ffffff' : '#0f172a',
        transition: 'background-color 0.2s ease, color 0.2s ease',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      {children}
    </div>
  );
}

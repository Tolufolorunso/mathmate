import React from 'react';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { dark, light } from '.';
import { useThemeStore } from '../store/themeStore';

export default function ThemeProvider({ children }) {
  const systemScheme = useColorScheme(); // 'light' | 'dark' | null
  const mode = useThemeStore((s) => s.mode); // 'light' | 'dark' | 'system'

  let finalTheme;

  if (mode === 'system') {
    finalTheme = systemScheme === 'dark' ? dark : light;
  } else {
    finalTheme = mode === 'dark' ? dark : light;
  }

  finalTheme = light;

  // Tell ExpoSystemUI to match the navigation bar (optional but nice)
  React.useEffect(() => {
    const apply = async () => {
      const { setBackgroundColorAsync } = await import('expo-system-ui');
      setBackgroundColorAsync(finalTheme.colors.background);
    };
    apply();
  }, [finalTheme]);

  return <PaperProvider theme={finalTheme}>{children}</PaperProvider>;
}

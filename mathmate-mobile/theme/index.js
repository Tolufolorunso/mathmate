import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

const baseColors = {
  primary: '#6366F1',
  secondary: '#F43F5E',
  success: '#10B981',
  error: '#EF4444',
  info: '#3B82F6',
};

export const light = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...baseColors,
    background: '#FFFFFF',
    surface: '#F7F8FA',
    onSurface: '#111827',
    primaryContainer: '#E0E7FF',
    onPrimaryContainer: '#28308D',
    secondaryContainer: '#FEDADF',
    onSecondaryContainer: '#9C2741',
    onBackground: '#111827',
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onSuccess: '#FFFFFF',
    onError: '#FFFFFF',
    onInfo: '#FFFFFF',
    outline: '#E5E7EB',
    elevation: {
      level0: '#FFFFFF',
      level1: '#F7F8FA',
      level2: '#F3F4F6',
      level3: '#E5E7EB',
      level4: '#D1D5DB',
      level5: '#9CA3AF',
    },
  },
};

export const dark = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...baseColors,
    background: '#121212',
    surface: '#1E1E1E',
    onSurface: '#E5E7EB',
    primaryContainer: '#2E328A',
    onPrimaryContainer: '#AEC8FF',
    secondaryContainer: '#8D273A',
    onSecondaryContainer: '#FFD9DD',
    onBackground: '#E5E7EB',
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onSuccess: '#FFFFFF',
    onError: '#FFFFFF',
    onInfo: '#FFFFFF',
    outline: '#374151',
    elevation: {
      level0: '#121212',
      level1: '#1E1E1E',
      level2: '#282828',
      level3: '#323232',
      level4: '#3D3D3D',
      level5: '#474747',
    },
  },
};

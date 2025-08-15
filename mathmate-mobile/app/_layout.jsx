import { Stack } from 'expo-router';
import ThemeProvider from '../theme/ThemeProvider';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='(tabs)' />
        <Stack.Screen name='(screens)/history' />
        <Stack.Screen name='(screens)/help' />
        <Stack.Screen name='(screens)/language' />
        <Stack.Screen name='(screens)/solution' />
      </Stack>
    </ThemeProvider>
  );
}

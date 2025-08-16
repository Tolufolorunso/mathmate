import { Tabs } from 'expo-router';
import { Icon, useTheme } from 'react-native-paper';

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let icon;
          if (route.name === 'index') icon = 'home';
          else if (route.name === 'math') icon = 'math-cos';
          else if (route.name === 'calculator') icon = 'calculator';
          else if (route.name === 'learn') icon = 'book-open';
          else if (route.name === 'profile') icon = 'account';
          return <Icon source={icon} size={size} color={color} />;
        },

        headerShown: false,

        // --- dynamic styling from the current theme ---
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.onSurface,

        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.elevation.level2, // subtle divider
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
      })}
    >
      <Tabs.Screen name='index' options={{ title: 'Home' }} />
      <Tabs.Screen name='math' options={{ title: 'Solve' }} />
      <Tabs.Screen name='calculator' options={{ title: 'Calculator' }} />
      <Tabs.Screen name='learn' options={{ title: 'Learn' }} />
      <Tabs.Screen name='profile' options={{ title: 'Profile' }} />
    </Tabs>
  );
}

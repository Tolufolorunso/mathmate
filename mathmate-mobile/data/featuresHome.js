import { useTheme } from 'react-native-paper';

const theme = useTheme();
const features = [
  {
    id: 'math',
    title: 'Solve Math Problems',
    subtitle: 'AI-powered math problem solver',
    icon: 'calculator',
    route: '(tabs)/math',
    color: theme.colors.primary,
    description:
      'Take a photo or type your math question and get instant solutions',
  },
  {
    id: 'calculator',
    title: 'Scientific Calculator',
    subtitle: 'Advanced mathematical functions',
    icon: 'calculator',
    route: '(tabs)/calculator',
    color: theme.colors.secondary,
    description:
      'Full-featured scientific calculator with calculus and statistics',
  },
  {
    id: 'learn',
    title: 'Learn Math',
    subtitle: 'Interactive learning modules',
    icon: 'school',
    route: '(tabs)/learn',
    color: theme.colors.success,
    description: 'Step-by-step tutorials and practice problems',
  },
  {
    id: 'games',
    title: 'Math Games',
    subtitle: 'Fun learning activities',
    icon: 'gamepad-variant',
    route: '/games',
    color: theme.colors.info,
    description: 'Educational games to improve your math skills',
  },
];

export default features;

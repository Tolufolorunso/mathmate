import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { Card, Icon, Text, useTheme } from 'react-native-paper';
import { FeaturesComponent } from '../../components/home/FeaturesComponent';
import { HomeHeroSection } from '../../components/home/HomeHeroSection';
import { HomeQuickTips } from '../../components/home/HomeQuickTips';
import { HomeRecentQuestions } from '../../components/home/HomeRecentQuestions';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppBar from '../../components/ui/AppBar';
import AppText from '../../components/ui/AppText';
import { useMathStore } from '../../store/mathStore';
import homeStyles from '../../style/home.style';

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { getQuestionHistory } = useMathStore();
  const questionHistory = getQuestionHistory();

  const styles = homeStyles();

  const quickStats = [
    {
      label: 'Problems Solved',
      value: questionHistory.length,
      icon: 'check-circle',
      color: theme.colors.success,
    },
    {
      label: 'Learning Streak',
      value: '7 days',
      icon: 'fire',
      color: theme.colors.error,
    },
    {
      label: 'Accuracy',
      value: '95%',
      icon: 'target',
      color: theme.colors.primary,
    },
  ];
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
      icon: 'math-compass',
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

  const recentQuestions = questionHistory.slice(0, 3);

  return (
    <>
      <AppBar title='MathMate' />
      <ScreenWrapper scrollable>
        {/* Hero Section */}
        <HomeHeroSection />

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          {quickStats.map((stat, index) => (
            <Card
              key={index}
              style={[
                styles.statCard,
                { backgroundColor: theme.colors.surface },
              ]}
              elevation={2}
            >
              <Card.Content style={styles.statContent}>
                <View
                  style={[
                    styles.statIcon,
                    { backgroundColor: stat.color + '20' },
                  ]}
                >
                  <Icon source={stat.icon} color={stat.color} size={20} />
                </View>
                <AppText
                  headlineSmall
                  style={[styles.statValue, { color: theme.colors.onSurface }]}
                >
                  {stat.value}
                </AppText>
                <Text
                  variant='bodySmall'
                  style={[
                    styles.statLabel,
                    { color: theme.colors.onSurfaceVariant },
                  ]}
                >
                  {stat.label}
                </Text>
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* Main Features */}
        <View style={styles.featuresSection}>
          <Text
            variant='headlineMedium'
            style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
          >
            What would you like to do?
          </Text>

          {features.map((feature, index) => (
            <FeaturesComponent feature={feature} key={index} />
          ))}
        </View>

        {/* Recent Activity */}
        {recentQuestions.length > 0 && (
          <HomeRecentQuestions questions={recentQuestions} />
        )}

        {/* Quick Tips */}
        <HomeQuickTips />
      </ScreenWrapper>
    </>
  );
}

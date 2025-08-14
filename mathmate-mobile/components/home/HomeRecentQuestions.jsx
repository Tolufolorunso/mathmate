import { Button, Card, Chip } from 'react-native-paper';

import { useRouter } from 'expo-router';
import { View } from 'react-native';
import AppText from '../ui/AppText';
export function HomeRecentQuestions({ questions, index }) {
  const theme = useTheme();
  const styles = homeStyles();
  const router = useRouter();
  return (
    <View style={styles.recentSection}>
      <View style={styles.recentHeader}>
        <AppText
          headlineMedium
          style={[
            styles.sectionTitle,
            {
              color: theme.colors.onSurface,
            },
          ]}
        >
          Recent Activity
        </AppText>
        <Button mode='text' onPress={() => router.push('(tabs)/math')} compact>
          View All
        </Button>
      </View>

      {questions.map((question) => (
        <Card
          key={question.id}
          style={[
            styles.recentCard,
            {
              backgroundColor: theme.colors.surface,
            },
          ]}
          elevation={1}
        >
          <Card.Content style={styles.recentContent}>
            <View style={styles.recentInfo}>
              <Chip
                mode='outlined'
                icon={question.type === 'image' ? 'camera' : 'keyboard'}
                style={styles.recentChip}
              >
                {question.type === 'image' ? 'Photo' : 'Text'}
              </Chip>
              <AppText
                bodySmall
                style={{
                  color: theme.colors.onSurfaceVariant,
                }}
              >
                {new Date(question.timestamp).toLocaleDateString()}
              </AppText>
            </View>
            <AppText
              bodyMedium
              style={{
                color: theme.colors.onSurface,
              }}
            >
              {question.type === 'image' ? 'Image Question' : question.content}
            </AppText>
            <AppText
              bodySmall
              style={[
                styles.recentStatus,
                {
                  color: theme.colors.success,
                },
              ]}
            >
              ✓ Solved
            </AppText>
          </Card.Content>
        </Card>
      ))}
    </View>
  );
}

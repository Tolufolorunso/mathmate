import { Card, useTheme } from 'react-native-paper';

import learnStyles from '../../style/learn.style';
import AppText from '../ui/AppText';

export function LearnHeaderSection({}) {
  const styles = learnStyles();
  const theme = useTheme();
  return (
    <Card
      style={[
        styles.headerCard,
        {
          backgroundColor: theme.colors.primaryContainer,
        },
      ]}
      elevation={4}
    >
      <Card.Content style={styles.headerContent}>
        <AppText
          displaySmall
          style={[
            styles.headerTitle,
            {
              color: theme.colors.onPrimaryContainer,
            },
          ]}
        >
          Master Mathematics 📚
        </AppText>
        <AppText
          bodyLarge
          style={[
            styles.headerSubtitle,
            {
              color: theme.colors.onPrimaryContainer,
            },
          ]}
        >
          Choose your level and start your learning journey with interactive
          lessons, practice problems, and step-by-step solutions.
        </AppText>
      </Card.Content>
    </Card>
  );
}

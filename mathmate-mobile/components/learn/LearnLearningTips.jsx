import { Card, useTheme } from 'react-native-paper';

import learnStyles from '../../style/learn.style';
import AppText from '../ui/AppText';
export function LearnLearningTips() {
  const styles = learnStyles();
  const theme = useTheme();
  return (
    <Card
      style={[
        styles.tipsCard,
        {
          backgroundColor: theme.colors.secondaryContainer,
        },
      ]}
      elevation={2}
    >
      <Card.Content>
        <AppText
          titleLarge
          style={[
            styles.tipsTitle,
            {
              color: theme.colors.onSecondaryContainer,
            },
          ]}
        >
          🎯 Learning Tips
        </AppText>
        <AppText
          bodyMedium
          style={[
            styles.tipsText,
            {
              color: theme.colors.onSecondaryContainer,
            },
          ]}
        >
          • Start with topics you're comfortable with{'\n'}• Practice regularly
          with interactive exercises{'\n'}• Use the calculator for verification
          {'\n'}• Take breaks between learning sessions
          {'\n'}• Review previous topics regularly
        </AppText>
      </Card.Content>
    </Card>
  );
}

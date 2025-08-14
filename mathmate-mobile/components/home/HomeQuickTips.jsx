import { Card, useTheme } from 'react-native-paper';

import homeStyles from '../../style/home.style';
import AppText from '../ui/AppText';
export function HomeQuickTips({}) {
  const theme = useTheme();
  const styles = homeStyles();
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
          💡 Quick Tips
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
          • Use the camera mode for handwritten problems{'\n'}• Type mode is
          perfect for complex equations{'\n'}• Check the calculator for quick
          calculations{'\n'}• Practice with interactive learning modules
        </AppText>
      </Card.Content>
    </Card>
  );
}

import { Image, View } from 'react-native';
import { Card, useTheme } from 'react-native-paper';

import homeStyles from '../../style/home.style';
import AppText from '../ui/AppText';
export function HomeHeroSection() {
  const theme = useTheme();
  const styles = homeStyles();
  return (
    <Card
      style={[
        styles.heroCard,
        {
          backgroundColor: theme.colors.primaryContainer,
        },
      ]}
      elevation={4}
    >
      <Card.Content style={styles.heroContent}>
        <View style={styles.heroText}>
          <AppText
            variant='displaySmall'
            style={[
              styles.heroTitle,
              {
                color: theme.colors.onPrimaryContainer,
              },
            ]}
          >
            Welcome to MathMate! 🧮
          </AppText>
          <AppText
            variant='bodyLarge'
            style={[
              styles.heroSubtitle,
              {
                color: theme.colors.onPrimaryContainer,
              },
            ]}
          >
            Your all-in-one math companion. Solve problems, learn concepts, and
            master mathematics with AI assistance.
          </AppText>
        </View>
        <Image
          source={require('../../assets/images/math_image.png')}
          style={styles.heroImage}
          resizeMode='contain'
        />
      </Card.Content>
    </Card>
  );
}

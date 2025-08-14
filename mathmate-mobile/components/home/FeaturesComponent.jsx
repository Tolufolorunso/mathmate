import { View } from 'react-native';
import { Card, Icon, IconButton, useTheme } from 'react-native-paper';

import { useRouter } from 'expo-router';
import homeStyles from '../../style/home.style';
import AppText from '../ui/AppText';

export function FeaturesComponent({ feature }) {
  const theme = useTheme();
  const styles = homeStyles();
  const router = useRouter();
  return (
    <Card
      key={feature.id}
      style={[
        styles.featureCard,
        {
          backgroundColor: theme.colors.surface,
        },
      ]}
      elevation={2}
      onPress={() => router.push(feature.route)}
    >
      <Card.Content style={styles.featureContent}>
        <View style={styles.featureHeader}>
          <View
            style={[
              styles.featureIcon,
              {
                backgroundColor: feature.color + '20',
              },
            ]}
          >
            <Icon source={feature.icon} color={feature.color} size={38} />
          </View>
          <View style={styles.featureInfo}>
            <AppText
              titleLarge
              style={[
                styles.featureTitle,
                {
                  color: theme.colors.onSurface,
                },
              ]}
            >
              {feature.title}
            </AppText>
            <AppText
              bodyMedium
              style={[
                styles.featureSubtitle,
                {
                  color: theme.colors.onSurfaceVariant,
                },
              ]}
            >
              {feature.subtitle}
            </AppText>
          </View>
          <IconButton
            icon='chevron-right'
            size={24}
            iconColor={theme.colors.onSurfaceVariant}
          />
        </View>
        <AppText
          bodySmall
          style={{
            color: theme.colors.onSurfaceVariant,
          }}
        >
          {feature.description}
        </AppText>
      </Card.Content>
    </Card>
  );
}

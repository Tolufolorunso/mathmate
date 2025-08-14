import { Card, Chip, Icon, useTheme } from 'react-native-paper';

import { View } from 'react-native';
import learnStyles from '../../style/learn.style';
import AppText from '../ui/AppText';
export function LearnLevelSelection({
  selectedLevel,
  selectLevel,
  learningLevels,
}) {
  const theme = useTheme();
  // console.log(12, theme.colors);
  const styles = learnStyles();
  return (
    <View style={styles.levelSection}>
      <AppText
        headlineMedium
        style={[
          styles.sectionTitle,
          {
            color: theme.colors.onSurface,
          },
        ]}
      >
        Select Your Level
      </AppText>

      <View style={styles.levelGrid}>
        {Object.entries(learningLevels).map(([key, level]) => (
          <Card
            key={key}
            style={[
              styles.levelCard,
              {
                backgroundColor:
                  selectedLevel === key
                    ? level.color + '20'
                    : theme.colors.surface,
                borderColor:
                  selectedLevel === key ? level.color : 'transparent',
                borderWidth: selectedLevel === key ? 2 : 0,
              },
            ]}
            onPress={() => selectLevel(key)}
            elevation={selectedLevel === key ? 4 : 2}
          >
            <Card.Content style={styles.levelCardContent}>
              <View
                style={[
                  styles.levelIcon,
                  {
                    backgroundColor: level.color + '30',
                  },
                ]}
              >
                <Icon source={level.icon} color={level.color} size={32} />
              </View>
              <AppText
                titleLarge
                style={[
                  styles.levelTitle,
                  {
                    color: theme.colors.onSurface,
                  },
                ]}
              >
                {level.title}
              </AppText>
              <AppText
                bodySmall
                style={[
                  styles.levelAge,
                  {
                    color: theme.colors.onSurfaceVariant,
                  },
                ]}
              >
                {level.ageRange}
              </AppText>
              <Chip
                mode='outlined'
                style={[
                  styles.topicChip,
                  {
                    borderColor: level.color,
                  },
                ]}
              >
                {level.topics} Topics
              </Chip>
              <AppText
                bodySmall
                style={[
                  styles.levelDescription,
                  {
                    color: theme.colors.onSurfaceVariant,
                  },
                ]}
              >
                {level.description}
              </AppText>
            </Card.Content>
          </Card>
        ))}
      </View>
    </View>
  );
}

import { useState } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import {
  Button,
  Card,
  Chip,
  ProgressBar,
  Text,
  useTheme,
} from 'react-native-paper';
import profileStyle from '../../style/profile.style';

const { width } = Dimensions.get('window');

export default function Stats() {
  const theme = useTheme();
  const styles = profileStyle();

  // Mock data - in real app, this would come from user's actual progress
  const [stats, setStats] = useState({
    solvedQuestions: 47,
    challengesCompleted: 23,
    badgesEarned: 8,
    learningStreak: 12,
    accuracy: 0.87,
    topicsCompleted: 15,
    totalTopics: 30,
    currentLevel: 'Elementary',
    nextBadge: 'Math Master',
    nextBadgeProgress: 0.7,
  });

  const [selectedStat, setSelectedStat] = useState('overview');

  const statCategories = [
    { id: 'overview', title: 'Overview', icon: 'chart-line' },
    { id: 'progress', title: 'Progress', icon: 'trending-up' },
    { id: 'achievements', title: 'Achievements', icon: 'trophy' },
  ];

  const renderOverview = () => (
    <ScrollView
      style={{ marginBottom: 10 }}
      showsHorizontalScrollIndicator={false}
      horizontal
      contentContainerStyle={styles.statsContainer}
    >
      <Stat
        label='Solved Questions'
        info={stats.solvedQuestions.toString()}
        icon='calculator'
        color={theme.colors.primary}
        progress={stats.solvedQuestions / 100}
      />
      <Stat
        label='Challenges Completed'
        info={stats.challengesCompleted.toString()}
        icon='sword-cross'
        color={theme.colors.secondary}
        progress={stats.challengesCompleted / 50}
      />
      <Stat
        label='Badges Earned'
        info={stats.badgesEarned.toString()}
        icon='medal'
        color={theme.colors.success}
        progress={stats.badgesEarned / 15}
      />
      <Stat
        label='Learning Streak'
        info={`${stats.learningStreak} days`}
        icon='fire'
        color={theme.colors.error}
        progress={stats.learningStreak / 30}
      />
    </ScrollView>
  );

  const renderProgress = () => (
    <View style={styles.progressContainer}>
      <Card
        style={[styles.progressCard, { backgroundColor: theme.colors.surface }]}
        elevation={2}
      >
        <Card.Content>
          <Text
            variant='titleMedium'
            style={[styles.progressTitle, { color: theme.colors.onSurface }]}
          >
            Topic Progress
          </Text>
          <View style={styles.progressInfo}>
            <Text
              variant='headlineSmall'
              style={{ color: theme.colors.primary }}
            >
              {stats.topicsCompleted}/{stats.totalTopics}
            </Text>
            <Text
              variant='bodyMedium'
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              Topics Completed
            </Text>
          </View>
          <ProgressBar
            progress={stats.topicsCompleted / stats.totalTopics}
            color={theme.colors.primary}
            style={styles.progressBar}
          />
          <Text
            variant='bodySmall'
            style={{
              color: theme.colors.onSurfaceVariant,
              textAlign: 'center',
              marginTop: 8,
            }}
          >
            {Math.round((stats.topicsCompleted / stats.totalTopics) * 100)}%
            Complete
          </Text>
        </Card.Content>
      </Card>

      <Card
        style={[styles.progressCard, { backgroundColor: theme.colors.surface }]}
        elevation={2}
      >
        <Card.Content>
          <Text
            variant='titleMedium'
            style={[styles.progressTitle, { color: theme.colors.onSurface }]}
          >
            Accuracy Rate
          </Text>
          <View style={styles.progressInfo}>
            <Text
              variant='headlineSmall'
              style={{ color: theme.colors.success }}
            >
              {Math.round(stats.accuracy * 100)}%
            </Text>
            <Text
              variant='bodyMedium'
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              Overall Accuracy
            </Text>
          </View>
          <ProgressBar
            progress={stats.accuracy}
            color={theme.colors.success}
            style={styles.progressBar}
          />
          <Text
            variant='bodySmall'
            style={{
              color: theme.colors.onSurfaceVariant,
              textAlign: 'center',
              marginTop: 8,
            }}
          >
            {stats.solvedQuestions} questions attempted
          </Text>
        </Card.Content>
      </Card>

      <Card
        style={[styles.progressCard, { backgroundColor: theme.colors.surface }]}
        elevation={2}
      >
        <Card.Content>
          <Text
            variant='titleMedium'
            style={[styles.progressTitle, { color: theme.colors.onSurface }]}
          >
            Current Level
          </Text>
          <View style={styles.progressInfo}>
            <Text
              variant='headlineSmall'
              style={{ color: theme.colors.primary }}
            >
              {stats.currentLevel}
            </Text>
            <Text
              variant='bodyMedium'
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              Learning Level
            </Text>
          </View>
          <Chip
            mode='outlined'
            style={[styles.levelChip, { borderColor: theme.colors.primary }]}
            textStyle={{ color: theme.colors.primary }}
          >
            Level {Math.floor(stats.topicsCompleted / 5) + 1}
          </Chip>
        </Card.Content>
      </Card>
    </View>
  );

  const renderAchievements = () => (
    <View style={styles.achievementsContainer}>
      <Card
        style={[
          styles.achievementsCard,
          { backgroundColor: theme.colors.surface },
        ]}
        elevation={2}
      >
        <Card.Content>
          <Text
            variant='titleMedium'
            style={[
              styles.achievementsTitle,
              { color: theme.colors.onSurface },
            ]}
          >
            Next Badge: {stats.nextBadge}
          </Text>
          <View style={styles.badgeProgress}>
            <ProgressBar
              progress={stats.nextBadgeProgress}
              color={theme.colors.warning}
              style={styles.progressBar}
            />
            <Text
              variant='bodySmall'
              style={{
                color: theme.colors.onSurfaceVariant,
                textAlign: 'center',
                marginTop: 8,
              }}
            >
              {Math.round(stats.nextBadgeProgress * 100)}% to unlock
            </Text>
          </View>
        </Card.Content>
      </Card>

      <View style={styles.badgesGrid}>
        {['🏆', '🥇', '🥈', '🥉', '⭐', '🔥', '💎', '🌟'].map(
          (badge, index) => (
            <View
              key={index}
              style={[
                styles.badgeItem,
                {
                  backgroundColor:
                    index < stats.badgesEarned
                      ? theme.colors.primaryContainer
                      : theme.colors.surfaceVariant,
                },
              ]}
            >
              <Text style={styles.badgeEmoji}>{badge}</Text>
              <Text
                variant='bodySmall'
                style={[
                  styles.badgeLabel,
                  {
                    color:
                      index < stats.badgesEarned
                        ? theme.colors.onPrimaryContainer
                        : theme.colors.onSurfaceVariant,
                  },
                ]}
              >
                Badge {index + 1}
              </Text>
            </View>
          )
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.statsWrapper}>
      {/* Category Tabs */}
      <View style={styles.categoryTabs}>
        {statCategories.map((category) => (
          <Button
            key={category.id}
            mode={selectedStat === category.id ? 'contained' : 'text'}
            onPress={() => setSelectedStat(category.id)}
            icon={category.icon}
            compact
            style={[
              styles.categoryTab,
              selectedStat === category.id && {
                backgroundColor: theme.colors.primary,
              },
            ]}
            labelStyle={[
              styles.categoryLabel,
              {
                color:
                  selectedStat === category.id
                    ? '#fff'
                    : theme.colors.onSurface,
              },
            ]}
          >
            {category.title}
          </Button>
        ))}
      </View>

      {/* Stats Content */}
      <ScrollView
        style={styles.statsContent}
        showsVerticalScrollIndicator={false}
      >
        {selectedStat === 'overview' && renderOverview()}
        {selectedStat === 'progress' && renderProgress()}
        {selectedStat === 'achievements' && renderAchievements()}
      </ScrollView>
    </View>
  );
}

const Stat = ({ label, info, icon, color, progress }) => {
  const styles = profileStyle();
  return (
    <Card
      style={[styles.statCard, { backgroundColor: color + '10' }]}
      elevation={2}
    >
      <Card.Content style={styles.statCardContent}>
        <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
          <Text style={{ fontSize: 24, color: color }}>{icon}</Text>
        </View>
        <View style={styles.statInfo}>
          <Text
            variant='headlineSmall'
            style={[styles.statNumber, { color: color }]}
          >
            {info}
          </Text>
          <Text variant='bodySmall' style={styles.statLabel}>
            {label}
          </Text>
          {progress !== undefined && (
            <ProgressBar
              progress={progress}
              color={color}
              style={styles.statProgressBar}
            />
          )}
        </View>
      </Card.Content>
    </Card>
  );
};

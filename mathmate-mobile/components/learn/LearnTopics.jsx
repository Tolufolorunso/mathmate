import { Button, Card, Chip, ProgressBar, useTheme } from 'react-native-paper';

import { View } from 'react-native';
import learnStyles from '../../style/learn.style';
import AppText from '../ui/AppText';
export function LearnTopics({
  showCompletedTopics,
  setShowCompletedTopics,
  getCompletionStatus,
  openTopic,
  getDifficultyColor,
  formatLastAccessed,
  totalPages,
  prevPage,
  currentPage,
  goToPage,
  nextPage,
  startIndex,
  endIndex,
  currentLevel,
  filteredTopics,
  currentTopics,
}) {
  const styles = learnStyles();
  const theme = useTheme();
  return (
    <View style={styles.topicsSection}>
      <View style={styles.topicsHeader}>
        <AppText
          headlineMedium
          style={[
            styles.sectionTitle,
            {
              color: theme.colors.onSurface,
            },
          ]}
        >
          {currentLevel.title} Topics
        </AppText>
        <View style={styles.topicsHeaderRight}>
          <Chip mode='outlined' icon='book-open'>
            {filteredTopics.length} Available Topics
          </Chip>
          <Button
            mode={showCompletedTopics ? 'contained' : 'outlined'}
            onPress={() => setShowCompletedTopics(!showCompletedTopics)}
            icon={showCompletedTopics ? 'eye-off' : 'eye'}
            compact
            style={styles.filterButton}
          >
            {showCompletedTopics ? 'Hide Completed' : 'Show All'}
          </Button>
        </View>
      </View>

      {/* Topics Grid */}
      <View style={styles.topicsGrid}>
        {currentTopics.map((topic, index) => {
          const completionStatus = getCompletionStatus(topic);
          return (
            <Card
              key={topic.id || index}
              style={[
                styles.topicCard,
                {
                  backgroundColor: theme.colors.surface,
                },
                topic.completed && {
                  backgroundColor: theme.colors.successContainer + '20',
                },
              ]}
              elevation={2}
              onPress={() => openTopic(topic)}
            >
              <Card.Content style={styles.topicCardContent}>
                {/* Completion Status Badge */}
                <View style={styles.completionBadge}>
                  <Chip
                    mode='outlined'
                    style={[
                      styles.statusChip,
                      {
                        borderColor: completionStatus.color,
                      },
                    ]}
                    textStyle={{
                      color: completionStatus.color,
                    }}
                    icon={completionStatus.icon}
                    compact
                  >
                    {completionStatus.text}
                  </Chip>
                </View>

                {/* Topic Title */}
                <AppText
                  titleMedium
                  style={[
                    styles.topicTitle,
                    {
                      color: theme.colors.onSurface,
                    },
                  ]}
                  numberOfLines={2}
                >
                  {topic.title}
                </AppText>

                {/* Topic Meta */}
                <View style={styles.topicMeta}>
                  <Chip
                    mode='outlined'
                    style={[
                      styles.difficultyChip,
                      {
                        borderColor: getDifficultyColor(topic.difficulty),
                      },
                    ]}
                    textStyle={{
                      color: getDifficultyColor(topic.difficulty),
                    }}
                    compact
                  >
                    {topic.difficulty}
                  </Chip>
                  <AppText
                    bodySmall
                    style={[
                      styles.topicTime,
                      {
                        color: theme.colors.onSurfaceVariant,
                      },
                    ]}
                  >
                    ⏱️ {topic.time || topic.estimatedTime}
                  </AppText>
                </View>

                {/* Progress Section */}
                <View style={styles.progressSection}>
                  <View style={styles.progressInfo}>
                    <AppText
                      bodySmall
                      style={{
                        color: theme.colors.onSurfaceVariant,
                      }}
                    >
                      Progress
                    </AppText>
                    <AppText
                      bodySmall
                      style={{
                        color: theme.colors.onSurface,
                      }}
                    >
                      {Math.round((topic.progress || 0) * 100)}%
                    </AppText>
                  </View>
                  <ProgressBar
                    progress={topic.progress || 0}
                    color={completionStatus.color}
                    style={styles.progressBar}
                  />
                </View>

                {/* Additional Info */}
                {topic.lastAccessed && (
                  <View style={styles.additionalInfo}>
                    <AppText
                      bodySmall
                      style={{
                        color: theme.colors.onSurfaceVariant,
                      }}
                    >
                      Last: {formatLastAccessed(topic.lastAccessed)}
                    </AppText>
                    {topic.timeSpent > 0 && (
                      <AppText
                        bodySmall
                        style={{
                          color: theme.colors.onSurfaceVariant,
                        }}
                      >
                        Time: {topic.timeSpent} min
                      </AppText>
                    )}
                  </View>
                )}
              </Card.Content>
            </Card>
          );
        })}
      </View>

      {/* Pagination */}
      {totalPages > 1 && (
        <View style={styles.pagination}>
          <Button
            mode='outlined'
            onPress={prevPage}
            disabled={currentPage === 1}
            icon='chevron-left'
            compact
          >
            Previous
          </Button>

          <View style={styles.pageNumbers}>
            {Array.from(
              {
                length: totalPages,
              },
              (_, i) => i + 1
            ).map((page) => (
              <Button
                key={page}
                mode={currentPage === page ? 'contained' : 'text'}
                onPress={() => goToPage(page)}
                compact
                style={styles.pageButton}
              >
                {page}
              </Button>
            ))}
          </View>

          <Button
            mode='outlined'
            onPress={nextPage}
            disabled={currentPage === totalPages}
            icon='chevron-right'
            compact
          >
            Next
          </Button>
        </View>
      )}

      {/* Page Info */}
      <View style={styles.pageInfo}>
        <AppText
          bodySmall
          style={{
            color: theme.colors.onSurfaceVariant,
          }}
        >
          Showing {startIndex + 1}-{Math.min(endIndex, filteredTopics.length)}{' '}
          of {filteredTopics.length} topics
        </AppText>
      </View>
    </View>
  );
}

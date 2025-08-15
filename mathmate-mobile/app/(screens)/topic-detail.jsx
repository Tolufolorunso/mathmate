import {
  useGlobalSearchParams,
  useLocalSearchParams,
  useRouter,
} from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import {
  Button,
  Card,
  Chip,
  Divider,
  IconButton,
  ProgressBar,
  Text,
  useTheme,
} from 'react-native-paper';
import ScreenWrapper from '../../components/ScreenWrapper';
import { AppBar, AppText } from '../../components/ui';

import { horizontalScale, verticalScale } from '../../style/scaling';

const { width } = Dimensions.get('window');

export default function TopicDetailScreen({ route }) {
  const theme = useTheme();
  const router = useRouter();
  // const { topic, level } = route?.params || {};
  const glob = useGlobalSearchParams();
  const local = useLocalSearchParams();

  // console.log('Local:', local, 'Global:', glob);

  const [currentSection, setCurrentSection] = useState('lesson'); // lesson, practice, quiz
  const [lessonProgress, setLessonProgress] = useState(0);
  const [practiceScore, setPracticeScore] = useState(0);
  const [quizScore, setQuizScore] = useState(0);

  if (!true) {
    return (
      <>
        <AppBar backButton title='Topic not found' />
        <ScreenWrapper
          style={[
            styles.container,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <AppText headlineMedium>Topic not found</AppText>
        </ScreenWrapper>
      </>
    );
  }

  const topics = require('../../data/elementaryTopics.json');

  const topic = topics.topics[0];

  console.log(topic);

  const sections = [
    {
      id: 'lesson',
      title: 'Lesson',
      icon: 'book-open',
      color: theme.colors.primary,
    },
    {
      id: 'practice',
      title: 'Practice',
      icon: 'pencil',
      color: theme.colors.secondary,
    },
    {
      id: 'quiz',
      title: 'Quiz',
      icon: 'clipboard-check',
      color: theme.colors.success,
    },
  ];

  const renderLessonSection = () => (
    <View style={styles.section}>
      <Card
        style={[styles.lessonCard, { backgroundColor: theme.colors.surface }]}
        elevation={2}
      >
        <Card.Content>
          <Text
            variant='headlineSmall'
            style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
          >
            {topic?.title}
          </Text>

          <View style={styles.topicMeta}>
            <Chip mode='outlined' style={{ marginRight: 8 }}>
              {topic.difficulty}
            </Chip>
            <Chip mode='outlined' style={{ marginRight: 8 }}>
              {topic.estimatedTime}
            </Chip>
            <Chip mode='outlined'>{topic.id}</Chip>
          </View>

          <Text
            variant='bodyLarge'
            style={[styles.coreIdea, { color: theme.colors.onSurfaceVariant }]}
          >
            <Text style={{ fontWeight: 'bold' }}>Core Idea:</Text>{' '}
            {topic.coreIdea}
          </Text>

          <Divider style={styles.divider} />

          <Text
            variant='titleMedium'
            style={[styles.subsectionTitle, { color: theme.colors.onSurface }]}
          >
            Introduction
          </Text>
          <Text
            variant='bodyMedium'
            style={[styles.contentText, { color: theme.colors.onSurface }]}
          >
            {topic.content.introduction}
          </Text>

          <Text
            variant='titleMedium'
            style={[styles.subsectionTitle, { color: theme.colors.onSurface }]}
          >
            Key Concepts
          </Text>
          {topic.content.keyConcepts.map((concept, index) => (
            <View key={index} style={styles.conceptItem}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text
                variant='bodyMedium'
                style={[styles.contentText, { color: theme.colors.onSurface }]}
              >
                {concept}
              </Text>
            </View>
          ))}

          <Text
            variant='titleMedium'
            style={[styles.subsectionTitle, { color: theme.colors.onSurface }]}
          >
            Examples
          </Text>
          {topic.content.examples.map((example, index) => (
            <View key={index} style={styles.conceptItem}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text
                variant='bodyMedium'
                style={[styles.contentText, { color: theme.colors.onSurface }]}
              >
                {example}
              </Text>
            </View>
          ))}

          <Text
            variant='titleMedium'
            style={[styles.subsectionTitle, { color: theme.colors.onSurface }]}
          >
            Learning Objectives
          </Text>
          {topic.learningObjectives.map((objective, index) => (
            <View key={index} style={styles.conceptItem}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text
                variant='bodyMedium'
                style={[styles.contentText, { color: theme.colors.onSurface }]}
              >
                {objective}
              </Text>
            </View>
          ))}

          {/* GIF Placeholder */}
          <Card
            style={[
              styles.gifCard,
              { backgroundColor: theme.colors.surfaceVariant },
            ]}
            elevation={1}
          >
            <Card.Content style={styles.gifContent}>
              <Text
                variant='titleMedium'
                style={{ textAlign: 'center', marginBottom: 8 }}
              >
                🎬 Interactive Animation
              </Text>
              <Text
                variant='bodySmall'
                style={{ textAlign: 'center', opacity: 0.7 }}
              >
                {topic.gifScene}
              </Text>
              <Text
                variant='bodySmall'
                style={{ textAlign: 'center', opacity: 0.7 }}
              >
                Duration: {topic.gifDuration}s | Size: {topic.gifSize}
              </Text>
            </Card.Content>
          </Card>

          <View style={styles.lessonProgress}>
            <Text
              variant='bodySmall'
              style={{ color: theme.colors.onSurfaceVariant, marginBottom: 8 }}
            >
              Lesson Progress
            </Text>
            <ProgressBar
              progress={lessonProgress}
              color={theme.colors.primary}
              style={styles.progressBar}
            />
            <Text
              variant='bodySmall'
              style={{
                color: theme.colors.onSurface,
                marginTop: 8,
                textAlign: 'center',
              }}
            >
              {Math.round(lessonProgress * 100)}% Complete
            </Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );

  const renderPracticeSection = () => (
    <View style={styles.section}>
      <Card
        style={[styles.practiceCard, { backgroundColor: theme.colors.surface }]}
        elevation={2}
      >
        <Card.Content>
          <Text
            variant='headlineSmall'
            style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
          >
            Practice Problems
          </Text>

          <Text
            variant='bodyMedium'
            style={[
              styles.contentText,
              { color: theme.colors.onSurfaceVariant },
            ]}
          >
            Practice what you've learned with interactive problems. Each correct
            answer helps you master the concept!
          </Text>

          <View style={styles.practiceStats}>
            <View style={styles.statItem}>
              <Text
                variant='headlineSmall'
                style={{ color: theme.colors.primary }}
              >
                {practiceScore}
              </Text>
              <Text
                variant='bodySmall'
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                Points Earned
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text
                variant='headlineSmall'
                style={{ color: theme.colors.secondary }}
              >
                5
              </Text>
              <Text
                variant='bodySmall'
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                Problems Available
              </Text>
            </View>
          </View>

          <Button
            mode='contained'
            onPress={() => {
              /* Start practice */
            }}
            icon='play'
            style={styles.startButton}
            contentStyle={styles.buttonContent}
          >
            Start Practice
          </Button>

          <Text
            variant='bodySmall'
            style={[styles.hintText, { color: theme.colors.onSurfaceVariant }]}
          >
            💡 Tip: Take your time and think through each problem step by step.
          </Text>
        </Card.Content>
      </Card>
    </View>
  );

  const renderQuizSection = () => (
    <View style={styles.section}>
      <Card
        style={[styles.quizCard, { backgroundColor: theme.colors.surface }]}
        elevation={2}
      >
        <Card.Content>
          <Text
            variant='headlineSmall'
            style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
          >
            Knowledge Quiz
          </Text>

          <Text
            variant='bodyMedium'
            style={[
              styles.contentText,
              { color: theme.colors.onSurfaceVariant },
            ]}
          >
            Test your understanding with a quiz. This helps reinforce what
            you've learned and identifies areas for improvement.
          </Text>

          <View style={styles.quizInfo}>
            <View style={styles.quizItem}>
              <IconButton
                icon='clock'
                size={20}
                iconColor={theme.colors.onSurfaceVariant}
              />
              <Text
                variant='bodySmall'
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                10 minutes
              </Text>
            </View>
            <View style={styles.quizItem}>
              <IconButton
                icon='help-circle'
                size={20}
                iconColor={theme.colors.onSurfaceVariant}
              />
              <Text
                variant='bodySmall'
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                8 questions
              </Text>
            </View>
            <View style={styles.quizItem}>
              <IconButton
                icon='target'
                size={20}
                iconColor={theme.colors.onSurfaceVariant}
              />
              <Text
                variant='bodySmall'
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                80% to pass
              </Text>
            </View>
          </View>

          <View style={styles.quizScore}>
            <Text
              variant='titleLarge'
              style={{ color: theme.colors.success, textAlign: 'center' }}
            >
              {quizScore}%
            </Text>
            <Text
              variant='bodyMedium'
              style={{ color: theme.colors.onSurface, textAlign: 'center' }}
            >
              Best Score
            </Text>
          </View>

          <Button
            mode='contained'
            onPress={() => {
              /* Start quiz */
            }}
            icon='clipboard-check'
            style={styles.startButton}
            contentStyle={styles.buttonContent}
          >
            Take Quiz
          </Button>

          <Text
            variant='bodySmall'
            style={[styles.hintText, { color: theme.colors.onSurfaceVariant }]}
          >
            🎯 Goal: Score 80% or higher to demonstrate mastery of this topic.
          </Text>
        </Card.Content>
      </Card>
    </View>
  );

  return (
    <>
      <StatusBar />
      <AppBar backButton title={topic.title} />
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        {/* Navigation Tabs */}
        <View style={[styles.tabs, { backgroundColor: theme.colors.surface }]}>
          {sections.map((section) => (
            <Button
              key={section.id}
              mode={currentSection === section.id ? 'contained' : 'text'}
              onPress={() => setCurrentSection(section.id)}
              icon={section.icon}
              style={[
                styles.tabButton,
                currentSection === section.id && {
                  backgroundColor: section.color,
                },
              ]}
              labelStyle={[
                styles.tabLabel,
                {
                  color:
                    currentSection === section.id
                      ? '#fff'
                      : theme.colors.onSurface,
                },
              ]}
              compact
            >
              {section.title}
            </Button>
          ))}
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {currentSection === 'lesson' && renderLessonSection()}
          {currentSection === 'practice' && renderPracticeSection()}
          {currentSection === 'quiz' && renderQuizSection()}
        </ScrollView>

        {/* Bottom Actions */}
        <View
          style={[
            styles.bottomActions,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <Button
            mode='outlined'
            onPress={() => router.back()}
            style={styles.bottomButton}
          >
            Back to Topics
          </Button>
          <Button
            mode='contained'
            onPress={() => {
              if (currentSection === 'lesson') setCurrentSection('practice');
              else if (currentSection === 'practice') setCurrentSection('quiz');
              else router.back();
            }}
            style={styles.bottomButton}
          >
            {currentSection === 'lesson'
              ? 'Start Practice'
              : currentSection === 'practice'
              ? 'Take Quiz'
              : 'Complete Topic'}
          </Button>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 2,
  },
  headerTitle: {
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  tabs: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: verticalScale(16),
    elevation: 1,
  },
  tabButton: {
    flex: 1,
    marginHorizontal: horizontalScale(4),
    borderRadius: 8,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingVertical: 16,
    // paddingHorizontal: horizontalScale(16),
  },
  section: {
    marginBottom: 16,
  },
  lessonCard: {
    borderRadius: 0,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 16,
  },
  topicMeta: {
    flexDirection: 'row',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  coreIdea: {
    marginBottom: 16,
    lineHeight: 22,
  },
  divider: {
    marginVertical: 16,
  },
  subsectionTitle: {
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 16,
  },
  contentText: {
    lineHeight: 22,
    marginBottom: 8,
  },
  conceptItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 18,
    marginRight: 8,
    marginTop: 2,
    color: '#666',
  },
  gifCard: {
    marginTop: 20,
    marginBottom: 20,
  },
  gifContent: {
    padding: 20,
    alignItems: 'center',
  },
  lessonProgress: {
    marginTop: 20,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  practiceCard: {
    borderRadius: 16,
  },
  practiceStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  startButton: {
    marginTop: 16,
    borderRadius: 12,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  hintText: {
    textAlign: 'center',
    marginTop: 16,
    fontStyle: 'italic',
  },
  quizCard: {
    borderRadius: 16,
  },
  quizInfo: {
    marginVertical: 20,
  },
  quizItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  quizScore: {
    alignItems: 'center',
    marginVertical: 20,
  },
  bottomActions: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    elevation: 4,
    marginBottom: 30,
  },
  bottomButton: {
    flex: 1,
    borderRadius: 12,
  },
});

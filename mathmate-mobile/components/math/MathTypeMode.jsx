import { useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import {
  Button,
  Card,
  Chip,
  Modal,
  Portal,
  useTheme,
} from 'react-native-paper';
import { useMathStore } from '../../store/mathStore';
import AppText from '../ui/AppText';
import EnhancedKeyboard from '../ui/EnhancedKeyboard';

export default function MathTypeMode() {
  const theme = useTheme();
  const { uploadTypedQuestion } = useMathStore();
  const [question, setQuestion] = useState('');
  const [questionType, setQuestionType] = useState('algebra'); // algebra, calculus, statistics, geometry
  const [showQuestionTypes, setShowQuestionTypes] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollViewRef = useRef(null);

  // Auto-scroll to bottom when question changes
  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [question]);

  const questionTypes = {
    algebra: {
      label: 'Algebra',
      icon: 'math-integral',
      examples: [
        '3x² - 7x + 2 = 0',
        'Solve for x: 2x + 5 = 13',
        'Factor: x² - 9',
        'Simplify: (x + 2)(x - 3)',
      ],
    },
    calculus: {
      label: 'Calculus',
      icon: 'integral',
      examples: [
        '∫(x³ - 2x + 1)dx from 0 to 1',
        'd/dx(x² + 3x)',
        'lim(x²) as x approaches 2',
        'Find the derivative of sin(x)',
      ],
    },
    statistics: {
      label: 'Statistics',
      icon: 'chart-line',
      examples: [
        'Mean of [1, 2, 3, 4, 5]',
        'Probability of drawing 2 aces',
        'Standard deviation of [10, 20, 30]',
        'Find the median of [5, 2, 8, 1, 9]',
      ],
    },
    geometry: {
      label: 'Geometry',
      icon: 'shape',
      examples: [
        'Area of triangle with sides 5, 12, 13',
        'Volume of a sphere with radius 3',
        'Perimeter of a rectangle 4×6',
        'Find the angle in a right triangle',
      ],
    },
  };

  const handleKeyPress = (key) => {
    switch (key) {
      case '⌫':
        setQuestion((prev) => prev.slice(0, -1));
        break;
      case 'C':
        setQuestion('');
        break;
      case 'AC':
        setQuestion('');
        break;
      case 'MODE':
        setShowQuestionTypes(true);
        break;
      case 'HIST':
        // Could show typing history
        break;
      case 'deg':
      case 'rad':
        // Handle angle units
        break;
      default:
        setQuestion((prev) => prev + key);
    }
  };

  const selectQuestionType = (type) => {
    setQuestionType(type);
    setShowQuestionTypes(false);
  };

  const insertExample = (example) => {
    setQuestion(example);
    setShowExamples(false);
  };

  const submitQuestion = async () => {
    if (!question.trim()) {
      Alert.alert('Error', 'Please enter a math question first.');
      return;
    }

    setIsSubmitting(true);
    try {
      // This will be handled by the math store
      await uploadTypedQuestion(question, questionType);
      Alert.alert(
        'Success',
        'Your question has been submitted for AI analysis!'
      );
      setQuestion('');
    } catch (error) {
      Alert.alert('Error', 'Failed to submit question. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearQuestion = () => {
    Alert.alert(
      'Clear Question',
      'Are you sure you want to clear the current question?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: () => setQuestion('') },
      ]
    );
  };

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <Chip
          mode='outlined'
          onPress={() => setShowQuestionTypes(true)}
          icon={questionTypes[questionType].icon}
          style={[
            styles.typeChip,
            { backgroundColor: theme.colors.surfaceVariant },
          ]}
        >
          {questionTypes[questionType].label}
        </Chip>

        <Button
          mode='text'
          onPress={() => setShowExamples(true)}
          icon='lightbulb'
          compact
        >
          Examples
        </Button>
      </View>

      {/* Question Display */}
      <Card
        style={[styles.questionCard, { backgroundColor: theme.colors.surface }]}
        elevation={2}
      >
        <Card.Content>
          <AppText
            bodyMedium
            style={{ marginBottom: 4, color: theme.colors.onSurface }}
          >
            Your Math Question
          </AppText>
          <ScrollView
            ref={scrollViewRef}
            style={styles.questionScroll}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.questionContent}
          >
            <AppText
              bodyLarge
              style={{
                color: question
                  ? theme.colors.onSurface
                  : theme.colors.onSurfaceVariant,
                fontFamily: 'monospace',
              }}
            >
              {question || 'Type your math question here...'}
            </AppText>
          </ScrollView>
        </Card.Content>
      </Card>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <Button
          mode='outlined'
          onPress={clearQuestion}
          icon='eraser'
          disabled={!question.trim()}
          style={styles.actionButton}
        >
          Clear
        </Button>

        <Button
          mode='contained'
          onPress={submitQuestion}
          icon='send'
          loading={isSubmitting}
          disabled={!question.trim() || isSubmitting}
          style={[styles.actionButton, styles.submitButton]}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Question'}
        </Button>
      </View>

      {/* Enhanced Keyboard */}
      <EnhancedKeyboard
        onPress={handleKeyPress}
        mode={questionType}
        angleUnit='deg'
      />

      {/* Question Type Selector Modal */}
      <Portal>
        <Modal
          visible={showQuestionTypes}
          onDismiss={() => setShowQuestionTypes(false)}
          contentContainerStyle={[
            styles.modal,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <Text
            variant='headlineSmall'
            style={{ marginBottom: 20, textAlign: 'center' }}
          >
            Select Question Type
          </Text>

          <View style={styles.typeGrid}>
            {Object.entries(questionTypes).map(([key, type]) => (
              <Card
                key={key}
                style={[
                  styles.typeCard,
                  {
                    backgroundColor:
                      questionType === key
                        ? theme.colors.primaryContainer
                        : theme.colors.surfaceVariant,
                    borderColor:
                      questionType === key
                        ? theme.colors.primary
                        : 'transparent',
                  },
                ]}
                onPress={() => selectQuestionType(key)}
              >
                <Card.Content style={styles.typeCardContent}>
                  <Text
                    variant='titleMedium'
                    style={{ textAlign: 'center', marginBottom: 8 }}
                  >
                    {type.label}
                  </Text>
                  <Text
                    variant='bodySmall'
                    style={{ textAlign: 'center', opacity: 0.7 }}
                  >
                    {type.examples.length} examples available
                  </Text>
                </Card.Content>
              </Card>
            ))}
          </View>
        </Modal>
      </Portal>

      {/* Examples Modal */}
      <Portal>
        <Modal
          visible={showExamples}
          onDismiss={() => setShowExamples(false)}
          contentContainerStyle={[
            styles.modal,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <Text
            variant='headlineSmall'
            style={{ marginBottom: 20, textAlign: 'center' }}
          >
            {questionTypes[questionType].label} Examples
          </Text>

          <ScrollView style={styles.examplesList}>
            {questionTypes[questionType].examples.map((example, index) => (
              <Card
                key={index}
                style={[
                  styles.exampleCard,
                  { backgroundColor: theme.colors.surfaceVariant },
                ]}
                onPress={() => insertExample(example)}
              >
                <Card.Content>
                  <Text
                    variant='bodyMedium'
                    style={{ fontFamily: 'monospace' }}
                  >
                    {example}
                  </Text>
                </Card.Content>
              </Card>
            ))}
          </ScrollView>

          <Button
            mode='outlined'
            onPress={() => setShowExamples(false)}
            style={{ marginTop: 16 }}
          >
            Close
          </Button>
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  typeChip: {
    marginRight: 8,
  },
  questionCard: {
    flex: 1,
    marginBottom: 16,
  },
  questionScroll: {
    maxHeight: 150,
  },
  questionContent: {
    paddingVertical: 6,
  },

  actions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
  },
  submitButton: {
    // Additional styling for submit button if needed
  },
  modal: {
    padding: 20,
    margin: 20,
    borderRadius: 16,
    maxHeight: '80%',
  },
  typeGrid: {
    gap: 12,
  },
  typeCard: {
    marginBottom: 8,
    borderWidth: 2,
  },
  typeCardContent: {
    padding: 16,
    alignItems: 'center',
  },
  examplesList: {
    maxHeight: 300,
  },
  exampleCard: {
    marginBottom: 8,
  },
});

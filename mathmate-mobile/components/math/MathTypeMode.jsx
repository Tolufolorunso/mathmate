import * as Clipboard from 'expo-clipboard';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useMathStore } from '../../store/mathStore';
import EnhancedKeyboard from '../ui/EnhancedKeyboard';
import { ExamplesModal } from './ExamplesModal';
import { MathTypeModeActionBtns } from './MathTypeModeActionBtns';
import { MathTypeModeHeader } from './MathTypeModeHeader';
import { MathTypeModeQuestionDisplay } from './MathTypeModeQuestionDisplay';
import { SelectQuestionType } from './SelectQuestionType';

export default function MathTypeMode() {
  const theme = useTheme();

  const { uploadTypedQuestion } = useMathStore();
  const [question, setQuestion] = useState('9 + 5 = ?');
  const [questionType, setQuestionType] = useState('algebra'); // algebra, calculus, statistics, geometry, general
  const [showQuestionTypes, setShowQuestionTypes] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollViewRef = useRef(null);

  const router = useRouter();

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
      icon: 'format-superscript',
      examples: [
        '3x² - 7x + 2 = 0',
        'Solve for x: 2x + 5 = 13',
        'Factor: x² - 9',
        'Simplify: (x + 2)(x - 3)',
      ],
    },
    calculus: {
      label: 'Calculus',
      icon: 'math-integral',
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
      const result = await uploadTypedQuestion(question, questionType);
      console.log(result);
      if (result.ok) {
        // setQuestion('');
        router.push('(screens)/solution');
        return;
      }
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

  const pasteQuestion = async () => {
    const text = await Clipboard.getStringAsync();
    console.log(text);
    setQuestion(text);
  };

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      {/* Header */}
      <MathTypeModeHeader
        setShowQuestionTypes={setShowQuestionTypes}
        setShowExamples={setShowExamples}
        questionTypes={questionTypes}
        questionType={questionType}
      />

      {/* Question Display */}
      <MathTypeModeQuestionDisplay
        pasteQuestion={pasteQuestion}
        scrollViewRef={scrollViewRef}
        question={question}
      />

      {/* Action Buttons */}
      <MathTypeModeActionBtns
        clearQuestion={clearQuestion}
        submitQuestion={submitQuestion}
        isSubmitting={isSubmitting}
        question={question}
      />

      {/* Enhanced Keyboard */}
      <EnhancedKeyboard
        onPress={handleKeyPress}
        mode={questionType}
        angleUnit='deg'
      />

      {/* Question Type Selector Modal */}
      <SelectQuestionType
        showQuestionTypes={showQuestionTypes}
        setShowQuestionTypes={setShowQuestionTypes}
        questionTypes={questionTypes}
        questionType={questionType}
        selectQuestionType={selectQuestionType}
      />

      {/* Examples Modal */}
      <ExamplesModal
        showExamples={showExamples}
        setShowExamples={setShowExamples}
        insertExample={insertExample}
        questionTypes={questionTypes}
        questionType={questionType}
      />
    </View>
  );
}

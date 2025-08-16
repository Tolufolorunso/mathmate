import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Chip, Divider, Text, useTheme } from 'react-native-paper';

const MathSolutionDisplay = ({ content = '' }) => {
  const theme = useTheme();

  console.log(content);

  // Safe content parsing with fallbacks
  // Safe content parsing with fallbacks
  const getSections = () => {
    try {
      return {
        question: (
          content.match(
            /(?:The Question:|\[The Question\])\s*([\s\S]*?)(?=(?:Problem Analysis:|\[Problem Analysis\])|$)/i
          )?.[1] || ''
        ).trim(),
        analysis: (
          content.match(
            /(?:Problem Analysis:|\[Problem Analysis\])\s*([\s\S]*?)(?=(?:Solution Steps:|\[Solution Steps\])|$)/i
          )?.[1] || ''
        ).trim(),
        steps: (
          content.match(
            /(?:Solution Steps:|\[Solution Steps\])\s*([\s\S]*?)(?=(?:Final Answer:|\[Final Answer\])|$)/i
          )?.[1] || ''
        ).trim(),
        answer: (
          content.match(
            /(?:Final Answer:|\[Final Answer\])\s*([\s\S]*)/i
          )?.[1] || ''
        ).trim(),
      };
    } catch (error) {
      console.error('Error parsing content:', error);
      return { question: '', analysis: '', steps: '', answer: '' };
    }
  };

  // const getSections = () => {
  //   try {
  //     return {
  //       analysis: (
  //         content.match(
  //           /\[Problem Analysis\]([\s\S]*?)(?=\[Solution Steps\]|$)/i
  //         )?.[1] || ''
  //       ).trim(),
  //       steps: (
  //         content.match(
  //           /\[Solution Steps\]([\s\S]*?)(?=\[Final Answer\]|$)/i
  //         )?.[1] || ''
  //       ).trim(),
  //       answer: (content.match(/\[Final Answer\]([\s\S]*)/i)?.[1] || '').trim(),
  //     };
  //   } catch (error) {
  //     console.error('Error parsing content:', error);
  //     return { analysis: '', steps: '', answer: '' };
  //   }
  // };

  const sections = getSections();
  const styles = solutionStyles(theme);

  console.log(sections);

  console.log(sections.question);

  // Check if we have any content to display
  const hasContent = sections.analysis || sections.steps || sections.answer;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps='handled'
      >
        {hasContent ? (
          <View style={styles.container}>
            {/* Problem Analysis Section */}
            {sections.question ? (
              <>
                <Chip
                  icon='magnify'
                  style={styles.chip}
                  textStyle={{ color: theme.colors.onSecondaryContainer }}
                >
                  Question
                </Chip>
                <Text variant='bodyLarge' style={styles.analysisText}>
                  {sections.question}
                </Text>
                <Divider style={styles.divider} />
              </>
            ) : null}
            {sections.analysis ? (
              <>
                <Chip
                  icon='magnify'
                  style={styles.chip}
                  textStyle={{ color: theme.colors.onSecondaryContainer }}
                >
                  ANALYSIS
                </Chip>
                <Text variant='bodyLarge' style={styles.analysisText}>
                  {sections.analysis}
                </Text>
                <Divider style={styles.divider} />
              </>
            ) : null}

            {/* Solution Steps Section */}
            {sections.steps ? (
              <>
                <Chip
                  icon='progress-check'
                  style={styles.chip}
                  textStyle={{ color: theme.colors.onSecondaryContainer }}
                >
                  SOLUTION STEPS
                </Chip>
                {sections.steps
                  .split('\n')
                  .filter((step) => step.trim())
                  .map((step, index) => (
                    <View key={`step-${index}`} style={styles.stepContainer}>
                      {step.match(/^\d+\./) ? (
                        <>
                          <Text style={styles.stepNumber}>
                            {step.split('.')[0]}.
                          </Text>
                          <Text style={styles.stepText}>
                            {step.replace(/^\d+\.\s*/, '')}
                          </Text>
                        </>
                      ) : (
                        <Text style={styles.mathExpression}>{step.trim()}</Text>
                      )}
                    </View>
                  ))}
                <Divider style={styles.divider} />
              </>
            ) : null}

            {/* Final Answer Section */}
            {sections.answer ? (
              <>
                <Chip
                  icon='check-circle'
                  style={styles.chip}
                  textStyle={{ color: theme.colors.onSecondaryContainer }}
                >
                  FINAL ANSWER
                </Chip>
                <Text style={styles.finalAnswer}>
                  {sections.answer.replace(/\\boxed{(.*?)}/, '$1')}
                </Text>
              </>
            ) : null}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No solution available</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const solutionStyles = (theme) =>
  StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
    },
    container: {
      paddingHorizontal: 16,
      paddingBottom: 24,
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    emptyText: {
      color: theme.colors.onSurfaceDisabled,
      fontSize: 16,
    },
    analysisText: {
      lineHeight: 22,
      marginBottom: 16,
      color: theme.colors.onSurface,
    },
    stepContainer: {
      flexDirection: 'row',
      marginBottom: 12,
      alignItems: 'flex-start',
    },
    stepNumber: {
      fontWeight: 'bold',
      minWidth: 28,
      color: theme.colors.secondary,
    },
    stepText: {
      flex: 1,
      lineHeight: 22,
      color: theme.colors.onSurface,
    },
    mathExpression: {
      fontFamily: 'Courier New',
      backgroundColor: theme.dark
        ? theme.colors.elevation.level2
        : theme.colors.elevation.level1,
      padding: 10,
      borderRadius: 8,
      marginVertical: 6,
      color: theme.colors.onSurface,
    },
    finalAnswer: {
      fontFamily: 'Courier New',
      backgroundColor: theme.colors.primaryContainer,
      padding: 12,
      borderRadius: 8,
      marginTop: 8,
      color: theme.colors.primary,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    divider: {
      marginVertical: 16,
      backgroundColor: theme.colors.outlineVariant,
    },
    chip: {
      alignSelf: 'flex-start',
      marginBottom: 12,
      backgroundColor: theme.colors.secondaryContainer,
    },
  });

export default MathSolutionDisplay;

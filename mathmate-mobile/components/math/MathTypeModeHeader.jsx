import React from 'react';
import { Button, Chip, useTheme } from 'react-native-paper';
import mathTypeModeStyle from '../../style/MathTypeMode.style';
import { View } from 'react-native';
export function MathTypeModeHeader({
  setShowQuestionTypes,
  setShowExamples,
  questionTypes,
  questionType,
}) {
  const theme = useTheme();
  const styles = mathTypeModeStyle();
  return (
    <View style={styles.header}>
      <Chip
        mode='outlined'
        onPress={() => setShowQuestionTypes(true)}
        icon={questionTypes[questionType].icon}
        style={[
          styles.typeChip,
          {
            backgroundColor: theme.colors.surfaceVariant,
          },
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
  );
}

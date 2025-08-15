import { View } from 'react-native';
import { Button } from 'react-native-paper';
import mathTypeModeStyle from '../../style/MathTypeMode.style';
export function MathTypeModeActionBtns({
  clearQuestion,
  submitQuestion,
  isSubmitting,
  question,
}) {
  const styles = mathTypeModeStyle();
  return (
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
  );
}

import { ScrollView } from 'react-native';
import { Button, Card, Modal, Portal, useTheme } from 'react-native-paper';
import mathTypeModeStyle from '../../style/MathTypeMode.style';
import AppText from '../ui/AppText';
export function ExamplesModal(props) {
  const {
    showExamples,
    setShowExamples,
    questionTypes,
    questionType,
    insertExample,
  } = props;

  const theme = useTheme();
  const styles = mathTypeModeStyle();
  return (
    <Portal>
      <Modal
        visible={showExamples}
        onDismiss={() => setShowExamples(false)}
        contentContainerStyle={[
          styles.modal,
          {
            backgroundColor: theme.colors.surface,
          },
        ]}
      >
        <AppText
          headlineSmall
          style={{
            marginBottom: 20,
            textAlign: 'center',
          }}
        >
          {questionTypes[questionType].label} Examples
        </AppText>

        <ScrollView style={styles.examplesList}>
          {questionTypes[questionType].examples.map((example, index) => (
            <Card
              key={index}
              style={[
                styles.exampleCard,
                {
                  backgroundColor: theme.colors.surfaceVariant,
                },
              ]}
              onPress={() => insertExample(example)}
            >
              <Card.Content>
                <AppText
                  bodyMedium
                  style={{
                    fontFamily: 'monospace',
                  }}
                >
                  {example}
                </AppText>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>

        <Button
          mode='outlined'
          onPress={() => setShowExamples(false)}
          style={{
            marginTop: 16,
          }}
        >
          Close
        </Button>
      </Modal>
    </Portal>
  );
}

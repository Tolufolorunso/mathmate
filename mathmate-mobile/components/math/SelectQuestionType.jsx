import { View } from 'react-native';
import { Card, Modal, Portal, useTheme } from 'react-native-paper';
import mathTypeModeStyle from '../../style/MathTypeMode.style';
import AppText from '../ui/AppText';
export function SelectQuestionType(props) {
  const {
    showQuestionTypes,
    setShowQuestionTypes,
    questionTypes,
    questionType,
    selectQuestionType,
  } = props;
  const theme = useTheme();
  const styles = mathTypeModeStyle();
  return (
    <Portal>
      <Modal
        visible={showQuestionTypes}
        onDismiss={() => setShowQuestionTypes(false)}
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
          Select Question Type
        </AppText>

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
                    questionType === key ? theme.colors.primary : 'transparent',
                },
              ]}
              onPress={() => selectQuestionType(key)}
            >
              <Card.Content style={styles.typeCardContent}>
                <AppText
                  titleMedium
                  style={{
                    textAlign: 'center',
                    marginBottom: 8,
                  }}
                >
                  {type.label}
                </AppText>
                <AppText
                  bodySmall
                  style={{
                    textAlign: 'center',
                    opacity: 0.7,
                  }}
                >
                  {type.examples.length} examples available
                </AppText>
              </Card.Content>
            </Card>
          ))}
        </View>
      </Modal>
    </Portal>
  );
}

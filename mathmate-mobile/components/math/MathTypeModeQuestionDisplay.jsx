import { ScrollView, View } from 'react-native';
import { Button, Card, useTheme } from 'react-native-paper';
import mathTypeModeStyle from '../../style/MathTypeMode.style';
import AppText from '../ui/AppText';
export function MathTypeModeQuestionDisplay({
  pasteQuestion,
  scrollViewRef,
  question,
}) {
  const theme = useTheme();
  const styles = mathTypeModeStyle();
  return (
    <Card
      style={[
        styles.questionCard,
        {
          backgroundColor: theme.colors.surface,
        },
      ]}
      elevation={2}
    >
      <Card.Content>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: -15,
          }}
        >
          <AppText
            bodyMedium
            style={{
              marginBottom: 4,
              color: theme.colors.onSurface,
            }}
          >
            Your Math Question
          </AppText>
          <Button
            mode='text'
            onPress={() => pasteQuestion(true)}
            icon='content-paste'
            compact
          >
            Tap to Paste
          </Button>
        </View>

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
  );
}

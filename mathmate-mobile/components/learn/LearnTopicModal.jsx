import { Button, Chip, Modal, Portal, useTheme } from 'react-native-paper';

import { View } from 'react-native';
import learnStyles from '../../style/learn.style';
import AppText from '../ui/AppText';
export function LearnTopicModal({
  showTopicModal,
  closeTopicModal,
  selectedTopic,
  startLearning,
}) {
  const styles = learnStyles();
  const theme = useTheme();

  return (
    <Portal>
      <Modal
        visible={showTopicModal}
        onDismiss={closeTopicModal}
        contentContainerStyle={[
          styles.modal,
          {
            backgroundColor: theme.colors.surface,
          },
        ]}
      >
        {selectedTopic && (
          <>
            <AppText
              headlineSmall
              style={{
                marginBottom: 20,
                textAlign: 'center',
              }}
            >
              {selectedTopic.title}
              {selectedTopic.id}
            </AppText>

            <View style={styles.modalContent}>
              <View style={styles.modalInfo}>
                <Chip
                  mode='outlined'
                  style={{
                    marginBottom: 8,
                  }}
                >
                  Difficulty: {selectedTopic.difficulty}
                </Chip>
                <Chip
                  mode='outlined'
                  style={{
                    marginBottom: 8,
                  }}
                >
                  Duration: {selectedTopic.time || selectedTopic.estimatedTime}
                </Chip>
                <Chip mode='outlined'>
                  Progress: {Math.round((selectedTopic.progress || 0) * 100)}%
                </Chip>
              </View>

              <AppText
                bodyMedium
                style={{
                  marginBottom: 20,
                  textAlign: 'center',
                  opacity: 0.8,
                }}
              >
                Ready to start learning? This topic includes interactive
                lessons, practice problems, and step-by-step solutions.
              </AppText>
            </View>

            <View style={styles.modalActions}>
              <Button
                mode='outlined'
                onPress={closeTopicModal}
                style={{
                  flex: 1,
                  marginRight: 8,
                }}
              >
                Cancel
              </Button>
              <Button
                mode='contained'
                onPress={() => startLearning(selectedTopic.id)}
                style={{
                  flex: 1,
                  marginLeft: 8,
                }}
                icon='play'
              >
                Start Learning
              </Button>
            </View>
          </>
        )}
      </Modal>
    </Portal>
  );
}

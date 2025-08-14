import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Button,
  Card,
  Chip,
  Icon,
  Modal,
  Portal,
  Text,
  useTheme,
} from 'react-native-paper';
import { useMathStore } from '../../store/mathStore';

const { width } = Dimensions.get('window');

export default function MathCameraMode() {
  const cameraRef = useRef(null);
  const [isTorchOn, setTorchOn] = useState(false);
  const [showImageEditor, setShowImageEditor] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [editMode, setEditMode] = useState('crop'); // crop, rotate, adjust
  const [isCameraReady, setIsCameraReady] = useState(false);
  const theme = useTheme();
  const { imageUri, uploading, setImage, uploadImage, reset } = useMathStore();

  const [permission, requestPermission] = useCameraPermissions();

  /* ---------- permission ---------- */
  useEffect(() => {
    if (!permission?.granted) requestPermission();
  }, [permission]);

  /* ---------- camera lifecycle management ---------- */
  useEffect(() => {
    return () => {
      // Cleanup when component unmounts
      if (cameraRef.current) {
        cameraRef.current = null;
      }
    };
  }, []);

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  if (!permission?.granted) {
    return (
      <View
        style={[styles.center, { backgroundColor: theme.colors.background }]}
      >
        <Text
          variant='headlineSmall'
          style={{ marginBottom: 20, textAlign: 'center' }}
        >
          Camera Permission Required
        </Text>
        <Text
          variant='bodyMedium'
          style={{ marginBottom: 20, textAlign: 'center', opacity: 0.7 }}
        >
          We need camera access to capture math problems and solve them for you.
        </Text>
        <Button mode='contained' onPress={requestPermission} icon='camera'>
          Grant Camera Permission
        </Button>
      </View>
    );
  }

  /* ---------- capture photo ---------- */
  const takePhoto = async () => {
    if (!cameraRef.current || !isCameraReady) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
        base64: true,
      });

      if (photo) {
        setEditingImage(photo);
        setShowImageEditor(true);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };

  /* ---------- pick from gallery ---------- */
  const pickPhoto = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
        base64: true,
      });

      if (!result.canceled && result.assets[0]) {
        setEditingImage(result.assets[0]);
        setShowImageEditor(true);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick photo from gallery.');
    }
  };

  /* ---------- image editing functions ---------- */
  const cropImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      if (!result.canceled && result.assets[0]) {
        setEditingImage(result.assets[0]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to crop image.');
    }
  };

  const rotateImage = async () => {
    if (!editingImage?.uri) return;

    try {
      const rotated = await ImageManipulator.manipulateAsync(
        editingImage.uri,
        [{ rotate: 90 }],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG, base64: true }
      );

      setEditingImage(rotated);
    } catch (error) {
      Alert.alert('Error', 'Failed to rotate image.');
    }
  };

  const adjustImage = async () => {
    if (!editingImage?.uri) return;

    try {
      const adjusted = await ImageManipulator.manipulateAsync(
        editingImage.uri,
        [{ resize: { width: 1080 } }, { brightness: 1.1 }, { contrast: 1.1 }],
        {
          compress: 0.9,
          format: ImageManipulator.SaveFormat.JPEG,
          base64: true,
        }
      );

      setEditingImage(adjusted);
    } catch (error) {
      Alert.alert('Error', 'Failed to adjust image.');
    }
  };

  const confirmImage = () => {
    if (editingImage) {
      setImage(editingImage.uri);
      setShowImageEditor(false);
      setEditingImage(null);
    }
  };

  const cancelEditing = () => {
    setShowImageEditor(false);
    setEditingImage(null);
  };

  /* ---------- torch ---------- */
  const toggleTorchLight = () => setTorchOn((prev) => !prev);

  /* ---------- UI ---------- */
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {imageUri ? (
        <Card style={styles.imageCard} elevation={4}>
          <Card.Cover
            source={{ uri: imageUri }}
            resizeMode='contain'
            style={styles.imagePreview}
          />
          <Card.Content style={styles.imageCardContent}>
            <Text variant='titleMedium' style={{ marginBottom: 8 }}>
              Math Problem Captured
            </Text>
            <Text
              variant='bodySmall'
              style={{ opacity: 0.7, marginBottom: 16 }}
            >
              Review your image before sending it for AI analysis
            </Text>
            <View style={styles.imageActions}>
              <Button
                mode='outlined'
                onPress={() => setShowImageEditor(true)}
                icon='pencil'
                style={{ flex: 1, marginRight: 8 }}
              >
                Edit
              </Button>
              <Button
                mode='outlined'
                onPress={reset}
                icon='refresh'
                style={{ flex: 1, marginLeft: 8 }}
              >
                Retake
              </Button>
            </View>
          </Card.Content>
        </Card>
      ) : (
        <View style={styles.cameraContainer}>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing='back'
            enableTorch={isTorchOn}
            focusMode='on'
            onCameraReady={onCameraReady}
          />

          {/* Camera Overlay */}
          <View style={styles.cameraOverlay}>
            <View style={[styles.cornerGuide, { top: 0, left: 0 }]} />
            <View style={[styles.cornerGuide, { top: 0, right: 0 }]} />
            <View style={[styles.cornerGuide, { bottom: 0, left: 0 }]} />
            <View style={[styles.cornerGuide, { bottom: 0, right: 0 }]} />

            <Text
              style={[styles.cameraHint, { color: theme.colors.onSurface }]}
            >
              Position math problem within the frame
            </Text>
          </View>

          {/* Camera Controls */}
          <View style={styles.cameraControls}>
            <TouchableOpacity
              style={[
                styles.controlButton,
                { backgroundColor: theme.colors.surface },
              ]}
              onPress={toggleTorchLight}
            >
              <Icon
                source='lightbulb'
                color={
                  isTorchOn ? theme.colors.secondary : theme.colors.onSurface
                }
                size={24}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.actions}>
        {!imageUri ? (
          <>
            <Button
              mode='contained'
              onPress={takePhoto}
              icon='camera'
              style={styles.primaryButton}
              contentStyle={styles.buttonContent}
              disabled={!isCameraReady}
            >
              Capture Math Problem
            </Button>

            <Button
              mode='outlined'
              onPress={pickPhoto}
              icon='image'
              style={styles.secondaryButton}
              contentStyle={styles.buttonContent}
            >
              Choose from Gallery
            </Button>
          </>
        ) : (
          <Button
            mode='contained'
            loading={uploading}
            onPress={uploadImage}
            disabled={uploading}
            icon='send'
            style={styles.primaryButton}
            contentStyle={styles.buttonContent}
          >
            {uploading ? 'Analyzing...' : 'Solve with AI'}
          </Button>
        )}
      </View>

      {/* Image Editor Modal */}
      <Portal>
        <Modal
          visible={showImageEditor}
          onDismiss={cancelEditing}
          contentContainerStyle={[
            styles.modal,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <Text
            variant='headlineSmall'
            style={{ marginBottom: 20, textAlign: 'center' }}
          >
            Edit Image
          </Text>

          {editingImage && (
            <Card style={styles.editorImageCard}>
              <Card.Cover
                source={{ uri: editingImage.uri }}
                resizeMode='contain'
                style={styles.editorImage}
              />
            </Card>
          )}

          <View style={styles.editModes}>
            <Chip
              selected={editMode === 'crop'}
              onPress={() => setEditMode('crop')}
              icon='crop'
              style={{ marginRight: 8 }}
            >
              Crop
            </Chip>
            <Chip
              selected={editMode === 'rotate'}
              onPress={() => setEditMode('rotate')}
              icon='rotate-right'
              style={{ marginRight: 8 }}
            >
              Rotate
            </Chip>
            <Chip
              selected={editMode === 'adjust'}
              onPress={() => setEditMode('adjust')}
              icon='tune'
            >
              Adjust
            </Chip>
          </View>

          <View style={styles.editActions}>
            <Button
              mode='outlined'
              onPress={
                editMode === 'crop'
                  ? cropImage
                  : editMode === 'rotate'
                  ? rotateImage
                  : adjustImage
              }
              icon={
                editMode === 'crop'
                  ? 'crop'
                  : editMode === 'rotate'
                  ? 'rotate-right'
                  : 'tune'
              }
              style={{ flex: 1, marginRight: 8 }}
            >
              {editMode === 'crop'
                ? 'Crop'
                : editMode === 'rotate'
                ? 'Rotate'
                : 'Adjust'}
            </Button>
          </View>

          <View style={styles.modalActions}>
            <Button
              mode='outlined'
              onPress={cancelEditing}
              style={{ flex: 1, marginRight: 8 }}
            >
              Cancel
            </Button>
            <Button
              mode='contained'
              onPress={confirmImage}
              style={{ flex: 1, marginLeft: 8 }}
            >
              Confirm
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cameraContainer: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cornerGuide: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderWidth: 3,
    borderColor: '#fff',
    opacity: 0.8,
  },
  cameraHint: {
    position: 'absolute',
    bottom: 100,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    color: '#fff',
  },
  cameraControls: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  imageCard: {
    flex: 1,
    marginBottom: 16,
  },
  imagePreview: {
    height: 300,
  },
  imageCardContent: {
    padding: 16,
  },
  imageActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actions: {
    gap: 12,
  },
  primaryButton: {
    borderRadius: 12,
  },
  secondaryButton: {
    borderRadius: 12,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 16,
    maxHeight: '80%',
  },
  editorImageCard: {
    marginBottom: 20,
  },
  editorImage: {
    height: 200,
  },
  editModes: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
  },
  editActions: {
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

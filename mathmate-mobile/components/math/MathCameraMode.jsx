import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Card, Icon, useTheme } from 'react-native-paper';
import { useMathStore } from '../../store/mathStore';

export default function MathCameraMode() {
  const cameraRef = React.useRef(null); // 1️⃣  ref
  const [isTorchOn, setTorchOn] = React.useState(false);
  const theme = useTheme();
  const { imageUri, uploading, setImage, uploadImage } = useMathStore();

  const [permission, requestPermission] = useCameraPermissions();

  /* ---------- permission ---------- */
  React.useEffect(() => {
    if (!permission?.granted) requestPermission();
  }, [permission]);

  if (!permission?.granted) {
    return (
      <View
        style={[styles.center, { backgroundColor: theme.colors.background }]}
      >
        <Button mode='contained' onPress={requestPermission}>
          Grant Camera Permission
        </Button>
      </View>
    );
  }

  /* ---------- capture + crop ---------- */
  const takePhoto = async () => {
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync({ quality: 1 });
    if (!photo) return;

    // 2️⃣  open built-in cropper
    const edited = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // <-- crop / rotate
      aspect: [4, 3],
      quality: 1,
      base64: false,
    });

    if (!edited.canceled) {
      setImage(edited.assets[0].uri);
    }
  };

  /* ---------- gallery + crop ---------- */
  const pickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], // ✅ new syntax
      allowsEditing: true, // ✅ crop / rotate
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };
  // const pickPhoto = async () => {
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });
  //   if (!result.canceled) setImage(result.assets[0].uri);
  // };

  /* ---------- torch ---------- */
  const toggleTorchLight = () => setTorchOn((prev) => !prev);

  /* ---------- UI ---------- */
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {imageUri ? (
        <Card style={styles.imageCard}>
          <Card.Cover source={{ uri: imageUri }} resizeMode='contain' />
        </Card>
      ) : (
        <View style={styles.cameraContainer}>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing='back'
            enableTorch={isTorchOn}
            focusMode='on'
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleTorchLight}>
              <Icon
                source='lightbulb'
                color={isTorchOn ? theme.colors.secondary : '#ccc'}
                size={34}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.actions}>
        <Button mode='contained-tonal' onPress={takePhoto} disabled={uploading}>
          Take & Crop Photo
        </Button>

        <Button mode='text' onPress={pickPhoto} disabled={uploading}>
          Pick & Crop from Gallery
        </Button>

        {imageUri && (
          <Button
            mode='contained'
            loading={uploading}
            onPress={uploadImage}
            disabled={uploading}
          >
            {uploading ? 'Uploading…' : 'Solve'}
          </Button>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  cameraContainer: { flex: 1, borderRadius: 12, overflow: 'hidden' },
  camera: { flex: 1 },
  imageCard: { flex: 1, justifyContent: 'center' },
  actions: { gap: 8 },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

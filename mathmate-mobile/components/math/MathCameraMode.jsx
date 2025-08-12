import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import AppText from '../ui/AppText';

export default function MathCameraMode() {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.background,
      }}
    >
      <AppText style={{ color: theme.colors.onSurface }}>
        📷 Camera Mode
      </AppText>
    </View>
  );
}

import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function ScreenWrapper({ children, scrollable = false }) {
  const theme = useTheme();

  return (
    <>
      <StatusBar />
      {scrollable ? (
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: theme.colors.background,
            paddingHorizontal: 20,
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: theme.colors.background,
            paddingHorizontal: 20,
          }}
        >
          {children}
        </View>
      )}
    </>
  );
}

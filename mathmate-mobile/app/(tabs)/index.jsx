import { useRouter } from 'expo-router';
import { Image, StyleSheet, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppBar from '../../components/ui/AppBar';
import AppText from '../../components/ui/AppText';

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <>
      <AppBar title='Home' />
      <View style={[styles.container, theme.colors.secondaryContainer]}>
        <Image
          source={require('../../assets/images/math_image.png')}
          style={styles.heroImage}
          // resizeMode='contain'
        />
      </View>
      <ScreenWrapper scrollable>
        <AppText titleLarge>AI MathSnap Lite</AppText>
        <AppText style={styles.subtitle}>
          Your all-in-one math companion. Solve problems, convert units, and
          play fun math games!
        </AppText>

        <View style={{ flexDirection: 'column', gap: 10 }}>
          {createButton('Solve Math Problems', '(tabs)/math', router)}
          {createButton('Unit Converter', '/converter', router)}
          {createButton('Math Games', '/games', router)}
        </View>
      </ScreenWrapper>
    </>
  );

  function createButton(label, screen, router) {
    return (
      <Button
        style={{ borderRadius: 5 }}
        mode='contained'
        onPress={() => router.push(screen)}
      >
        {label}
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    paddingHorizontal: 20,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    aspectRatio: 0.9,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginVertical: 24,
    textAlign: 'center',
  },
});

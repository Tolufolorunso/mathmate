import { Button, Text } from 'react-native-paper';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppBar from '../../components/ui/AppBar';

export default function LanguageScreen() {
  return (
    <>
      <AppBar
        elevated
        backButton
        title='Change Language'
        titleCenter
        titleBold
      />
      <ScreenWrapper>
        <Button mode='contained'>Press me</Button>
        <Text>Change Language Screen</Text>
      </ScreenWrapper>
    </>
  );
}

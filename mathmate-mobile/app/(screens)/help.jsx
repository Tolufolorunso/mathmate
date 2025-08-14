import { Button, Text } from 'react-native-paper';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppBar from '../../components/ui/AppBar';

export default function HelpScreen() {
  return (
    <>
      <AppBar
        elevated
        backButton
        title='Help & Support'
        titleCenter
        titleBold
      />
      <ScreenWrapper>
        <Button mode='contained'>Press me</Button>
        <Text>Help Screen</Text>
      </ScreenWrapper>
    </>
  );
}

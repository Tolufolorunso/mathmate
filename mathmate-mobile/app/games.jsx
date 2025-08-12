import { Button, Text } from 'react-native-paper';
import ScreenWrapper from '../components/ScreenWrapper';
import AppBar from '../components/ui/AppBar';

export default function GamesScreen() {
  return (
    <>
      <AppBar elevated backButton title='Daily Math Games' />
      <ScreenWrapper>
        <Button mode='contained'>Press me</Button>
        <Text>Games SCreen</Text>
      </ScreenWrapper>
    </>
  );
}

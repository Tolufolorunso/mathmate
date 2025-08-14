import { Button, Text } from 'react-native-paper';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppBar from '../../components/ui/AppBar';

export default function HistoriesScreen() {
  return (
    <>
      <AppBar elevated backButton title='Histories' titleCenter titleBold />
      <ScreenWrapper>
        <Button mode='contained'>Press me</Button>
        <Text>Histories Screen</Text>
      </ScreenWrapper>
    </>
  );
}

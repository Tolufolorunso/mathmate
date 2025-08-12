import ScreenWrapper from '../../components/ScreenWrapper';
import AppBar from '../../components/ui/AppBar';
import AppText from '../../components/ui/AppText';

export default function LearnScreen() {
  return (
    <>
      <AppBar title='Learn' />
      <ScreenWrapper
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <AppText displayLarge>Learn Screen</AppText>
      </ScreenWrapper>
    </>
  );
}

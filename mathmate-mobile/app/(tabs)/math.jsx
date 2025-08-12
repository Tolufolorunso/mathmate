import MathCameraMode from '../../components/math/MathCameraMode';
import MathTypeMode from '../../components/math/MathTypeMode';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppBar from '../../components/ui/AppBar';
import { useMathStore } from '../../store/mathStore';

const MathScreen = () => {
  const { mode, toggleMode } = useMathStore();
  return (
    <>
      <AppBar
        title='Mathy'
        onToggleSwitch={toggleMode}
        isSwitchOn={mode === 'camera'}
        show
      />
      <ScreenWrapper>
        {mode === 'camera' ? <MathCameraMode /> : <MathTypeMode />}
      </ScreenWrapper>
    </>
  );
};

export default MathScreen;

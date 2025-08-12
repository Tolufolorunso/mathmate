import React from 'react';
import { Text } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppBar from '../../components/ui/AppBar';

const MathScreen = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  return (
    <>
      <AppBar
        title='Mathy'
        onToggleSwitch={onToggleSwitch}
        isSwitchOn={isSwitchOn}
        show
      />
      <ScreenWrapper>
        <Text>MathScreen</Text>
      </ScreenWrapper>
    </>
  );
};

export default MathScreen;

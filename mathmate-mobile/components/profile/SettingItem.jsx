import { View } from 'react-native';
import { IconButton, Switch, TouchableRipple } from 'react-native-paper';
import { useThemeStore } from '../../store/themeStore';
import profileStyle from '../../style/profile.style';
import AppText from '../ui/AppText';

export default function SettingItem(props) {
  const { setting, settings, setSettings, navigateTo } = props;
  const { setMode } = useThemeStore();
  let isSwitchOn, linkTo;

  if (setting.stateKey === 'darkMode') {
    isSwitchOn = settings.darkMode;
  } else {
    isSwitchOn = settings.notifications;
  }

  if (setting.type === 'navigation') {
    linkTo =
      setting.id === 'history'
        ? 'history'
        : setting.id === 'language'
        ? 'language'
        : setting.id === 'help'
        ? 'help'
        : null;
    console.log(linkTo);
  }

  const handleSwitch = () => {
    if (setting.stateKey === 'darkMode') {
      isSwitchOn = settings.darkMode;
      const next = settings.darkMode ? 'light' : 'dark';
      setSettings((prevState) => ({
        ...prevState,
        darkMode: !settings.darkMode,
      }));
      setMode(next);
    }

    if (setting.stateKey === 'notifications') {
      isSwitchOn = settings.notification;
    }
  };

  const styles = profileStyle();
  return (
    <View style={styles.itemContainer}>
      <AppText style={styles.title}>{setting.title}</AppText>
      {setting.type === 'toggle' ? (
        <Switch onValueChange={handleSwitch} value={isSwitchOn} />
      ) : setting.type === 'navigation' ? (
        <View style={styles.navContainer}>
          {setting.value !== undefined ? (
            <TouchableRipple onPress={() => navigateTo(linkTo)}>
              <AppText style={styles.navText}>{setting.value}</AppText>
            </TouchableRipple>
          ) : (
            <IconButton
              icon='arrow-right'
              size={20}
              onPress={() => navigateTo(linkTo)}
            />
          )}
        </View>
      ) : null}
    </View>
  );
}

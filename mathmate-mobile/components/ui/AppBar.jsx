import { useRouter } from 'expo-router';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Appbar, Switch, Text } from 'react-native-paper';

const AppBar = (props) => {
  const {
    elevated = false,
    backButton = false,
    title,
    show = false,
    isSwitchOn = false,
    onToggleSwitch = () => {},
    ...rest
  } = props;
  const router = useRouter();

  return (
    <Appbar.Header elevated={elevated} {...rest}>
      {backButton && <Appbar.BackAction onPress={() => router.back()} />}
      <Appbar.Content title={title} />
      {show && (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <Text>{isSwitchOn ? 'Camera' : 'Keyboard'}</Text>
          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
        </View>
      )}
    </Appbar.Header>
  );
};

AppBar.propTypes = {
  elevated: PropTypes.bool,
  backButton: PropTypes.bool,
  title: PropTypes.string.isRequired,
  show: PropTypes.bool,
  isSwitchOn: PropTypes.bool,
  onToggleSwitch: PropTypes.func,
};

AppBar.defaultProps = {
  elevated: false,
  backButton: false,
  show: false,
  isSwitchOn: false,
  onToggleSwitch: () => {},
};

export default AppBar;

// import { View } from 'react-native';
// import { Appbar, Switch, Text } from 'react-native-paper';

// const AppBar = (props) => {
//   // Add your code here to customize the AppBar component
//   const { elevated = false, backButton = false, title, ...rest } = props;
//   return (
//     <Appbar.Header elevated={elevated} {...rest}>
//       {backButton && <Appbar.BackAction onPress={() => {}} />}
//       <Appbar.Content title={title} />
//       {props.show && (
//         <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
//           <Text>{props.isSwitchOn ? 'Camera' : 'Keyboard'}</Text>
//           <Switch
//             value={props.isSwitchOn}
//             onValueChange={props.onToggleSwitch}
//           />
//         </View>
//       )}
//     </Appbar.Header>
//   );
// };

// export default AppBar;

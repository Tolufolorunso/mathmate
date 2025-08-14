import { View } from 'react-native';
import { Avatar } from 'react-native-paper';
import profileStyle from '../../style/profile.style';
import { horizontalScale, verticalScale } from '../../style/scaling';
import AppText from '../ui/AppText';

export default function UserInfo({ hasImage }) {
  const styles = profileStyle();
  return (
    <View style={styles.userInfoContainer}>
      {hasImage ? (
        <Avatar.Image
          size={horizontalScale(128)}
          source={require('../../assets/images/math_image.jpg')}
        />
      ) : (
        <Avatar.Text size={horizontalScale(128)} label='XD' />
      )}
      <View style={{ alignItems: 'center' }}>
        <AppText
          headlineLarge
          style={{ marginTop: verticalScale(10), fontweight: 'bold' }}
        >
          User Name
        </AppText>
        <AppText bodyLarge>Bio</AppText>
        <AppText bodyLarge>Join 2023</AppText>
      </View>
    </View>
  );
}

import { StyleSheet } from 'react-native';
import { horizontalScale, verticalScale } from './scaling';

const profileStyle = () => {
  const styles = StyleSheet.create({
    userInfoContainer: {
      alignItems: 'center',
      marginTop: verticalScale(20),
      gap: 20,
    },
    statsContainer: {
      gap: 10,
      flexDirection: 'row',
      marginTop: verticalScale(20),
    },
    statContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      borderWidth: 1,
      borderColor: 'red',
      gap: horizontalScale(10),
      padding: horizontalScale(10),
      borderRadius: horizontalScale(8),
    },

    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
      // borderBottomWidth: 1,
      // borderBottomColor: '#e0e0e0',
    },
    title: {
      fontSize: 16,
    },
    navContainer: {
      alignItems: 'center',
    },
    navText: {
      fontSize: 16,
      color: '#757575',
    },
  });

  return styles;
};

export default profileStyle;

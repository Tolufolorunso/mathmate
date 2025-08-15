import { StyleSheet } from 'react-native';

const mathTypeModeStyle = () => {
  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 5,
    },
    typeChip: {
      marginRight: 8,
    },
    questionCard: {
      flex: 1,
      marginBottom: 10,
    },
    questionScroll: {
      maxHeight: 150,
      backgroundColor: 'red',
    },
    questionContent: {
      paddingVertical: 6,
      maxHeight: 150,
      zIndex: -9,
      overflow: 'scroll',
    },

    actions: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 16,
    },
    actionButton: {
      flex: 1,
      borderRadius: 12,
    },
    submitButton: {
      // Additional styling for submit button if needed
    },
    modal: {
      padding: 20,
      margin: 20,
      borderRadius: 16,
      maxHeight: '80%',
    },
    typeGrid: {
      gap: 12,
    },
    typeCard: {
      marginBottom: 8,
      borderWidth: 2,
    },
    typeCardContent: {
      padding: 16,
      alignItems: 'center',
    },
    examplesList: {
      maxHeight: 300,
    },
    exampleCard: {
      marginBottom: 8,
    },
  });

  return styles;
};

export default mathTypeModeStyle;

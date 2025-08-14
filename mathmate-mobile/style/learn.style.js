import { StyleSheet } from 'react-native';
import { horizontalScale, verticalScale } from './scaling';

const learnStyle = (theme) => {
  const styles = StyleSheet.create({
    headerCard: {
      borderRadius: 20,
      marginTop: verticalScale(8),
      marginBottom: verticalScale(20),
    },
    headerContent: {
      padding: horizontalScale(24),
      alignItems: 'center',
    },
    headerTitle: {
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: verticalScale(12),
    },
    headerSubtitle: {
      textAlign: 'center',
      lineHeight: 22,
    },
    levelSection: {
      marginBottom: verticalScale(24),
    },
    sectionTitle: {
      fontWeight: '600',
      marginBottom: verticalScale(16),
    },
    levelGrid: {
      gap: 16,
    },
    levelCard: {
      borderRadius: 16,
      overflow: 'hidden',
    },
    levelCardContent: {
      padding: verticalScale(20),
      alignItems: 'center',
    },
    levelIcon: {
      width: horizontalScale(64),
      height: horizontalScale(64),
      borderRadius: horizontalScale(32),
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: verticalScale(10),
    },
    levelTitle: {
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: verticalScale(8),
    },
    levelAge: {
      textAlign: 'center',
      marginBottom: verticalScale(12),
    },
    topicChip: {
      marginBottom: verticalScale(12),
    },
    levelDescription: {
      textAlign: 'center',
      lineHeight: 18,
    },
    topicsSection: {
      marginBottom: verticalScale(24),
    },
    topicsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
      flexWrap: 'wrap',
      gap: 12,
    },
    topicsHeaderRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    filterButton: {
      borderRadius: 20,
    },
    topicsGrid: {
      gap: 12,
      marginBottom: 16,
    },
    topicCard: {
      borderRadius: 16,
      overflow: 'hidden',
    },
    topicCardContent: {
      padding: 16,
    },
    completionBadge: {
      position: 'absolute',
      top: 12,
      right: 12,
    },
    statusChip: {
      borderRadius: 12,
    },
    topicTitle: {
      fontWeight: '600',
      marginBottom: 12,
      marginTop: 8,
      lineHeight: 20,
    },
    topicMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
      gap: 8,
    },
    difficultyChip: {
      borderRadius: 12,
    },
    topicTime: {
      marginLeft: 'auto',
    },
    progressSection: {
      marginBottom: 12,
    },
    progressInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    progressBar: {
      height: 6,
      borderRadius: 3,
    },
    additionalInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    pagination: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 16,
      // paddingHorizontal: 16,
    },
    pageNumbers: {
      flexDirection: 'row',
      gap: 4,
    },
    pageButton: {
      minWidth: 40,
    },
    pageInfo: {
      alignItems: 'center',
      marginBottom: 16,
    },
    tipsCard: {
      borderRadius: 20,
      margin: 16,
      marginBottom: 24,
    },
    tipsTitle: {
      fontWeight: '600',
      marginBottom: 16,
    },
    tipsText: {
      lineHeight: 22,
    },
    modal: {
      backgroundColor: 'white',
      padding: 20,
      margin: 20,
      borderRadius: 16,
    },
    modalContent: {
      marginBottom: 20,
    },
    modalInfo: {
      marginBottom: 16,
    },
    modalActions: {
      flexDirection: 'row',
      gap: 12,
    },
  });
  return styles;
};
export default learnStyle;

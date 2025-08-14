import { StyleSheet } from 'react-native';

import { horizontalScale, verticalScale } from './scaling';

const homeStyles = () => {
  const styles = StyleSheet.create({
    heroCard: {
      marginBottom: verticalScale(24),
      borderRadius: horizontalScale(20),
      overflow: 'hidden',
    },
    heroContent: {
      padding: horizontalScale(24),
      flexDirection: 'row',
      alignItems: 'center',
    },
    heroText: {
      flex: 1,
      marginRight: horizontalScale(16),
    },
    heroTitle: {
      fontWeight: 'bold',
      marginBottom: horizontalScale(12),
      lineHeight: verticalScale(32),
    },
    heroSubtitle: {
      lineHeight: verticalScale(22),
      opacity: 0.9,
    },
    heroImage: {
      width: horizontalScale(120),
      height: verticalScale(120),
      borderRadius: horizontalScale(60),
    },
    statsContainer: {
      flexDirection: 'row',
      gap: horizontalScale(12),
      marginBottom: verticalScale(24),
    },
    statCard: {
      flex: 1,
      borderRadius: horizontalScale(16),
    },
    statContent: {
      padding: horizontalScale(16),
      alignItems: 'center',
    },
    statIcon: {
      width: horizontalScale(48),
      height: horizontalScale(48),
      borderRadius: horizontalScale(24),
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: verticalScale(12),
    },
    statValue: {
      fontWeight: 'bold',
      marginBottom: verticalScale(4),
    },
    statLabel: {
      textAlign: 'center',
    },
    featuresSection: {
      marginBottom: verticalScale(24),
    },
    sectionTitle: {
      fontWeight: '600',
      marginBottom: verticalScale(16),
    },
    featureCard: {
      marginBottom: verticalScale(12),
      borderRadius: horizontalScale(16),
    },
    featureContent: {
      padding: horizontalScale(20),
    },
    featureHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: horizontalScale(12),
    },
    featureIcon: {
      width: horizontalScale(56),
      height: verticalScale(56),
      borderRadius: horizontalScale(28),
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: horizontalScale(16),
    },
    featureInfo: {
      flex: 1,
    },
    featureTitle: {
      fontWeight: '600',
      marginBottom: 4,
    },
    featureSubtitle: {
      opacity: 0.8,
    },
    recentSection: {
      marginBottom: 24,
    },
    recentHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: verticalScale(16),
    },
    recentCard: {
      marginBottom: 8,
      borderRadius: 12,
    },
    recentContent: {
      padding: horizontalScale(16),
    },
    recentInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    recentChip: {
      height: verticalScale(24),
    },
    recentQuestion: {
      marginBottom: verticalScale(8),
    },
    recentStatus: {
      fontWeight: '500',
    },
    tipsCard: {
      marginBottom: verticalScale(24),
      borderRadius: 16,
    },
    tipsTitle: {
      fontWeight: '600',
      marginBottom: verticalScale(12),
    },
    tipsText: {
      lineHeight: 22,
    },
  });
  return styles;
};

export default homeStyles;

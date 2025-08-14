import { useRouter } from 'expo-router';
import {
  Dimensions,
  Linking,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  Button,
  Card,
  Chip,
  Divider,
  IconButton,
  List,
  Text,
  useTheme,
} from 'react-native-paper';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppBar from '../../components/ui/AppBar';

const { width } = Dimensions.get('window');

export default function AboutScreen() {
  const theme = useTheme();
  const router = useRouter();

  const appInfo = {
    name: 'MathMate',
    version: '1.0.0',
    description: 'Your comprehensive mathematics learning companion',
    tagline:
      'Master math with interactive learning, AI-powered problem solving, and a scientific calculator.',
    features: [
      'AI-Powered Math Problem Solver',
      'Scientific Calculator with Advanced Functions',
      'Interactive Learning Modules',
      'Progress Tracking & Analytics',
      'Offline Learning Capability',
      'Cross-Platform Support',
    ],
    technologies: [
      'React Native & Expo',
      'AI/ML Integration',
      'Real-time Problem Solving',
      'Advanced Mathematical Engine',
      'Responsive Design',
      'Secure Data Handling',
    ],
  };

  const teamInfo = [
    {
      name: 'Development Team',
      role: 'Core Development',
      description: 'Building the future of math education',
      icon: 'code-braces',
    },
    {
      name: 'AI Research Team',
      role: 'Machine Learning',
      description: 'Advancing mathematical problem solving',
      icon: 'brain',
    },
    {
      name: 'Education Specialists',
      role: 'Curriculum Design',
      description: 'Creating engaging learning experiences',
      icon: 'school',
    },
    {
      name: 'UX/UI Designers',
      role: 'User Experience',
      description: 'Crafting intuitive interfaces',
      icon: 'palette',
    },
  ];

  const contactInfo = [
    {
      type: 'Email',
      value: 'support@mathmate.app',
      icon: 'email',
      action: () => Linking.openURL('mailto:support@mathmate.app'),
    },
    {
      type: 'Website',
      value: 'www.mathmate.app',
      icon: 'web',
      action: () => Linking.openURL('https://www.mathmate.app'),
    },
    {
      type: 'Social Media',
      value: '@MathMateApp',
      icon: 'twitter',
      action: () => Linking.openURL('https://twitter.com/MathMateApp'),
    },
    {
      type: 'Documentation',
      value: 'API & Guides',
      icon: 'book-open',
      action: () => Linking.openURL('https://docs.mathmate.app'),
    },
  ];

  const statistics = [
    { label: 'Active Users', value: '10K+', icon: 'account-group' },
    { label: 'Topics Covered', value: '100+', icon: 'book-open' },
    { label: 'Countries', value: '50+', icon: 'earth' },
    { label: 'Languages', value: '15+', icon: 'translate' },
  ];

  const handleContact = (contact) => {
    if (contact.action) {
      contact.action();
    }
  };

  const handleFeedback = () => {
    // Navigate to feedback screen or open feedback form
    router.push('/feedback');
  };

  const handleRateApp = () => {
    // Open app store rating
    Linking.openURL(
      'https://play.google.com/store/apps/details?id=com.mathmate.app'
    );
  };

  return (
    <ScreenWrapper>
      <AppBar title='About MathMate' showBack />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* App Header */}
        <Card
          style={[
            styles.headerCard,
            { backgroundColor: theme.colors.primaryContainer },
          ]}
          elevation={4}
        >
          <Card.Content style={styles.headerContent}>
            <View style={styles.appLogo}>
              <Text style={styles.appIcon}>🧮</Text>
            </View>
            <Text
              variant='displaySmall'
              style={[
                styles.appName,
                { color: theme.colors.onPrimaryContainer },
              ]}
            >
              {appInfo.name}
            </Text>
            <Text
              variant='titleMedium'
              style={[
                styles.appTagline,
                { color: theme.colors.onPrimaryContainer },
              ]}
            >
              {appInfo.tagline}
            </Text>
            <Chip
              mode='outlined'
              style={[
                styles.versionChip,
                { borderColor: theme.colors.onPrimaryContainer },
              ]}
              textStyle={{ color: theme.colors.onPrimaryContainer }}
            >
              Version {appInfo.version}
            </Chip>
          </Card.Content>
        </Card>

        {/* App Statistics */}
        <View style={styles.statsSection}>
          <Text
            variant='titleLarge'
            style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
          >
            App Statistics
          </Text>
          <View style={styles.statsGrid}>
            {statistics.map((stat, index) => (
              <Card
                key={index}
                style={[
                  styles.statCard,
                  { backgroundColor: theme.colors.surface },
                ]}
                elevation={2}
              >
                <Card.Content style={styles.statContent}>
                  <IconButton
                    icon={stat.icon}
                    size={32}
                    iconColor={theme.colors.primary}
                    style={styles.statIcon}
                  />
                  <Text
                    variant='headlineSmall'
                    style={[styles.statValue, { color: theme.colors.primary }]}
                  >
                    {stat.value}
                  </Text>
                  <Text
                    variant='bodySmall'
                    style={[
                      styles.statLabel,
                      { color: theme.colors.onSurfaceVariant },
                    ]}
                  >
                    {stat.label}
                  </Text>
                </Card.Content>
              </Card>
            ))}
          </View>
        </View>

        {/* Key Features */}
        <Card
          style={[
            styles.featuresCard,
            { backgroundColor: theme.colors.surface },
          ]}
          elevation={2}
        >
          <Card.Content>
            <Text
              variant='titleLarge'
              style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
            >
              Key Features
            </Text>
            <Divider style={styles.divider} />
            {appInfo.features.map((feature, index) => (
              <List.Item
                key={index}
                title={feature}
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon='check-circle'
                    color={theme.colors.success}
                  />
                )}
                titleStyle={{ color: theme.colors.onSurface }}
                style={styles.featureItem}
              />
            ))}
          </Card.Content>
        </Card>

        {/* Technologies */}
        <Card
          style={[styles.techCard, { backgroundColor: theme.colors.surface }]}
          elevation={2}
        >
          <Card.Content>
            <Text
              variant='titleLarge'
              style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
            >
              Technologies
            </Text>
            <Divider style={styles.divider} />
            <View style={styles.techGrid}>
              {appInfo.technologies.map((tech, index) => (
                <Chip
                  key={index}
                  mode='outlined'
                  style={[
                    styles.techChip,
                    { borderColor: theme.colors.primary },
                  ]}
                  textStyle={{ color: theme.colors.primary }}
                >
                  {tech}
                </Chip>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Team */}
        <Card
          style={[styles.teamCard, { backgroundColor: theme.colors.surface }]}
          elevation={2}
        >
          <Card.Content>
            <Text
              variant='titleLarge'
              style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
            >
              Our Team
            </Text>
            <Divider style={styles.divider} />
            {teamInfo.map((member, index) => (
              <List.Item
                key={index}
                title={member.name}
                description={`${member.role} - ${member.description}`}
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon={member.icon}
                    color={theme.colors.primary}
                  />
                )}
                titleStyle={{ color: theme.colors.onSurface }}
                descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
                style={styles.teamItem}
              />
            ))}
          </Card.Content>
        </Card>

        {/* Contact Information */}
        <Card
          style={[
            styles.contactCard,
            { backgroundColor: theme.colors.surface },
          ]}
          elevation={2}
        >
          <Card.Content>
            <Text
              variant='titleLarge'
              style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
            >
              Contact & Support
            </Text>
            <Divider style={styles.divider} />
            {contactInfo.map((contact, index) => (
              <List.Item
                key={index}
                title={contact.type}
                description={contact.value}
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon={contact.icon}
                    color={theme.colors.primary}
                  />
                )}
                right={(props) => (
                  <IconButton {...props} icon='open-in-new' size={20} />
                )}
                onPress={() => handleContact(contact)}
                titleStyle={{ color: theme.colors.onSurface }}
                descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
                style={styles.contactItem}
              />
            ))}
          </Card.Content>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            mode='contained'
            onPress={handleFeedback}
            icon='message-text'
            style={styles.actionButton}
            contentStyle={styles.buttonContent}
          >
            Send Feedback
          </Button>
          <Button
            mode='outlined'
            onPress={handleRateApp}
            icon='star'
            style={styles.actionButton}
            contentStyle={styles.buttonContent}
          >
            Rate App
          </Button>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text
            variant='bodySmall'
            style={[
              styles.footerText,
              { color: theme.colors.onSurfaceVariant },
            ]}
          >
            Made with ❤️ for math enthusiasts worldwide
          </Text>
          <Text
            variant='bodySmall'
            style={[
              styles.footerText,
              { color: theme.colors.onSurfaceVariant },
            ]}
          >
            © 2024 MathMate. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerCard: {
    borderRadius: 20,
    marginBottom: 24,
  },
  headerContent: {
    alignItems: 'center',
    padding: 24,
  },
  appLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  appIcon: {
    fontSize: 48,
  },
  appName: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  appTagline: {
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 22,
  },
  versionChip: {
    borderRadius: 16,
  },
  statsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 48) / 2,
    marginBottom: 12,
    borderRadius: 16,
  },
  statContent: {
    alignItems: 'center',
    padding: 16,
  },
  statIcon: {
    marginBottom: 8,
  },
  statValue: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    textAlign: 'center',
  },
  featuresCard: {
    borderRadius: 16,
    marginBottom: 16,
  },
  divider: {
    marginVertical: 16,
  },
  featureItem: {
    paddingVertical: 4,
  },
  techCard: {
    borderRadius: 16,
    marginBottom: 16,
  },
  techGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  techChip: {
    marginBottom: 8,
  },
  teamCard: {
    borderRadius: 16,
    marginBottom: 16,
  },
  teamItem: {
    paddingVertical: 4,
  },
  contactCard: {
    borderRadius: 16,
    marginBottom: 24,
  },
  contactItem: {
    paddingVertical: 4,
  },
  actionButtons: {
    gap: 12,
    marginBottom: 24,
  },
  actionButton: {
    borderRadius: 12,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerText: {
    textAlign: 'center',
    marginBottom: 4,
  },
});

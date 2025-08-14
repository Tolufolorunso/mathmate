import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import {
  Button,
  Card,
  Divider,
  List,
  Text,
  useTheme,
} from 'react-native-paper';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppBar from '../../components/ui/AppBar';

const { width } = Dimensions.get('window');

export default function PolicyTermsScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [selectedSection, setSelectedSection] = useState('privacy');

  const sections = [
    { id: 'privacy', title: 'Privacy Policy', icon: 'shield-account' },
    { id: 'terms', title: 'Terms of Service', icon: 'file-document' },
    { id: 'data', title: 'Data Usage', icon: 'database' },
    { id: 'cookies', title: 'Cookies Policy', icon: 'cookie' },
  ];

  const renderPrivacyPolicy = () => (
    <Card
      style={[styles.contentCard, { backgroundColor: theme.colors.surface }]}
      elevation={2}
    >
      <Card.Content>
        <Text
          variant='headlineSmall'
          style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
        >
          Privacy Policy
        </Text>
        <Text
          variant='bodySmall'
          style={[styles.lastUpdated, { color: theme.colors.onSurfaceVariant }]}
        >
          Last updated: December 2024
        </Text>

        <Divider style={styles.divider} />

        <Text
          variant='titleMedium'
          style={[styles.subsectionTitle, { color: theme.colors.onSurface }]}
        >
          Information We Collect
        </Text>
        <Text
          variant='bodyMedium'
          style={[styles.contentText, { color: theme.colors.onSurface }]}
        >
          We collect information you provide directly to us, such as when you
          create an account, complete learning activities, or contact us for
          support.
        </Text>

        <List.Item
          title='Account Information'
          description='Username, email address, profile picture, and learning preferences'
          left={(props) => <List.Icon {...props} icon='account' />}
          titleStyle={{ color: theme.colors.onSurface }}
          descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
        />

        <List.Item
          title='Learning Data'
          description='Progress, completed topics, quiz scores, and learning patterns'
          left={(props) => <List.Icon {...props} icon='school' />}
          titleStyle={{ color: theme.colors.onSurface }}
          descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
        />

        <List.Item
          title='Usage Analytics'
          description='App usage statistics, feature interactions, and performance data'
          left={(props) => <List.Icon {...props} icon='chart-line' />}
          titleStyle={{ color: theme.colors.onSurface }}
          descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
        />

        <Text
          variant='titleMedium'
          style={[styles.subsectionTitle, { color: theme.colors.onSurface }]}
        >
          How We Use Your Information
        </Text>
        <Text
          variant='bodyMedium'
          style={[styles.contentText, { color: theme.colors.onSurface }]}
        >
          We use the information we collect to provide, maintain, and improve
          our services, personalize your learning experience, and communicate
          with you.
        </Text>

        <Text
          variant='titleMedium'
          style={[styles.subsectionTitle, { color: theme.colors.onSurface }]}
        >
          Data Security
        </Text>
        <Text
          variant='bodyMedium'
          style={[styles.contentText, { color: theme.colors.onSurface }]}
        >
          We implement appropriate security measures to protect your personal
          information against unauthorized access, alteration, disclosure, or
          destruction.
        </Text>
      </Card.Content>
    </Card>
  );

  const renderTermsOfService = () => (
    <Card
      style={[styles.contentCard, { backgroundColor: theme.colors.surface }]}
      elevation={2}
    >
      <Card.Content>
        <Text
          variant='headlineSmall'
          style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
        >
          Terms of Service
        </Text>
        <Text
          variant='bodySmall'
          style={[styles.lastUpdated, { color: theme.colors.onSurfaceVariant }]}
        >
          Last updated: December 2024
        </Text>

        <Divider style={styles.divider} />

        <Text
          variant='titleMedium'
          style={[styles.subsectionTitle, { color: theme.colors.onSurface }]}
        >
          Acceptance of Terms
        </Text>
        <Text
          variant='bodyMedium'
          style={[styles.contentText, { color: theme.colors.onSurface }]}
        >
          By accessing and using MathMate, you accept and agree to be bound by
          the terms and provision of this agreement.
        </Text>

        <Text
          variant='titleMedium'
          style={[styles.subsectionTitle, { color: theme.colors.onSurface }]}
        >
          User Responsibilities
        </Text>
        <List.Item
          title='Account Security'
          description='Maintain the confidentiality of your account credentials'
          left={(props) => <List.Icon {...props} icon='lock' />}
          titleStyle={{ color: theme.colors.onSurface }}
          descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
        />

        <List.Item
          title='Appropriate Use'
          description='Use the app for educational purposes only'
          left={(props) => <List.Icon {...props} icon='check-circle' />}
          titleStyle={{ color: theme.colors.onSurface }}
          descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
        />

        <List.Item
          title='Content Respect'
          description='Respect intellectual property and copyright laws'
          left={(props) => <List.Icon {...props} icon='copyright' />}
          titleStyle={{ color: theme.colors.onSurface }}
          descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
        />

        <Text
          variant='titleMedium'
          style={[styles.subsectionTitle, { color: theme.colors.onSurface }]}
        >
          Prohibited Activities
        </Text>
        <Text
          variant='bodyMedium'
          style={[styles.contentText, { color: theme.colors.onSurface }]}
        >
          You may not use the app to violate any laws, infringe on others'
          rights, or engage in harmful or malicious activities.
        </Text>
      </Card.Content>
    </Card>
  );

  const renderDataUsage = () => (
    <Card
      style={[styles.contentCard, { backgroundColor: theme.colors.surface }]}
      elevation={2}
    >
      <Card.Content>
        <Text
          variant='headlineSmall'
          style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
        >
          Data Usage & Storage
        </Text>

        <Divider style={styles.divider} />

        <Text
          variant='titleMedium'
          style={[styles.subsectionTitle, { color: theme.colors.onSurface }]}
        >
          Local Storage
        </Text>
        <Text
          variant='bodyMedium'
          style={[styles.contentText, { color: theme.colors.onSurface }]}
        >
          Most of your learning data is stored locally on your device for
          privacy and offline access. This includes:
        </Text>

        <List.Item
          title='Learning Progress'
          description='Topic completion status, quiz scores, and practice results'
          left={(props) => <List.Icon {...props} icon='progress-clock' />}
          titleStyle={{ color: theme.colors.onSurface }}
          descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
        />

        <List.Item
          title='Calculation History'
          description='Recent calculations and mathematical expressions'
          left={(props) => <List.Icon {...props} icon='calculator' />}
          titleStyle={{ color: theme.colors.onSurface }}
          descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
        />

        <Text
          variant='titleMedium'
          style={[styles.subsectionTitle, { color: theme.colors.onSurface }]}
        >
          Cloud Storage (Premium)
        </Text>
        <Text
          variant='bodyMedium'
          style={[styles.contentText, { color: theme.colors.onSurface }]}
        >
          Premium users can optionally sync their data to the cloud for backup
          and cross-device access. This is completely optional and can be
          disabled.
        </Text>

        <Text
          variant='titleMedium'
          style={[styles.subsectionTitle, { color: theme.colors.onSurface }]}
        >
          Data Retention
        </Text>
        <Text
          variant='bodyMedium'
          style={[styles.contentText, { color: theme.colors.onSurface }]}
        >
          We retain your data only as long as necessary to provide our services.
          You can request deletion of your data at any time.
        </Text>
      </Card.Content>
    </Card>
  );

  const renderCookiesPolicy = () => (
    <Card
      style={[styles.contentCard, { backgroundColor: theme.colors.surface }]}
      elevation={2}
    >
      <Card.Content>
        <Text
          variant='headlineSmall'
          style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
        >
          Cookies & Tracking
        </Text>

        <Divider style={styles.divider} />

        <Text
          variant='titleMedium'
          style={[styles.subsectionTitle, { color: theme.colors.onSurface }]}
        >
          What Are Cookies?
        </Text>
        <Text
          variant='bodyMedium'
          style={[styles.contentText, { color: theme.colors.onSurface }]}
        >
          Cookies are small text files stored on your device that help us
          provide a better user experience and analyze app performance.
        </Text>

        <Text
          variant='titleMedium'
          style={[styles.subsectionTitle, { color: theme.colors.onSurface }]}
        >
          Types of Cookies We Use
        </Text>
        <List.Item
          title='Essential Cookies'
          description='Required for basic app functionality and security'
          left={(props) => <List.Icon {...props} icon='shield-check' />}
          titleStyle={{ color: theme.colors.onSurface }}
          descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
        />

        <List.Item
          title='Analytics Cookies'
          description='Help us understand how users interact with the app'
          left={(props) => <List.Icon {...props} icon='chart-bar' />}
          titleStyle={{ color: theme.colors.onSurface }}
          descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
        />

        <List.Item
          title='Preference Cookies'
          description='Remember your settings and preferences'
          left={(props) => <List.Icon {...props} icon='cog' />}
          titleStyle={{ color: theme.colors.onSurface }}
          descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
        />

        <Text
          variant='titleMedium'
          style={[styles.subsectionTitle, { color: theme.colors.onSurface }]}
        >
          Managing Cookies
        </Text>
        <Text
          variant='bodyMedium'
          style={[styles.contentText, { color: theme.colors.onSurface }]}
        >
          You can control and manage cookies through your device settings.
          Disabling certain cookies may affect app functionality.
        </Text>
      </Card.Content>
    </Card>
  );

  const renderContent = () => {
    switch (selectedSection) {
      case 'privacy':
        return renderPrivacyPolicy();
      case 'terms':
        return renderTermsOfService();
      case 'data':
        return renderDataUsage();
      case 'cookies':
        return renderCookiesPolicy();
      default:
        return renderPrivacyPolicy();
    }
  };

  return (
    <ScreenWrapper>
      <AppBar title='Policy & Terms' showBack />

      <View style={styles.container}>
        {/* Section Navigation */}
        <View style={styles.navigationSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {sections.map((section) => (
              <Button
                key={section.id}
                mode={selectedSection === section.id ? 'contained' : 'outlined'}
                onPress={() => setSelectedSection(section.id)}
                icon={section.icon}
                style={[
                  styles.navButton,
                  selectedSection === section.id && {
                    backgroundColor: theme.colors.primary,
                  },
                ]}
                labelStyle={[
                  styles.navLabel,
                  {
                    color:
                      selectedSection === section.id
                        ? '#fff'
                        : theme.colors.primary,
                  },
                ]}
                compact
              >
                {section.title}
              </Button>
            ))}
          </ScrollView>
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {renderContent()}
        </ScrollView>

        {/* Bottom Actions */}
        <View
          style={[
            styles.bottomActions,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <Button
            mode='outlined'
            onPress={() => router.back()}
            style={styles.bottomButton}
          >
            Back
          </Button>
          <Button
            mode='contained'
            onPress={() => {
              /* Handle accept terms */
            }}
            style={styles.bottomButton}
            icon='check'
          >
            Accept Terms
          </Button>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigationSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'transparent',
  },
  navButton: {
    marginRight: 12,
    borderRadius: 20,
  },
  navLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  contentCard: {
    borderRadius: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 8,
  },
  lastUpdated: {
    fontStyle: 'italic',
    marginBottom: 16,
  },
  divider: {
    marginVertical: 16,
  },
  subsectionTitle: {
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 20,
  },
  contentText: {
    lineHeight: 22,
    marginBottom: 16,
  },
  bottomActions: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    elevation: 4,
  },
  bottomButton: {
    flex: 1,
    borderRadius: 12,
  },
});

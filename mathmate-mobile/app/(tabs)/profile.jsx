import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Divider,
  Icon,
  RadioButton,
  Switch,
  Text,
  useTheme,
} from 'react-native-paper';
import Stats from '../../components/profile/Stats';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppBar from '../../components/ui/AppBar';
import AppText from '../../components/ui/AppText';
import { useThemeStore } from '../../store/themeStore';

const settingsConfig = [
  {
    id: 'notifications',
    title: 'Push Notifications',
    subtitle: 'Get notified about new features and updates',
    type: 'toggle',
    stateKey: 'notifications',
    icon: 'bell',
  },
  {
    id: 'language',
    title: 'Language',
    subtitle: 'English (US)',
    type: 'navigation',
    icon: 'translate',
  },
  {
    id: 'help',
    title: 'Help & Support',
    subtitle: 'Get help and contact support',
    type: 'navigation',
    icon: 'help-circle',
  },
  {
    id: 'history',
    title: 'Question History',
    subtitle: 'View your solved math problems',
    type: 'navigation',
    icon: 'history',
  },
  {
    id: 'about',
    title: 'About MathMate',
    subtitle: 'Version 1.0.0',
    type: 'navigation',
    icon: 'information',
  },
];

export default function ProfileScreen() {
  const [settings, setSettings] = useState({
    notifications: true,
  });

  const styles = profileStyle();
  const hasImage = true;
  const theme = useTheme();
  const { mode, setMode } = useThemeStore();
  const router = useRouter();

  const navigateTo = (link) => {
    console.log(link);
    router.push(link);
  };

  const handleThemeChange = (newMode) => {
    setMode(newMode);
  };

  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      <AppBar title='Profile' titleCenter titleBold />
      <ScreenWrapper scrollable>
        {/* User Info Section */}
        <Card
          style={[styles.userCard, { backgroundColor: theme.colors.surface }]}
          elevation={2}
        >
          <Card.Content style={styles.userCardContent}>
            <Avatar.Image
              size={80}
              source={require('../../assets/images/math_image.png')}
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <Text
                variant='headlineSmall'
                style={{ color: theme.colors.onSurface, marginBottom: 4 }}
              >
                Math Enthusiast
              </Text>
              <Text
                variant='bodyMedium'
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                Learning and solving since 2024
              </Text>
              <Text
                variant='bodySmall'
                style={{ color: theme.colors.onSurfaceVariant, marginTop: 4 }}
              >
                Premium Member
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Stats Section */}
        <Stats />

        {/* Theme Selection Section */}
        <Card
          style={[styles.themeCard, { backgroundColor: theme.colors.surface }]}
          elevation={2}
        >
          <Card.Content>
            <Text
              variant='titleLarge'
              style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
            >
              Appearance
            </Text>
            <Text
              variant='bodyMedium'
              style={[
                styles.sectionSubtitle,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              Choose your preferred theme
            </Text>

            <View style={styles.themeOptions}>
              <RadioButton.Group onValueChange={handleThemeChange} value={mode}>
                <View style={styles.themeOption}>
                  <RadioButton.Item
                    label='System'
                    value='system'
                    labelStyle={{ color: theme.colors.onSurface }}
                    color={theme.colors.primary}
                  />
                  <Text
                    variant='bodySmall'
                    style={{
                      color: theme.colors.onSurfaceVariant,
                      marginLeft: 56,
                    }}
                  >
                    Follows your device settings
                  </Text>
                </View>

                <View style={styles.themeOption}>
                  <RadioButton.Item
                    label='Light'
                    value='light'
                    labelStyle={{ color: theme.colors.onSurface }}
                    color={theme.colors.primary}
                  />
                  <Text
                    variant='bodySmall'
                    style={{
                      color: theme.colors.onSurfaceVariant,
                      marginLeft: 56,
                    }}
                  >
                    Clean and bright interface
                  </Text>
                </View>

                <View style={styles.themeOption}>
                  <RadioButton.Item
                    label='Dark'
                    value='dark'
                    labelStyle={{ color: theme.colors.onSurface }}
                    color={theme.colors.primary}
                  />
                  <Text
                    variant='bodySmall'
                    style={{
                      color: theme.colors.onSurfaceVariant,
                      marginLeft: 56,
                    }}
                  >
                    Easy on the eyes
                  </Text>
                </View>
              </RadioButton.Group>
            </View>
          </Card.Content>
        </Card>

        {/* Settings Section */}
        <Card
          style={[
            styles.settingsCard,
            { backgroundColor: theme.colors.surface },
          ]}
          elevation={2}
        >
          <Card.Content>
            <Text
              variant='titleLarge'
              style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
            >
              Settings
            </Text>

            {settingsConfig.map((setting) => (
              <View key={setting.id}>
                <View style={styles.settingItem}>
                  <View style={styles.settingInfo}>
                    <View style={styles.settingIcon}>
                      <Icon source={setting.icon} size={24} />
                    </View>
                    <View style={styles.settingText}>
                      <AppText
                        titleMedium
                        style={{ color: theme.colors.onSurface }}
                      >
                        {setting.title}
                      </AppText>
                      <Text
                        variant='bodySmall'
                        style={{ color: theme.colors.onSurfaceVariant }}
                      >
                        {setting.subtitle}
                      </Text>
                    </View>
                  </View>

                  {setting.type === 'toggle' ? (
                    <Switch
                      value={settings[setting.stateKey]}
                      onValueChange={() => toggleSetting(setting.stateKey)}
                      color={theme.colors.primary}
                    />
                  ) : (
                    <Button
                      mode='text'
                      onPress={() => navigateTo(setting.id)}
                      icon='chevron-right'
                      compact
                    />
                  )}
                </View>

                {setting.id !==
                  settingsConfig[settingsConfig.length - 1].id && (
                  <Divider style={styles.divider} />
                )}
              </View>
            ))}
          </Card.Content>
        </Card>

        {/* Quick Actions */}
        <Card
          style={[
            styles.actionsCard,
            { backgroundColor: theme.colors.surface },
          ]}
          elevation={2}
        >
          <Card.Content>
            <AppText
              titleLarge
              style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
            >
              Quick Actions
            </AppText>

            <View style={styles.actionButtons}>
              <Button
                mode='outlined'
                onPress={() => navigateTo('help')}
                icon='help-circle'
                style={styles.actionButton}
                contentStyle={styles.actionButtonContent}
              >
                Help
              </Button>

              <Button
                mode='outlined'
                onPress={() => navigateTo('history')}
                icon='history'
                style={styles.actionButton}
                contentStyle={styles.actionButtonContent}
              >
                History
              </Button>

              <Button
                mode='outlined'
                onPress={() => navigateTo('about')}
                icon='information'
                style={styles.actionButton}
                contentStyle={styles.actionButtonContent}
              >
                About
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <AppText
            variant='bodySmall'
            style={{
              color: theme.colors.onSurfaceVariant,
              textAlign: 'center',
            }}
          >
            MathMate Mobile v1.0.0
          </AppText>
          <AppText
            bodySmall
            style={{
              color: theme.colors.onSurfaceVariant,
              textAlign: 'center',
              marginTop: 4,
            }}
          >
            Built with ❤️ for math lovers
          </AppText>
        </View>
      </ScreenWrapper>
    </>
  );
}

const profileStyle = () =>
  StyleSheet.create({
    userCard: {
      marginBottom: 16,
      borderRadius: 16,
    },
    userCardContent: {
      padding: 20,
    },
    avatar: {
      marginBottom: 16,
    },
    userInfo: {
      alignItems: 'center',
    },
    themeCard: {
      marginBottom: 16,
      borderRadius: 16,
    },
    settingsCard: {
      marginBottom: 16,
      borderRadius: 16,
    },
    actionsCard: {
      marginBottom: 16,
      borderRadius: 16,
    },
    sectionTitle: {
      marginBottom: 8,
      fontWeight: '600',
    },
    sectionSubtitle: {
      marginBottom: 20,
    },
    themeOptions: {
      marginTop: 8,
    },
    themeOption: {
      marginBottom: 16,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16,
    },
    settingInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    settingIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(0,0,0,0.1)',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    settingText: {
      flex: 1,
    },
    divider: {
      marginVertical: 8,
    },
    actionButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 12,
    },
    actionButton: {
      flex: 1,
      borderRadius: 12,
    },
    actionButtonContent: {
      paddingVertical: 8,
    },
    versionContainer: {
      paddingVertical: 20,
      alignItems: 'center',
    },
  });

// import { useRouter } from 'expo-router';
// import { useState } from 'react';
// import { View } from 'react-native';
// import SettingItem from '../../components/profile/SettingItem';
// import Stats from '../../components/profile/Stats';
// import UserInfo from '../../components/profile/userInfo';
// import ScreenWrapper from '../../components/ScreenWrapper';
// import AppBar from '../../components/ui/AppBar';
// import AppText from '../../components/ui/AppText';
// import profileStyle from '../../style/profile.style';
// import { verticalScale } from '../../style/scaling';

// const settingsConfig = [
//   {
//     id: 'darkMode',
//     title: 'Dark Mode',
//     type: 'toggle',
//     stateKey: 'darkMode',
//   },
//   {
//     id: 'notifications',
//     title: 'Notifications',
//     type: 'toggle',
//     stateKey: 'notifications',
//   },
//   {
//     id: 'language',
//     title: 'Language',
//     type: 'navigation',
//     value: 'English',
//   },
//   {
//     id: 'help',
//     title: 'Help & Support',
//     type: 'navigation',
//   },
//   {
//     id: 'history',
//     title: 'History',
//     type: 'navigation',
//   },
// ];

// export default function ProfileScreen() {
//   const [settings, setSettings] = useState({
//     darkMode: false,
//     notifications: false,
//   });
//   const styles = profileStyle();
//   const hasImage = true;

//   const router = useRouter();
//   const navigateTo = (link) => {
//     console.log(link);
//     router.push(link);
//   };

//   return (
//     <>
//       <AppBar title='Profile' titleCenter titleBold />
//       <ScreenWrapper scrollable>
//         <UserInfo hasImage={hasImage} />
//         <Stats />
//         <View style={{ marginTop: verticalScale(20) }}>
//           <AppText headlineMedium style={profileStyle.title}>
//             Settings
//           </AppText>
//           {settingsConfig.map((s) => {
//             const value = settings[s.stateKey];
//             // console.log(69, s.stateKey, value);
//             return (
//               <SettingItem
//                 setting={s}
//                 settings={settings}
//                 setSettings={setSettings}
//                 key={s.id}
//                 value={value}
//                 navigateTo={navigateTo}
//               />
//             );
//           })}
//         </View>
//       </ScreenWrapper>
//     </>
//   );
// }

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
  Modal,
  FlatList,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../ProvideTheme';
import { themes } from '../themes';

const languages = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Hindi'];
const colorSchemes = Object.keys(themes);

export default function SettingsPage({ navigation }) {
  const { theme, themeName, setThemeName } = useTheme();

  const [language, setLanguage] = useState('English');
  const [notifications, setNotifications] = useState({
    LowAlerts: true,
    HighAlerts: true,
    Reminders: true,
    InsulinIntake: true,
  });
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [colorModalVisible, setColorModalVisible] = useState(false);

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderOptionModal = (options, selected, onSelect, visible, setVisible) => (
    <Modal visible={visible} transparent animationType="slide">
      <View style={[styles.modalOverlay, { backgroundColor: theme.modalOverlay }]}>
        <View style={[styles.modalContainer, { backgroundColor: theme.modalBackground }]}>
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => {
                  onSelect(item);
                  setVisible(false);
                }}
              >
                <Text style={[styles.modalText, { color: theme.text }]}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Profile Section */}
      <View style={[styles.profileContainer, { backgroundColor: theme.secondary, borderColor: theme.border }]}>
        <Feather name="user" size={70} color={theme.text} />
        <View style={styles.profileDetails}>
          <Text style={[styles.profileText, { color: theme.text }]}>Name: John Doe</Text>
          <Text style={[styles.profileText, { color: theme.text }]}>Doctor: Dr. Smith</Text>
          <Text style={[styles.profileText, { color: theme.text }]}>GP: Green Clinic</Text>
          <Text style={[styles.profileText, { color: theme.text }]}>NHS No: 1234567890</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary, borderColor: theme.border }]}
        onPress={() => Alert.alert('Logged out')}
      >
        <Text style={[styles.buttonText, { color: theme.text }]}>Log Out</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary, borderColor: theme.border }]}
        onPress={() => Alert.alert('Change password')}
      >
        <Text style={[styles.buttonText, { color: theme.text }]}>Change Password</Text>
      </TouchableOpacity>

      {/* Settings Section */}
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Settings</Text>

      {/* Language */}
      <View style={[styles.settingContainer, { backgroundColor: theme.secondary, borderColor: theme.border }]}>
        <Text style={[styles.settingTitle, { color: theme.text }]}>Select Language</Text>
        <TouchableOpacity onPress={() => setLanguageModalVisible(true)}>
          <Text
            style={[
              styles.settingButton,
              { backgroundColor: theme.primary, borderColor: theme.border, color: theme.text },
            ]}
          >
            {language}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Color Scheme */}
      <View style={[styles.settingContainer, { backgroundColor: theme.secondary, borderColor: theme.border }]}>
        <Text style={[styles.settingTitle, { color: theme.text }]}>Select Colour Scheme</Text>
        <TouchableOpacity onPress={() => setColorModalVisible(true)}>
          <Text
            style={[
              styles.settingButton,
              { backgroundColor: theme.primary, borderColor: theme.border, color: theme.text },
            ]}
          >
            {themeName}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notifications */}
      <View style={[styles.settingContainer, { backgroundColor: theme.secondary, borderColor: theme.border }]}>
        <Text style={[styles.settingTitle, { color: theme.text }]}>Notification Settings</Text>
        {Object.keys(notifications).map((key) => (
          <View
            key={key}
            style={[
              styles.switchRow,
              { backgroundColor: theme.primary, borderColor: theme.border },
            ]}
          >
            <Text style={{ color: theme.text }}>{key.replace(/([A-Z])/g, ' $1')}</Text>
            <Switch
              trackColor={{ false: '#767577', true: theme.switchTrack }}
              thumbColor={notifications[key] ? theme.switchBackground : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              value={notifications[key]}
              onValueChange={() => toggleNotification(key)}
            />
          </View>
        ))}
      </View>

      {/* Tutorial */}
      <View style={[styles.settingContainer, { backgroundColor: theme.secondary, borderColor: theme.border }]}>
        <Text style={[styles.settingTitle, { color: theme.text }]}>Tutorial</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home', { screen: 'Tutorial' })}>
          <Text
            style={[
              styles.settingButton,
              { backgroundColor: theme.primary, borderColor: theme.border, color: theme.text },
            ]}
          >
            Access
          </Text>
        </TouchableOpacity>
      </View>

      {/* Terms */}
      <View style={[styles.settingContainer, { backgroundColor: theme.secondary, borderColor: theme.border }]}>
        <TouchableOpacity onPress={() => Alert.alert('Terms & Conditions')}>
          <Text
            style={[
              styles.settingButton,
              { backgroundColor: theme.primary, borderColor: theme.border, color: theme.text },
            ]}
          >
            Terms and Conditions
          </Text>
        </TouchableOpacity>
      </View>

      {/* Privacy */}
      <View style={[styles.settingContainer, { backgroundColor: theme.secondary, borderColor: theme.border }]}>
        <TouchableOpacity onPress={() => Alert.alert('Privacy Settings')}>
          <Text
            style={[
              styles.settingButton,
              { backgroundColor: theme.primary, borderColor: theme.border, color: theme.text },
            ]}
          >
            Privacy Settings
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modals */}
      {renderOptionModal(languages, language, setLanguage, languageModalVisible, setLanguageModalVisible)}
      {renderOptionModal(
        colorSchemes,
        themeName,
        (scheme) => setThemeName(scheme),
        colorModalVisible,
        setColorModalVisible
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 2,
  },
  profileDetails: {
    marginLeft: 20,
  },
  profileText: {
    fontSize: 22,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 20,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  settingContainer: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
  },
  settingTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  settingButton: {
    fontSize: 22,
    paddingVertical: 5,
    borderWidth: 2,
    borderRadius: 50,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 2,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  modalContainer: {
    borderRadius: 10,
    padding: 20,
  },
  modalOption: {
    paddingVertical: 12,
  },
  modalText: {
    fontSize: 18,
  },
});

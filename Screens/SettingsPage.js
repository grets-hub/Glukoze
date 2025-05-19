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
  FlatList
} from 'react-native';
import { Feather } from '@expo/vector-icons';


const languages = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Hindi'];
const colorSchemes = ['Light', 'Dark', 'Blue', 'Green', 'Pink', 'Purple'];

export default function SettingsPage({ navigation }) {
  const [language, setLanguage] = useState('English');
  const [colorScheme, setColorScheme] = useState('Light');
  const [notifications, setNotifications] = useState({
    lowAlerts: true,
    highAlerts: true,
    reminders: true,
    insulinIntake: true,
  });
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [colorModalVisible, setColorModalVisible] = useState(false);

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderOptionModal = (options, selected, onSelect, visible, setVisible) => (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
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
                <Text style={styles.modalText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Feather name="user" size={64} color="#4CAF50" />
        <Text style={styles.profileText}>Name: John Doe</Text>
        <Text style={styles.profileText}>Doctor: Dr. Smith</Text>
        <Text style={styles.profileText}>GP: Green Clinic</Text>
        <Text style={styles.profileText}>NHS Number: 123-456-789</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Logged out')}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Change password')}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>

      {/* Settings Section */}
      <Text style={styles.sectionTitle}>Settings</Text>

      {/* Language */}
      <View style={styles.settingContainer}>
        <Text style={styles.settingTitle}>Select Language</Text>
        <TouchableOpacity onPress={() => setLanguageModalVisible(true)}>
          <Text style={styles.settingButton}>{language}</Text>
        </TouchableOpacity>
      </View>

      {/* Color Scheme */}
      <View style={styles.settingContainer}>
        <Text style={styles.settingTitle}>Select Colour Scheme</Text>
        <TouchableOpacity onPress={() => setColorModalVisible(true)}>
          <Text style={styles.settingButton}>{colorScheme}</Text>
        </TouchableOpacity>
      </View>

      {/* Notifications */}
      <View style={styles.settingContainer}>
        <Text style={styles.settingTitle}>Notification Settings</Text>
        {Object.keys(notifications).map((key) => (
          <View key={key} style={styles.switchRow}>
            <Text>{key.replace(/([A-Z])/g, ' $1')}</Text>
            <Switch
              value={notifications[key]}
              onValueChange={() => toggleNotification(key)}
            />
          </View>
        ))}
      </View>

      {/* Tutorial */}
      <View style={styles.settingContainer}>
        <Text style={styles.settingTitle}>Tutorial</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home', {screen: 'Tutorial',})
        }>
          <Text style={styles.settingButton}>Access</Text>
        </TouchableOpacity>
      </View>

      {/* Terms */}
      <View style={styles.settingContainer}>
        <TouchableOpacity onPress={() => Alert.alert('Terms & Conditions')}>
          <Text style={styles.settingButton}>Terms and Conditions</Text>
        </TouchableOpacity>
      </View>

      {/* Privacy */}
      <View style={styles.settingContainer}>
        <TouchableOpacity onPress={() => Alert.alert('Privacy Settings')}>
          <Text style={styles.settingButton}>Privacy Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Modals */}
      {renderOptionModal(languages, language, setLanguage, languageModalVisible, setLanguageModalVisible)}
      {renderOptionModal(colorSchemes, colorScheme, setColorScheme, colorModalVisible, setColorModalVisible)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
  },
  profileText: {
    fontSize: 16,
    marginTop: 4,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  settingContainer: {
    marginBottom: 20,
  },
  settingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  settingButton: {
    fontSize: 16,
    color: '#2196F3',
    paddingVertical: 6,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  modalContainer: {
    backgroundColor: '#fff',
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

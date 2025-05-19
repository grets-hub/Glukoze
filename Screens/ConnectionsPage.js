import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function ConnectionsPage() {
  const [deviceInfo] = useState({
    name: 'GlucoPro X200',
    id: 'GPX200-98A7',
    status: 'Connected',
  });

  const handleAction = (action) => {
    Alert.alert(`${action}`, `${action} action triggered.`);
  };

  const uploadData = () => {
    // Simulated upload
    Alert.alert('Upload', 'Your data has been uploaded to the healthcare system.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Device Info Container */}
      <View style={styles.deviceContainer}>
        <Text style={styles.deviceTitle}>Connected Device:</Text>
        <View style={styles.deviceRow}>
          <Image
            source={{ uri: 'https://via.placeholder.com/80' }} // placeholder image
            style={styles.deviceImage}
          />
          <View style={styles.deviceDetails}>
            <Text style={styles.deviceText}>Name: {deviceInfo.name}</Text>
            <Text style={styles.deviceText}>ID: {deviceInfo.id}</Text>
            <Text style={styles.deviceText}>Status: {deviceInfo.status}</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonsContainer}>
        {['New Device', 'Share Devices', 'Direct Watch', 'Sync Devices'].map((label) => (
          <TouchableOpacity
            key={label}
            style={styles.actionButton}
            onPress={() => handleAction(label)}
          >
            <Text style={styles.actionButtonText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Upload Button */}
      <TouchableOpacity style={styles.uploadButton} onPress={uploadData}>
        <Text style={styles.uploadButtonText}>Upload Data</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  deviceContainer: {
    width: width - 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
  },
  deviceTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  deviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceImage: {
    width: 80,
    height: 80,
    marginRight: 20,
    borderRadius: 10,
    backgroundColor: '#ccc',
  },
  deviceDetails: {
    flex: 1,
  },
  deviceText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonsContainer: {
    width: '100%',
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  uploadButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 15,
    marginTop: 20,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

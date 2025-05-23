import React, { useState }from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Image,ScrollView,Dimensions,Alert } from 'react-native';

const { width } = Dimensions.get('window');

/**
 * Collects data and has an upload data button that uploads data to the healthcare professionals
 * @returns alerts and data on the device
 */
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
    Alert.alert('Upload', 'Your data has been uploaded to the healthcare system.');
  };

  return (
  <View style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.deviceContainer}>
        <Text style={styles.deviceTitle}>Connected Device:</Text>
        <View style={styles.deviceRow}>
          <Image
            source={{ uri: 'https://via.placeholder.com/80' }}
            style={styles.deviceImage}
          />
          <View style={styles.deviceDetails}>
            <Text style={styles.deviceText}>Name: {deviceInfo.name}</Text>
            <Text style={styles.deviceText}>ID: {deviceInfo.id}</Text>
            <Text style={styles.deviceText}>Status: {deviceInfo.status}</Text>
          </View>
        </View>
      </View>

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

      <TouchableOpacity style={styles.uploadButton} onPress={uploadData}>
        <Text style={styles.uploadButtonText}>Upload Data</Text>
      </TouchableOpacity>
    </ScrollView>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F6F8',
  },
  deviceContainer: {
    width: width - 0,
    backgroundColor: '#AACFFD',
    padding: 20,
    marginBottom: 30,
    marginLeft: -20,
  },
  deviceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#212227',
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
    backgroundColor: '#fff',
  },
  deviceDetails: {
    flex: 1,
  },
  deviceText: {
    fontSize: 22,
    marginBottom: 8,
    color: '#212227',
  },
  buttonsContainer: {
   flexDirection: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#65C6CD',
    paddingVertical: 15,
    paddingHorizontal: 140,
    borderRadius: 10,
    marginBottom: 40,
    alignItems: 'center',
     borderColor: '#212227',
    borderWidth: 2,
  },
  actionButtonText: {
    color: '#212227',
    fontSize: 22,
    fontWeight: 'bold',
  },
  uploadButton: {
    backgroundColor: '#65C6CD',
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 15,
    marginTop: 20,
  },
  uploadButtonText: {
    color: '#212227',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
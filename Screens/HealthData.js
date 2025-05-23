import React, {useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, ScrollView, Dimensions } from 'react-native';
import {initialHealthData } from './DummyData/DummyHealthData';

const { width } = Dimensions.get('window');

/**
 * HealthData page makes the functional buttons, 
 * takes the health data from an input and saves
 * @returns saved data 
 */
export default function HealthData() {
  const [healthData, setHealthData] = useState(initialHealthData);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState('');
  const [inputValue, setInputValue] = useState('');

  const openEditModal = (field) => {
    setCurrentField(field);
    setInputValue(healthData[field]);
    setModalVisible(true);
  };

  const handleSave = () => {
    setHealthData({ ...healthData, [currentField]: inputValue });
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Health Data</Text>

      {Object.entries(healthData).map(([key, value]) => (
        <View style={styles.card} key={key}>
          <Text style={styles.cardTitle}>{formatFieldName(key)}</Text>
          <Text style={styles.cardValue}>{value}</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => openEditModal(key)}
          >
            <Text style={styles.editButtonText}>Edit {formatFieldName(key)}</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Modal for editing */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit {formatFieldName(currentField)}</Text>
            <TextInput
              style={styles.input}
              value={inputValue}
              onChangeText={setInputValue}
              placeholder={`Enter ${formatFieldName(currentField)}...`}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={[styles.modalButton, styles.cancelButton]}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave} style={[styles.modalButton, styles.saveButton]}>
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

// Utility to make field name readable
const formatFieldName = (field) => {
  switch (field) {
    case 'exercise': return 'Exercise';
    case 'food': return 'Carbs';
    case 'weight': return 'Weight';
    case 'bloodPressure': return 'Blood Pressure';
    default: return field;
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F4F6F8',
    alignItems: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    marginLeft: -10,
    marginRight: 'auto',
    color: '#212227',
  },
  card: {
    width: width - 0,
    backgroundColor: '#AACFFD',
    padding: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
    color: '#212227',
  },
  cardValue: {
    fontSize: 22,
    marginBottom: 10,
    color: '#333',
    color: '#212227',
  },
  editButton: {
    backgroundColor: '#65C6CD',
    paddingVertical: 5,
    borderRadius: 20,
    alignItems: 'center',
    borderColor: '#212227',
    borderWidth: 2,
  },
  editButtonText: {
    color: '#212227',
    fontWeight: 'bold',
    fontSize: 22,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(31, 30, 30, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width - 40,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#212227',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

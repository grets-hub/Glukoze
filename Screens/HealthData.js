import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
import { initialHealthData } from './DummyData/DummyHealthData';

const { width } = Dimensions.get('window');

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
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    width: width - 40,
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width - 40,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
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

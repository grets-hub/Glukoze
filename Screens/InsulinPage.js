import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Dimensions,
} from 'react-native';
import { insulinData } from './DummyData/DummyInsulinData';

const { width } = Dimensions.get('window');

export default function InsulinPage() {
  // State for modal visibility and current modal type
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [inputValue, setInputValue] = useState('');

  const openModal = (type) => {
    setModalType(type);
    setInputValue(''); // reset input when opening modal
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSave = () => {
    // You can implement saving logic here
    // For now, just close the modal
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Insulin</Text>
      <View style={styles.infoContainer}>
        <View style={styles.imagePlaceholder}>
          <Text style={{ color: '#aaa' }}>Image</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.dataText}>Bolus/day: {insulinData.bolusPerDay}</Text>
          <Text style={styles.dataText}>Basal/day: {insulinData.basalPerDay}</Text>
          <Text style={styles.dataText}>Premixed/day: {insulinData.premixedPerDay}</Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => openModal('Daily Log')}>
          <Text style={styles.buttonText}>Daily Log</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => openModal('Bolus/day')}>
          <Text style={styles.buttonText}>Bolus/day</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => openModal('Basal/day')}>
          <Text style={styles.buttonText}>Basal/day</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => openModal('Premixed/day')}>
          <Text style={styles.buttonText}>Premixed/day</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for input */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add {modalType}</Text>
            <TextInput
              style={styles.input}
              placeholder={`Enter ${modalType} data`}
              keyboardType="numeric"
              value={inputValue}
              onChangeText={setInputValue}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={closeModal} style={[styles.modalButton, styles.cancelButton]}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave} style={[styles.modalButton, styles.saveButton]}>
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F6F8',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
    marginLeft: -300,
  },
  infoContainer: {
    flexDirection: 'row',
    width: width - 0,
    backgroundColor: '#AACFFD',
    padding: 20,
    marginBottom: 30,
    marginLeft: -20,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#eee',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  dataContainer: {
    flex: 1,
  },
  dataText: {
    fontSize: 22,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#65C6CD',
    paddingVertical: 15,
    paddingHorizontal: 140,
    borderRadius: 10,
    marginBottom: 20,
    borderColor: '#212227',
    borderWidth: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
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
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 5,
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

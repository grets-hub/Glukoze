import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Dummy glucose value for display
const glucoseReading = 180; // Change this to test color

// Function to get color based on glucose level
const getColorForGlucose = (value) => {
  if (value < 70 || value > 180) return '#f44336'; // red = bad
  if (value >= 140 && value <= 180) return '#ffeb3b'; // yellow = caution
  return '#4CAF50'; // green = good
};

export default function HomePage() {
  const bgColor = getColorForGlucose(glucoseReading);

  return (
    <View style={styles.container}>
      <View style={[styles.glucoseBox, { backgroundColor: bgColor }]}>
        <Text style={styles.glucoseText}>Glucose Level</Text>
        <Text style={styles.glucoseValue}>{glucoseReading} mg/dL</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Log Food Intake</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Log Insulin Dose</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  glucoseBox: {
    width: '100%',
    padding: 30,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
    elevation: 2,
  },
  glucoseText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  glucoseValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import {Feather } from '@expo/vector-icons';
import {LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const glucoseReading = 8.5;
const glucoseTrend = 'flat';
const sensorTimeLeft = 48;

/**
 * HomePage displays the glucose level
 * @param {getColorForGlucose} value 
 * @returns the colour of the banner based on the numbers 
 * aswell as all the functional buttons
 */

const getColorForGlucose = (value) => {
    if (value < 3.0 || value > 12.0) return '#f44336';
    if (value >= 3.0 && value <= 5.0) return '#F1F5A3';
    if (value >= 8.0 && value <= 12.0) return '#F1F5A3';
    return '#4CAF50';
  };

const getTrendIcon = (trend) => {
  switch (trend) {
    case 'up': return 'arrow-up';
    case 'down': return 'arrow-down';
    default: return 'arrow-right';
  }
};

export default function HomePage({ navigation }) {
  const bgColor = getColorForGlucose(glucoseReading);
  const trendIcon = getTrendIcon(glucoseTrend);
  const sensorPercentage = Math.min((sensorTimeLeft / 168) * 100, 100);

  return (
    <View style={styles.container}>
      <View style={[styles.glucoseBox, { backgroundColor: bgColor }]}>
        <Text style={styles.glucoseLabel}>Glucose Level</Text>
        <View style={styles.glucoseRow}>
          <Text style={styles.glucoseValue}>{glucoseReading} mmoL/L</Text>
          <Feather name={trendIcon} size={28} color="#212227" style={{ marginLeft: 8 }} />
        </View>
      </View>

      <TouchableOpacity
        style={styles.statsButton}
        onPress={() => navigation.navigate('Stats')}
      >
        <Text style={styles.statsButtonText}>Go To Stats</Text>
      </TouchableOpacity>

      <View style={styles.sectionBox}>
        <Text style={styles.sectionTitle}>Insulin</Text>
        <TouchableOpacity
          style={styles.sectionButton}
          onPress={() => navigation.navigate('Insulin')}
        >
          <Text style={styles.sectionButtonText}>Dosages</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionBox}>
        <Text style={styles.sectionTitle}>Food</Text>
        <TouchableOpacity
          style={styles.sectionButton}
          onPress={() => navigation.navigate('HealthData')}
        >
          <Text style={styles.sectionButtonText}>Edit Intake</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sensorBox}>
        <Text style={styles.sectionTitle}>Sensor Time Left:</Text>
        <Text style={styles.sensorTimeText}>{sensorTimeLeft} hours</Text>

        <View style={styles.markerLineContainer}>
          <View
            style={[
              styles.markerLine,
              {
                left: `${sensorPercentage}%`,
                transform: [{ translateX: -1 }],
              },
            ]}
          />
        </View>

        <LinearGradient
          colors={['#f44336', '#ffeb3b', '#4CAF50']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.progressBarBackground}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 15,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F4F6F8',
  },
  glucoseBox: {
    width: width - 1,
    padding: 70,
    alignItems: 'center',
    marginBottom: 20,
  },
  glucoseLabel: {
    fontSize: 24,
    color: '#212227',
    marginBottom: 10,
  },
  glucoseRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  glucoseValue: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#212227',
  },
  statsButton: {
    backgroundColor: '#65C6CD',
    paddingVertical: 15,
    paddingHorizontal: 135,
    borderRadius: 10,
    marginBottom: 20,
    borderColor: '#212227',
    borderWidth: 2,
  },
  statsButtonText: {
    color: '#212227',
    fontSize: 22,
    fontWeight: 'bold',
  },
  sectionBox: {
    width: width - 1,
    backgroundColor: '#AACFFD',
    padding: 20,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#212227',
  },
  sectionButton: {
    backgroundColor: '#65C6CD',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderColor: '#212227',
    borderWidth: 2,
  },
  sectionButtonText: {
    color: '#212227',
    fontSize: 22,
    fontWeight: 'bold',
  },
  sensorBox: {
    width: width - 1,
    backgroundColor: '#AACFFD',
    padding: 15,
    marginTop: 2,
  },
  sensorTimeText: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
    color: '#212227',
  },
  progressBarBackground: {
    height: 14,
    width: '100%',
    borderRadius: 7,
    overflow: 'hidden',
  },
  markerLineContainer: {
    width: '100%',
    height: 6,
    marginBottom: -6,
    position: 'relative',
    justifyContent: 'flex-end',
  },
  markerLine: {
    position: 'absolute',
    height: 14,
    width: 2,
    backgroundColor: '#000',
    top: 0,
    zIndex: 2,
  },
});

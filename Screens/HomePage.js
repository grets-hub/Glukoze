import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const glucoseReading = 165;
const glucoseTrend = 'flat';
const sensorTimeLeft = 48;

const getColorForGlucose = (value) => {
  if (value < 70 || value > 180) return '#f44336'; // red
  if (value >= 140 && value <= 180) return '#ffeb3b'; // yellow
  return '#4CAF50'; // green
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
      {/* Glucose Banner */}
      <View style={[styles.glucoseBox, { backgroundColor: bgColor }]}>
        <Text style={styles.glucoseLabel}>Glucose Level</Text>
        <View style={styles.glucoseRow}>
          <Text style={styles.glucoseValue}>{glucoseReading} mmoL/L</Text>
          <Feather name={trendIcon} size={28} color="#fff" style={{ marginLeft: 8 }} />
        </View>
      </View>

      {/* Go to Stats */}
      <TouchableOpacity
        style={styles.statsButton}
        onPress={() => navigation.navigate('Stats')}
      >
        <Text style={styles.statsButtonText}>Go To Stats</Text>
      </TouchableOpacity>

      {/* Insulin Box */}
      <View style={styles.sectionBox}>
        <Text style={styles.sectionTitle}>Insulin</Text>
        <TouchableOpacity
          style={styles.sectionButton}
          onPress={() => navigation.navigate('Insulin')}
        >
          <Text style={styles.sectionButtonText}>Dosages</Text>
        </TouchableOpacity>
      </View>

      {/* Food Box */}
      <View style={styles.sectionBox}>
        <Text style={styles.sectionTitle}>Food</Text>
        <TouchableOpacity
          style={styles.sectionButton}
          onPress={() => navigation.navigate('HealthData')}
        >
          <Text style={styles.sectionButtonText}>Edit Intake</Text>
        </TouchableOpacity>
      </View>


      {/* Sensor Time Left */}
      <View style={styles.sensorBox}>
        <Text style={styles.sectionTitle}>Sensor Time Left:</Text>
        <Text style={styles.sensorTimeText}>{sensorTimeLeft} hours</Text>

        {/* Marker above bar */}
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
    backgroundColor: '#fff',
  },
  glucoseBox: {
    width: width - 5,
    padding: 80,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  glucoseLabel: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
  },
  glucoseRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  glucoseValue: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#fff',
  },
  statsButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 135,
    borderRadius: 10,
    marginBottom: 25,
  },
  statsButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionBox: {
    width: width - 10,
    backgroundColor: '#eee',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  sectionButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sensorBox: {
    width: width - 10,
    backgroundColor: '#eee',
    borderRadius: 15,
    padding: 15,
    marginTop: 2,
  },
  sensorTimeText: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
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

// StatsPage.js
import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { todaysGlucoseData } from './DummyData/DummyGlucoseData';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function StatsPage({ navigation }) {
  const glucoseReading = 8.5;
  const glucoseTrend = 'flat';

  const getColorForGlucose = (value) => {
    if (value < 3.0 || value > 12.0) return '#f44336'; // red
    if (value >= 3.0 && value <= 5.0) return '#F1F5A3'; // yellow
    if (value >= 8.0 && value <= 12.0) return '#F1F5A3';
    return '#4CAF50'; // green
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'arrow-up';
      case 'down': return 'arrow-down';
      default: return 'arrow-right';
    }
  };

  const chartData = {
    labels: todaysGlucoseData.map((point) => point.hour),
    datasets: [
      {
        data: todaysGlucoseData.map((point) => point.value),
        strokeWidth: 2,
      },
    ],
  };

  const bgColor = getColorForGlucose(glucoseReading);
  const trendIcon = getTrendIcon(glucoseTrend);

  return (
    <View style={styles.container}>
      {/* Glucose Banner */}
      <View style={[styles.glucoseBox, { backgroundColor: bgColor }]}>
        <Text style={styles.glucoseLabel}>Glucose Level</Text>
        <View style={styles.glucoseRow}>
          <Text style={styles.glucoseValue}>{glucoseReading} mmoL/L</Text>
          <Feather name={trendIcon} size={28} color="#212227" style={{ marginLeft: 8 }} />
        </View>
      </View>

      {/* Chart Container */}
      <View style={styles.chartContainer}>
        <LineChart
          data={chartData}
          width={width - 0}
          height={260}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0.0,
            color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: '#4CAF50',
            },
          }}
          bezier
        />
        <Text style={styles.chartTitle}>Today's Blood Glucose</Text>
      </View>

      {/* Button to view past week */}
      <TouchableOpacity
        style={styles.statsButton}
        onPress={() => navigation.navigate('PreWeeksPage')}
      >
        <Text style={styles.statsButtonText}>View Previous Weeks</Text>
      </TouchableOpacity>
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
  chartContainer: {
    backgroundColor: '#AACFFD',
    paddingVertical: 10,
    paddingHorizontal: 50,
    marginBottom: 100,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 'auto',
    color: '#212227',
  },
  statsButton: {
    backgroundColor: '#65C6CD',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: '#212227',
    borderWidth: 2,
  },
  statsButtonText: {
    color: '#212227',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { todaysGlucoseData } from './DummyData/DummyGlucoseData';

const { width } = Dimensions.get('window');

export default function StatsPage({ navigation }) {
  const glucoseReading = 165;

  const chartData = {
    labels: todaysGlucoseData.map((point) => point.hour),
    datasets: [
      {
        data: todaysGlucoseData.map((point) => point.value),
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View style={styles.container}>
      {/* Glucose Banner */}
      <View style={styles.glucoseBox}>
        <Text style={styles.glucoseLabel}>Glucose Level</Text>
        <Text style={styles.glucoseValue}>{glucoseReading} mmoL/L</Text>
      </View>

      {/* Chart Container */}
      <View style={styles.chartContainer}>
        <LineChart
          data={chartData}
          width={width - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: '#4CAF50',
            },
          }}
          bezier
          style={{
            borderRadius: 10,
          }}
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
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  glucoseBox: {
    width: '100%',
    backgroundColor: '#ffeb3b',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  glucoseLabel: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
  },
  glucoseValue: {
    fontSize: 42,
    fontWeight: 'bold',
  },
  chartContainer: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 30,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  statsButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  statsButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

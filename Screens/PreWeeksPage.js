import React from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import {LineChart, BarChart } from 'react-native-chart-kit';
import {lastWeekData, lastWeekBarData, lastMonthData, lastMonthBarData, lastYearData, lastYearBarData } from './DummyData/DummyGlucoseDataPreWeeks'; // Import your dummy data

const { width } = Dimensions.get('window');

/**
 * Takes in the graph data from a js file
 * @returns the rendered graphs
 */

export default function PreWeeksPage() {
  const chartConfig = {
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
  };

  const renderSection = (title, lineData, barData) => (
    <View style={styles.sectionContainer} key={title}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <LineChart
        data={lineData}
        width={width - 0}
        height={260}
        chartConfig={chartConfig}
        bezier
        style={styles.chartStyle}
      />

      <BarChart
        data={barData}
        width={width - 0}
        height={260}
        chartConfig={chartConfig}
        style={styles.chartStyle}
        fromZero
        showValuesOnTopOfBars
      />
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={true}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      {renderSection('Last Week', lastWeekData, lastWeekBarData)}
      {renderSection('Last Month', lastMonthData, lastMonthBarData)}
      {renderSection('Last Year', lastYearData, lastYearBarData)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  sectionContainer: {
    marginVertical: 20,
    backgroundColor: '#AACFFD',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  chartStyle: {
    borderRadius: 10,
    marginBottom: 20,
  },
});

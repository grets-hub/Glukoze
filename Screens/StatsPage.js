import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StatsPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stats Page</Text>
      <Text>Here you can display your stats data.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

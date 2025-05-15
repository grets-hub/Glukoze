import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TutorialPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Tutorial</Text>
      <Text style={styles.body}>
        Here's a quick guide on how to use the Glukoze app. You can add your own content here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
  },
});

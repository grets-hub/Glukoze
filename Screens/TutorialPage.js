import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function TutorialPage() {
  const handleWatchTutorial = () => {
    Alert.alert('Watch Tutorial', 'This would play the tutorial video.');
  };

  const handleWalkthrough = () => {
    Alert.alert('Walkthrough', 'This would start a walkthrough of the app.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Tutorial Video Container */}
      <View style={styles.videoContainer}>
        <Text style={styles.videoTitle}>Tutorial Video</Text>
        <View style={styles.videoPlaceholder}>
          <Image
            source={{ uri: 'https://via.placeholder.com/320x180.png?text=Video+Placeholder' }}
            style={styles.videoImage}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleWatchTutorial}>
          <Text style={styles.buttonText}>Watch Tutorial</Text>
        </TouchableOpacity>
      </View>

      {/* Walkthrough Button */}
      <TouchableOpacity style={styles.walkthroughButton} onPress={handleWalkthrough}>
        <Text style={styles.walkthroughButtonText}>Walkthrough</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  videoContainer: {
    width: width - 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  videoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  videoPlaceholder: {
    width: '100%',
    height: 180,
    marginBottom: 15,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  videoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  walkthroughButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 12,
  },
  walkthroughButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

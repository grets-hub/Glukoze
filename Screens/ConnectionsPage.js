import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Alert, Dimensions, ScrollView } from 'react-native';
import { TourGuideProvider, TourGuideZone, useTourGuideController } from 'react-native-tourguide';

const { width } = Dimensions.get('window');

// Adjust this to match your header height + status bar height
const HEADER_HEIGHT = 80;
const STATUS_BAR_HEIGHT = 24;
const VERTICAL_OFFSET = HEADER_HEIGHT + STATUS_BAR_HEIGHT;

function TutorialContent() {
  const { start } = useTourGuideController();

  const handleWatchTutorial = () => {
    Alert.alert('Watch Tutorial', 'This would play the tutorial video.');
  };

  const handleWalkthrough = () => {
    setTimeout(() => {
      start(); // Start after layout settles
    }, 500);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Step 1: Video Section */}
        <TourGuideZone
          zone={1}
          text="This is the tutorial video where you can learn how to use the app."
        >
          <View style={styles.videoContainer}>
            <Text style={styles.videoTitle}>Tutorial Video</Text>
            <View style={styles.videoPlaceholder}>
              <Image
                source={{
                  uri: 'https://via.placeholder.com/320x180.png?text=Video+Placeholder',
                }}
                style={styles.videoImage}
              />
            </View>
          </View>
        </TourGuideZone>

        {/* Step 2: Watch Tutorial Button */}
        <TourGuideZone
          zone={2}
          text="Tap here to watch the full tutorial video."
        >
          <View>
            <TouchableOpacity style={styles.button} onPress={handleWatchTutorial}>
              <Text style={styles.buttonText}>Watch Tutorial</Text>
            </TouchableOpacity>
          </View>
        </TourGuideZone>

        {/* Step 3: Walkthrough Button */}
        <TourGuideZone
          zone={3}
          text="Tap here to restart the walkthrough anytime."
        >
          <View>
            <TouchableOpacity style={styles.walkthroughButton} onPress={handleWalkthrough}>
              <Text style={styles.walkthroughButtonText}>Walkthrough</Text>
            </TouchableOpacity>
          </View>
        </TourGuideZone>
      </ScrollView>
    </View>
  );
}

// Custom tooltip component
function CustomTooltip({ isFirstStep, isLastStep, handleNext, handlePrev, handleStop, currentStep }) {
  return (
    <View style={styles.tooltipContainer}>
      <Text style={styles.tooltipText}>{currentStep.text}</Text>

      <View style={styles.tooltipButtons}>
        {!isFirstStep && (
          <TouchableOpacity style={styles.tooltipNavButton} onPress={handlePrev}>
            <Text style={styles.tooltipNavText}>Back</Text>
          </TouchableOpacity>
        )}

        {!isLastStep ? (
          <TouchableOpacity style={styles.tooltipNavButton} onPress={handleNext}>
            <Text style={styles.tooltipNavText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.tooltipNavButton} onPress={handleStop}>
            <Text style={styles.tooltipNavText}>Done</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default function TutorialPage() {
  return (
    <TourGuideProvider
      tooltipComponent={CustomTooltip}
      borderRadius={16}
      backdropColor="rgba(0, 0, 0, 0.6)"
      verticalOffset={VERTICAL_OFFSET}
    >
      <TutorialContent />
    </TourGuideProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F4F6F8',
    alignItems: 'center',
  },
  videoContainer: {
    width: width,
    backgroundColor: '#AACFFD',
    padding: 30,
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
    backgroundColor: '#fff',
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
    backgroundColor: '#65C6CD',
    paddingVertical: 18,
    paddingHorizontal: 120,
    borderRadius: 12,
    borderColor: '#212227',
    borderWidth: 2,
    marginBottom: 24,
  },
  buttonText: {
    color: '#212227',
    fontSize: 22,
    fontWeight: 'bold',
  },
  walkthroughButton: {
    backgroundColor: '#65C6CD',
    paddingVertical: 18,
    paddingHorizontal: 128,
    borderRadius: 12,
    borderColor: '#212227',
    borderWidth: 2,
  },
  walkthroughButtonText: {
    color: '#212227',
    fontSize: 22,
    fontWeight: 'bold',
  },
  tooltipContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    maxWidth: width - 40,
    borderColor: '#212227',
    borderWidth: 2,
  },
  tooltipText: {
    fontSize: 18,
    color: '#212227',
    fontWeight: '500',
    marginBottom: 12,
  },
  tooltipButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  tooltipNavButton: {
    marginLeft: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#65C6CD',
    borderRadius: 8,
    borderColor: '#212227',
    borderWidth: 1,
  },
  tooltipNavText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212227',
  },
});

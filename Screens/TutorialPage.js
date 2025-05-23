import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Alert, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import {TourGuideProvider, TourGuideZone, useTourGuideController } from 'react-native-tourguide';
import {useSafeAreaInsets, SafeAreaProvider } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

/**
 * Functions are to get the walkthroughs and tutorials on the screen
 * @returns Functional Buttons, a working walkthrough
 */
function TutorialContent() {
  const { start, isTourActive } = useTourGuideController();

  const handleWatchTutorial = () => {
    Alert.alert('Watch Tutorial', 'This would play the tutorial video.');
  };

  const handleWalkthrough = () => {
    start();
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { paddingTop: 20 }]}
      scrollEnabled={!isTourActive}
    >
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

      <TourGuideZone zone={2} text="Tap here to watch the full tutorial video.">
        <TouchableOpacity style={styles.button} onPress={handleWatchTutorial}>
          <Text style={styles.buttonText}>Watch Tutorial</Text>
        </TouchableOpacity>
      </TourGuideZone>

      <TourGuideZone zone={3} text="Tap here to restart the walkthrough anytime.">
        <TouchableOpacity style={styles.walkthroughButton} onPress={handleWalkthrough}>
          <Text style={styles.walkthroughButtonText}>Walkthrough</Text>
        </TouchableOpacity>
      </TourGuideZone>
    </ScrollView>
  );
}

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

function TutorialPageInner() {
  const insets = useSafeAreaInsets();

  return (
    <TourGuideProvider
      tooltipComponent={CustomTooltip}
      borderRadius={10}
      backdropColor="rgba(0, 0, 0, 0.6)"
      verticalOffset={insets.top}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F6F8' }}>
        <TutorialContent />
      </SafeAreaView>
    </TourGuideProvider>
  );
}

export default function TutorialPage() {
  return (
    <SafeAreaProvider>
      <TutorialPageInner />
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F6F8',
    alignItems: 'center',
  },
  videoContainer: {
    width: width,
    backgroundColor: '#AACFFD',
    padding: 30,
    marginBottom: 40,
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
    maxWidth: width - 0,
    borderColor: '#212227',
    borderWidth: 2,
    marginBottom: 10,
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

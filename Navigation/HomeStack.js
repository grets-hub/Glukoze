import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from '../Screens/HomePage';
import InsulinPage from '../Screens/InsulinPage';
import StatsPage from '../Screens/StatsPage';
import TutorialPage from '../Screens/TutorialPage';
import PreWeeksPage from '../Screens/PreWeeksPage';

import TabsHeader from './TabsHeader';
import { View } from 'react-native';

const Stack = createNativeStackNavigator();

/**
 * Takes the navigation stack and ceates another stack navigation that doesnt use root navigation. 
 * @param {object} Component 
 * @returns the component to different screens
 */
function WithHeader(Component) {
  return function WrappedComponent(props) {
    return (
      <View style={{ flex: 1 }}>
        <TabsHeader />
        <Component {...props} />
      </View>
    );
  };
}

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomePage" component={WithHeader(HomePage)} />
      <Stack.Screen name="Insulin" component={WithHeader(InsulinPage)} />
      <Stack.Screen name="Stats" component={WithHeader(StatsPage)} />
      <Stack.Screen name="Tutorial" component={WithHeader(TutorialPage)} />
      <Stack.Screen name="PreWeeksPage" component={WithHeader(PreWeeksPage)} />
    </Stack.Navigator>
  );
}

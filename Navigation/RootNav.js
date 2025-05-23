import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNav from './TabNav';
import TutorialPage from '../Screens/TutorialPage';

const Stack = createNativeStackNavigator();

/**
 * 
 * @returns the tabs and screens in the stack
 */
export default function RootNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNav} />
      <Stack.Screen name="Tutorial" component={TutorialPage} />
    </Stack.Navigator>
  );
}

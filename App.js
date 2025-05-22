import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNav from './Navigation/RootNav';
import { TourGuideProvider } from 'react-native-tourguide';
import { ThemeProvider } from './ProvideTheme';

export default function App() {
  return (
    <TourGuideProvider>
      <ThemeProvider>
        <NavigationContainer>
          <RootNav />
        </NavigationContainer>
      </ThemeProvider>
    </TourGuideProvider>
  );
}

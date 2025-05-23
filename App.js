import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNav from './Navigation/RootNav';
import { TourGuideProvider } from 'react-native-tourguide';
import { ThemeProvider } from './ProvideTheme';

//function that roots the navigation screens
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

/**Most of the code was helped for debugging and other bits by 
 * OpenAI, 2025. ChatGPT (May 23 version) [online].
 * Available at: https://chat.openai.com/ [Accessed 23 May 2025].
 */
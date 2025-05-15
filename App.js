import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNav from './Navigation/RootNav';

export default function App() {
  return (
    <NavigationContainer>
      <RootNav />
    </NavigationContainer>
  );
}

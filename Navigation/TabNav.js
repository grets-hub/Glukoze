import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import HealthData from '../Screens/HealthData';
import ConnectionsPage from '../Screens/ConnectionsPage';
import SettingsPage from '../Screens/SettingsPage';
import HomeStack from './HomeStack';
import TabsHeader from './TabsHeader';

const Tab = createBottomTabNavigator();

function ScreenWithHeader(Component) {
  return function WrappedScreen(props) {
    return (
      <View style={{ flex: 1 }}>
        <TabsHeader />
        <Component {...props} />
      </View>
    );
  };
}

export default function TabNav() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          const icons = {
            Home: 'home',
            HealthData: 'clipboard',
            Upload: 'upload-cloud',
            Settings: 'settings',
          };
          return <Feather name={icons[route.name]} size={30} color={color} style={{
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,}} />;
        },
        tabBarActiveTintColor: '#212227',
        tabBarInactiveTintColor: '#212227',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.label,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="HealthData" component={ScreenWithHeader(HealthData)} />
      <Tab.Screen name="Upload" component={ScreenWithHeader(ConnectionsPage)} />
      <Tab.Screen name="Settings" component={ScreenWithHeader(SettingsPage)} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#ACD3D3',
    height: 70,
    borderTopColor: '#ccc',
    borderTopWidth: 0.5,
  },
  label: {
    fontSize: 15,
    marginBottom: 1,
    fontWeight: 'bold',
  },
});
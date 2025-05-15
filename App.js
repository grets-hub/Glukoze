import React from 'react';
import { Feather } from '@expo/vector-icons';
import { NavigationContainer, useNavigationState} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {View, Text, TouchableOpacity, StyleSheet,} from 'react-native';

import ConnectionsPage from './Screens/ConnectionsPage';
import HomePage from './Screens/HomePage';
import SettingsPage from './Screens/SettingsPage';
import HealthData from './Screens/HealthData';
import TutorialPage from './Screens/TutorialPage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TAB_SCREENS = ['Home', 'HealthData', 'Upload', 'Settings'];

// Bottom Tabs
function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          const icons = {
            Home: 'home',
            HealthData: 'clipboard',
            Upload: 'upload-cloud',
            Settings: 'settings',
          };
          return (
            <Feather name={icons[route.name]} size={22} color={color} />
          );
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.label,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="HealthData" component={HealthData} />
      <Tab.Screen name="Upload" component={ConnectionsPage} />
      <Tab.Screen name="Settings" component={SettingsPage} />
    </Tab.Navigator>
  );
}

// Stack Navigator
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ navigation, route }) => {
          const isHome = route.name === 'Tabs';
          const currentTab =
            navigation
              .getState()
              ?.routes.find((r) => r.name === 'Tabs')
              ?.state?.routeNames?.[
                navigation
                  .getState()
                  ?.routes.find((r) => r.name === 'Tabs')
                  ?.state?.index ?? 0
              ] ?? '';

          const showHelp = currentTab === 'Home';

          return {
            header: () => (
              <View style={styles.customHeader}>
                <TouchableOpacity
                  style={styles.leftIcon}
                  onPress={() => {
                    if (showHelp) {
                      navigation.navigate('Tutorial');
                    } else {
                      navigation.goBack();
                    }
                  }}
                >
                  <Feather
                    name={showHelp ? 'help-circle' : 'arrow-left'}
                    size={24}
                    color="#fff"
                  />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Glukoze</Text>
              </View>
            ),
          };
        }}
      >
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="Tutorial" component={TutorialPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#f8f8f8',
    height: 60,
    borderTopColor: '#ccc',
    borderTopWidth: 0.5,
  },
  label: {
    fontSize: 10,
    marginBottom: 3,
  },
  customHeader: {
    backgroundColor: '#4CAF50',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
  },
  leftIcon: {
    position: 'absolute',
    left: 15,
    top: 35,
  },
  headerTitle: {
    position: 'absolute',
    right: 15,
    top: 35,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
});

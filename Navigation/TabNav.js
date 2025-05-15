import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import HomePage from '../Screens/HomePage';
import HealthData from '../Screens/HealthData';
import ConnectionsPage from '../Screens/ConnectionsPage';
import SettingsPage from '../Screens/SettingsPage';

const Tab = createBottomTabNavigator();

function TabsHeader({ navigation, routeName }) {
  const isHome = routeName === 'Home';

  return (
    <View style={styles.customHeader}>
      <TouchableOpacity
        style={styles.leftIcon}
        onPress={() => {
          if (isHome) {
            navigation.navigate('Tutorial');
          } else {
            navigation.navigate('Home');
          }
        }}
      >
        <Feather
          name={isHome ? 'help-circle' : 'arrow-left'}
          size={24}
          color="#fff"
        />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Glukoze</Text>
    </View>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ color }) => {
          const icons = {
            Home: 'home',
            HealthData: 'clipboard',
            Upload: 'upload-cloud',
            Settings: 'settings',
          };
          const iconName = icons[route.name];
          return iconName ? <Feather name={iconName} size={22} color={color} /> : null;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.label,
        header: () => (
          <TabsHeader
            navigation={navigation}
            routeName={navigation.getState().routes[navigation.getState().index].name}
          />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="HealthData" component={HealthData} />
      <Tab.Screen name="Upload" component={ConnectionsPage} />
      <Tab.Screen name="Settings" component={SettingsPage} />
    </Tab.Navigator>
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
    zIndex: 1,
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

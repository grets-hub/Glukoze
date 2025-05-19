// components/TabsHeader.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useNavigationState } from '@react-navigation/native';

export default function TabsHeader({ routeName: propRouteName}) {
  const navigation = useNavigation();
  const state = useNavigationState(state => state);

  let currentRouteName = propRouteName || '';

  try {
    if (!propRouteName) {
      const tabRoute = state.routes[state.index];
      if (tabRoute.state?.routes) {
        currentRouteName = tabRoute.state.routes[tabRoute.state.index].name;
      } else {
        currentRouteName = tabRoute.name;
      }
    }
  } catch {
    currentRouteName = '';
  }

  const isHome = currentRouteName === 'HomePage';

  const handlePress = () => {
    if (isHome) {
      navigation.navigate('Home', { screen: 'Tutorial' });
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.customHeader}>
      <TouchableOpacity style={styles.leftIcon} onPress={handlePress}>
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

const styles = StyleSheet.create({
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
});

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export function TabsHeader({ routeName }) {
  const navigation = useNavigation();
  const isHome = routeName === 'Home';
  const isTutorial = routeName === 'Tutorial';

  return (
    <View style={styles.customHeader}>
      <TouchableOpacity
        style={styles.leftIcon}
        onPress={() => {
          if (isHome) navigation.navigate('Tutorial');
          else navigation.goBack();
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
    position: 'absolute',
    right: 15,
    top: 35,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
});

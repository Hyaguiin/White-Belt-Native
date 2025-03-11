import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Horse = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Horse</Text>
      <Text style={styles.description}>Horses are majestic animals!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e9ecef',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#495057',
  },
  description: {
    fontSize: 16,
    color: '#adb5bd',
  },
});

Horse.options = {
  headerShown: false, 
};

export default Horse;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from '../../components/header/Header';
export const Home = () => {
  return (
    
    <View style={styles.container}>
      <Header></Header>
      <Text style={styles.title}>SHREK gosta de SEXO</Text>
      <Text style={styles.description}>This is the home page.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#555',
  },
});

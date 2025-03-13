// app/home.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '@/components/header/Header'; // Cabeçalho personalizado

const Home = () => {
  return (
    <>
      <Header /> {/* Seu cabeçalho personalizado */}
      <View style={styles.container}>
        <Text style={styles.title}>Home</Text>
        <Text style={styles.description}>Bem-vindo à Home!</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#343a40',
  },
  description: {
    fontSize: 16,
    color: '#6c757d',
  },
});

export default Home;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '@/components/header/Header';

const Cigar = () => {
  return (
    <>
    <Header></Header>
    <View style={styles.container}>
      <Text style={styles.title}>Cigar</Text>
      <Text style={styles.description}>Cigarros podem ser prejudiciais à saúde.</Text>
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

Cigar.options = {
  headerShown: false, // Desativa o cabeçalho apenas nesta tela
};

export default Cigar;

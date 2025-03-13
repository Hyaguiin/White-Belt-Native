import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '@/components/header/Header';

export default function Carrinho() {
  return (
    <>
    <Header/>
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho</Text>
      {/* Adicione o conteúdo do carrinho aqui */}
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    color: '#FACC15',
  },
});
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Header from '@/components/header/Header';

const usuario = {
  nome: 'Paulin',
  descricao: 'Doidin Doidin.',
  imagem: 'https://randomuser.me/api/portraits/men/32.jpg',
};

export default function Perfil() {
  return (
    <>
    <Header/>
    <View style={styles.container}>
      <Image source={{ uri: usuario.imagem }} style={styles.imagem} />
      <Text style={styles.nome}>{usuario.nome}</Text>
      <Text style={styles.descricao}>{usuario.descricao}</Text>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  imagem: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  nome: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descricao: {
    color: '#FACC15',
    fontSize: 20,    
    textAlign: 'center',
  },
});

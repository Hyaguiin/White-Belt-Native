import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const usuario = {
  nome: 'Paulin',
  descricao: 'Doidin Doidin.',
  imagem: 'https://randomuser.me/api/portraits/men/32.jpg',
};

export default function Perfil() {
  return (
    <View style={styles.container}>
      <Image source={{ uri: usuario.imagem }} style={styles.imagem} />
      <Text style={styles.nome}>{usuario.nome}</Text>
      <Text style={styles.descricao}>{usuario.descricao}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
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
    fontSize: 16,
    textAlign: 'center',
  },
});

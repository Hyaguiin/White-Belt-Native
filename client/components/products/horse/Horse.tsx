import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useCart } from '@/components/cartContext/CartContext';

const produto = {
  id: '1',
  nome: 'Cavalo Doido',
  tipo: 'Cavalo',
  preco: 4956.99,
  imagem: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSPtsmxlaf161AuUGMhpyK92PbGiLhnMv75mDirUm8lU39Sol6wOtRSh9zqfmC6J38YcXi15DlJaQW5eA4Neb5-aQ',
};

export default function Horse() {
  const { adicionarAoCarrinho } = useCart();

  return (
    <View style={styles.container}>
      <Image source={{ uri: produto.imagem }} style={styles.imagem} />
      <Text style={styles.nome}>{produto.nome}</Text>
      <Text style={styles.preco}>R$ {produto.preco.toFixed(2)}</Text>
      <Pressable
        style={({ pressed }) => [styles.botao, pressed && styles.botaoPressionado]}
        onPress={() => adicionarAoCarrinho(produto)}
      >
        <Text style={styles.botaoTexto}>Adicionar ao Carrinho</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  imagem: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  nome: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  preco: {
    color: '#FACC15',
    fontSize: 20,
    marginBottom: 20,
  },
  botao: {
    backgroundColor: '#FACC15',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  botaoPressionado: {
    opacity: 0.8,
  },
  botaoTexto: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
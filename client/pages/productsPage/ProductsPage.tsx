import React from 'react';
import { View, Text, Image, Pressable, StyleSheet, FlatList } from 'react-native';
import { useCart } from '@/components/cartContext/CartContext';
import { useNavigation } from '@react-navigation/native';
import Header from '@/components/header/Header';

const produtos = [
  {
    id: '1',
    nome: 'Charuto Imperial',
    tipo: 'Charuto',
    preco: 49.99,
    imagem: 'https://cdn-icons-png.flaticon.com/512/2762/2762885.png',
  },
  {
    id: '2',
    nome: 'Cavalo Relâmpago',
    tipo: 'Cavalo',
    preco: 1999.99,
    imagem: 'https://cdn-icons-png.flaticon.com/512/2762/2762885.png',
  },
  {
    id: '3',
    nome: 'Whisky Sombrio 1920',
    tipo: 'Whisky',
    preco: 299.9,
    imagem: 'https://cdn-icons-png.flaticon.com/512/2762/2762885.png',
  },
];

export default function ProdutoPage() {
  const { adicionarAoCarrinho } = useCart();
  const navigation = useNavigation();

  return (
    <>
    <Header></Header>
    <View style={styles.container}>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.produto}>
            <Image source={{ uri: item.imagem }} style={styles.imagem} />
            <View style={styles.infoContainer}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
              <Pressable
                style={({ pressed }) => [styles.botao, pressed && styles.botaoPressionado]}
                onPress={() => adicionarAoCarrinho(item)}
                >
                <Text style={styles.botaoTexto}>Adicionar ao Carrinho</Text>
              </Pressable>
            </View>
          </View>
        )}
        />

      <Pressable
        style={({ pressed }) => [styles.botaoCarrinho, pressed && styles.botaoPressionado]}
        onPress={() => navigation.navigate('CarrinhoProdutos')}
        >
        <Text style={styles.botaoTexto}>Ir para o Carrinho</Text>
      </Pressable>
    </View>
        </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 70,
    position: 'relative',
    top: 20
  },
  produto: {
    flexDirection: 'row',
    backgroundColor: '#111',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  imagem: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#222',
  },
  infoContainer: {
    flex: 1,
  },
  nome: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  preco: {
    color: '#FACC15',
    fontSize: 14,
    marginBottom: 10,
  },
  botao: {
    backgroundColor: '#FACC15',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
  },
  botaoCarrinho: {
    backgroundColor: '#FACC15',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  botaoPressionado: {
    opacity: 0.8,
  },
  botaoTexto: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
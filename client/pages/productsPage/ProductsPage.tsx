import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useCart } from '@/components/cartContext/CartContext';
import { useNavigation } from '@react-navigation/native';
import Header from '@/components/header/Header';
import { Produto } from '@/app/interfaces/Produtos';
import axios from 'axios';

export default function ProdutoPage() {
  const { adicionarAoCarrinho } = useCart();
  const navigation = useNavigation();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        setLoading(true);
        
        const [charutos, whiskies, cavalos] = await Promise.all([
          axios.get('http://3.133.146.147/charuto'),
          axios.get('http://3.133.146.147/whisky'),
          axios.get('http://3.133.146.147/cavalo')
        ]);

        const produtosCombinados = [
          ...charutos.data.map((p: any) => ({ ...p, tipo: "Charuto" as const })),
          ...whiskies.data.map((p: any) => ({ ...p, tipo: "Whisky" as const })),
          ...cavalos.data.map((p: any) => ({ ...p, tipo: "Cavalo" as const }))
        ];

        setProdutos(produtosCombinados);
      } catch (err) {
        setError('Erro ao carregar produtos');
        console.error('Erro ao buscar produtos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FACC15" />
        <Text style={styles.loadingText}>Carregando produtos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable
          style={styles.botaoRecarregar}
          onPress={() => {
            setError(null);
            setLoading(true);
            useEffect(() => {}, []); // Dispara o useEffect novamente
          }}
        >
          <Text style={styles.botaoTexto}>Tentar novamente</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <>
      <Header />
      <View style={styles.container}>
        <FlatList
          data={produtos}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.produto}>
              <Image source={{ uri: item.foto }} style={styles.imagem} />
              <View style={styles.infoContainer}>
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={[styles.tipo, 
                  item.tipo === 'Charuto' && styles.tipoCharuto,
                  item.tipo === 'Whisky' && styles.tipoWhisky,
                  item.tipo === 'Cavalo' && styles.tipoCavalo
                ]}>
                  {item.tipo}
                </Text>
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
          onPress={() => navigation.navigate('pages/carrinho/Carrinho')}
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
    padding: 20,
    marginTop: 70
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    color: '#555',
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
    width: 80,
    height: 80,
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
    marginBottom: 4,
  },
  tipo: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: '600',
  },
  tipoCharuto: {
    color: '#8B4513', // Marrom
  },
  tipoWhisky: {
    color: '#DAA520', // Dourado
  },
  tipoCavalo: {
    color: '#A0522D', // Marrom mais claro
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
  botaoRecarregar: {
    backgroundColor: '#FACC15',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  botaoPressionado: {
    opacity: 0.8,
  },
  botaoTexto: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

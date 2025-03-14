import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  TextInput,
} from 'react-native';
import Header from '@/components/header/Header';

export default function CarrinhoProdutos() {
  const [produtos, setProdutos] = useState([
    {
      id: '1',
      nome: 'Charuto Imperial',
      tipo: 'Charuto',
      quantidade: 0,
      preco: 49.99,
      imagem: 'https://cdn-icons-png.flaticon.com/512/2762/2762885.png',
    },
    {
      id: '2',
      nome: 'Cavalo Relâmpago',
      tipo: 'Cavalo',
      quantidade: 0,
      preco: 1999.99,
      imagem: 'https://cdn-icons-png.flaticon.com/512/2762/2762885.png',
    },
    {
      id: '3',
      nome: 'Whisky Sombrio 1920',
      tipo: 'Whisky',
      quantidade: 0,
      preco: 299.9,
      imagem: 'https://cdn-icons-png.flaticon.com/512/2762/2762885.png',
    },
  ]);

  const [cep, setCep] = useState('');
  const [cupom, setCupom] = useState('');
  const [inputFocus, setInputFocus] = useState({
    cep: false,
    cupom: false,
  });

  const alterarQuantidade = (id, operacao) => {
    setProdutos((prev) =>
      prev.map((produto) => {
        if (produto.id === id) {
          const novaQtd =
            operacao === 'incrementar'
              ? produto.quantidade + 1
              : Math.max(0, produto.quantidade - 1);
          return { ...produto, quantidade: novaQtd };
        }
        return produto;
      })
    );
  };

  const finalizarCompra = () => {
    console.log('Finalizando compra...');
  };

  const aplicarCupom = () => {
    console.log('Aplicando cupom...');
  };

  const calcularFrete = () => {
    console.log('Calculando frete...');
  };

  const valorTotal = produtos.reduce(
    (total, produto) => total + produto.preco * produto.quantidade,
    0
  ).toFixed(2);

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Carrinho de Compras</Text>

        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.produto}>
              <Image source={{ uri: item.imagem }} style={styles.imagem} />
              <View style={styles.infoContainer}>
                <Text style={styles.nome}>{item.nome}</Text>
                <View style={styles.controles}>
                  <Pressable
                    onPress={() => alterarQuantidade(item.id, 'incrementar')}
                    style={({ pressed }) => [
                      styles.botao,
                      pressed && styles.botaoPressionado,
                    ]}
                  >
                    <Text style={styles.botaoTexto}>+</Text>
                  </Pressable>

                  <Text style={styles.quantidade}>{item.quantidade}</Text>

                  <Pressable
                    onPress={() => alterarQuantidade(item.id, 'decrementar')}
                    style={({ pressed }) => [
                      styles.botao,
                      pressed && styles.botaoPressionado,
                    ]}
                  >
                    <Text style={styles.botaoTexto}>-</Text>
                  </Pressable>
                </View>
              </View>
              <Text style={styles.preco}>
                R$ {(item.preco * item.quantidade).toFixed(2)}
              </Text>
            </View>
          )}
        />

        <Text style={styles.valorTotal}>Valor Total: R$ {valorTotal}</Text>

        {/* Bloco CEP + Calcular Frete */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>CEP</Text>
          <View style={styles.rowInput}>
            <TextInput
              style={[styles.inputFlex, inputFocus.cep && styles.inputFocus]}
              placeholder="Digite seu CEP"
              placeholderTextColor="#999"
              value={cep}
              onChangeText={setCep}
              onFocus={() => setInputFocus({ ...inputFocus, cep: true })}
              onBlur={() => setInputFocus({ ...inputFocus, cep: false })}
            />
            <Pressable
              style={({ pressed }) => [
                styles.botaoFlex,
                pressed && styles.botaoPressionado,
              ]}
              onPress={calcularFrete}
            >
              <Text style={styles.botaoTexto}>Calcule o Frete</Text>
            </Pressable>
          </View>
        </View>

        {/* Bloco Cupom + Aplicar */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Cupom de Desconto</Text>
          <View style={styles.rowInput}>
            <TextInput
              style={[styles.inputFlex, inputFocus.cupom && styles.inputFocus]}
              placeholder="Digite seu cupom"
              placeholderTextColor="#999"
              value={cupom}
              onChangeText={setCupom}
              onFocus={() => setInputFocus({ ...inputFocus, cupom: true })}
              onBlur={() => setInputFocus({ ...inputFocus, cupom: false })}
            />
            <Pressable
              style={({ pressed }) => [
                styles.botaoFlex,
                pressed && styles.botaoPressionado,
              ]}
              onPress={aplicarCupom}
            >
              <Text style={styles.botaoTexto}>Aplicar Cupom</Text>
            </Pressable>
          </View>
        </View>

        {/* Botão Finalizar Compra - com animação */}
        <Pressable
          onPress={finalizarCompra}
          style={({ pressed }) => [
            styles.botaoFinal,
            pressed && styles.botaoPressionado,
          ]}
        >
          <Text style={styles.botaoTextoAntigo}>Finalizar Compra</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FACC15',
    textAlign: 'center',
    marginBottom: 20,
  },
  produto: {
    flexDirection: 'row',
    backgroundColor: '#111',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginRight: 10,
  },
  nome: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  controles: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  botao: {
    backgroundColor: '#FACC15',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  botaoPressionado: {
    transform: [{ scale: 0.97 }],
    backgroundColor: '#e0b814',
  },
  botaoTexto: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantidade: {
    color: '#fff',
    fontSize: 16,
    minWidth: 20,
    textAlign: 'center',
  },
  preco: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  inputContainer: {
    marginTop: 15,
  },
  label: {
    color: '#FACC15',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  rowInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  inputFlex: {
    flex: 1,
    backgroundColor: '#222',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: '#fff',
    fontSize: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  inputFocus: {
    borderColor: '#FACC15',
  },
  botaoFlex: {
    backgroundColor: '#FACC15',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  botaoFinal: {
    marginTop: 25,
    backgroundColor: '#FACC15',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  botaoTextoAntigo: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  valorTotal: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginVertical: 10,
  },
});

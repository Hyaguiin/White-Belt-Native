import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import Header from "@/components/header/Header";
import { useCart } from "@/components/cartContext/CartContext";
import { TipoProduto } from "@/types/TipoProduto"; // Verifique se TipoProduto ainda é necessário
import { PedidoProduto } from "@/types/PedidoProduto"; // Verifique se PedidoProduto ainda é necessário

export default function CarrinhoProdutos() {
  const {
    produtos = [],
    total = 0,
    alterarQuantidade,
    carregarCarrinho,  
    removerDoCarrinho,
    finalizarCompra,
  } = useCart();

  const [cep, setCep] = useState("");
  const [cupom, setCupom] = useState("");
  const [inputFocus, setInputFocus] = useState({
    cep: false,
    cupom: false,
  });
  const [loading, setLoading] = useState(false);

  // Carregar o carrinho assim que o componente for montado
  useEffect(() => {
    carregarCarrinho();  // Chama a função para carregar os produtos do carrinho
  }, [carregarCarrinho]);

  const handleFinalizarCompra = async () => {
    try {
      setLoading(true);

      await finalizarCompra({
        cep,
        cupom,
        produtos: produtos.map((p) => ({
          produtoId: p._id,
          tipo:
            p.tipo === "Misto"
              ? "Charuto" // Mapeia o tipo "Misto" para "Charuto" ou outro valor válido
              : (p.tipo as "Charuto" | "Whisky" | "Cavalo"), // Garante que o tipo seja válido
          quantidade: p.quantidade,
        })),
      });

      Alert.alert("Sucesso", "Compra finalizada com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível finalizar a compra");
    } finally {
      setLoading(false);
    }
  };

  const handleAplicarCupom = () => {
    console.log("Aplicando cupom:", cupom);
  };

  const handleCalcularFrete = () => {
    if (!cep || cep.length < 8) {
      Alert.alert("CEP inválido", "Digite um CEP válido");
      return;
    }
    console.log("Calculando frete para CEP:", cep);
  };

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Carrinho de Compras</Text>

        {!produtos || produtos.length === 0 ? (
          <View style={styles.carrinhoVazioContainer}>
            <Text style={styles.carrinhoVazio}>Seu carrinho está vazio</Text>
          </View>
        ) : (
          <>
            <FlatList
              data={produtos}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <View style={styles.produto}>
                  <Image source={{ uri: item.foto }} style={styles.imagem} />
                  <View style={styles.infoContainer}>
                    <Text style={styles.nome}>{item.nome}</Text>
                    <Text style={styles.tipo}></Text>
                    <View style={styles.controles}>
                      <Pressable
                        onPress={() =>
                          alterarQuantidade(item._id, "decrementar")
                        }
                        style={({ pressed }) => [
                          styles.botaoQuantidade,
                          pressed && styles.botaoPressionado,
                        ]}
                      >
                        <Text style={styles.botaoTexto}>-</Text>
                      </Pressable>

                      <Text style={styles.quantidade}>{item.quantidade}</Text>

                      <Pressable
                        onPress={() =>
                          alterarQuantidade(item._id, "incrementar")
                        }
                        style={({ pressed }) => [
                          styles.botaoQuantidade,
                          pressed && styles.botaoPressionado,
                        ]}
                      >
                        <Text style={styles.botaoTexto}>+</Text>
                      </Pressable>

                      <Pressable
                        onPress={() => removerDoCarrinho(item._id)}
                        style={({ pressed }) => [
                          styles.botaoRemover,
                          pressed && styles.botaoPressionado,
                        ]}
                      >
                        <Text style={styles.botaoTexto}>Remover</Text>
                      </Pressable>
                    </View>
                  </View>
                  <Text style={styles.preco}>
                    R$ {(item.preco * item.quantidade).toFixed(2)}
                  </Text>
                </View>
              )}
              ListFooterComponent={
                <>
                  <Text style={styles.valorTotal}>
                    Subtotal: R$ {total.toFixed(2)}
                  </Text>

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
                        keyboardType="numeric"
                        maxLength={8}
                      />
                      <Pressable
                        style={({ pressed }) => [
                          styles.botaoFlex,
                          pressed && styles.botaoPressionado,
                        ]}
                        onPress={handleCalcularFrete}
                      >
                        <Text style={styles.botaoTexto}>Calcular Frete</Text>
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
                        onPress={handleAplicarCupom}
                      >
                        <Text style={styles.botaoTexto}>Aplicar</Text>
                      </Pressable>
                    </View>
                  </View>
                </>
              }
            />

            {/* Botão Finalizar Compra */}
            <Pressable
              onPress={handleFinalizarCompra}
              style={({ pressed }) => [
                styles.botaoFinal,
                pressed && styles.botaoPressionado,
                loading && styles.botaoDesabilitado,
              ]}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#000" />
              ) : (
                <Text style={styles.botaoTextoAntigo}>Finalizar Compra</Text>
              )}
            </Pressable>
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
    marginTop: 70
  },
  carrinhoVazioContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  carrinhoVazio: {
    color: "#FACC15",
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FACC15",
    textAlign: "center",
    marginBottom: 20,
  },
  produto: {
    flexDirection: "row",
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  imagem: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#222",
  },
  infoContainer: {
    flex: 1,
    marginRight: 10,
  },
  nome: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  tipo: {
    color: "#FACC15",
    fontSize: 14,
    marginBottom: 8,
  },
  controles: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  botaoQuantidade: {
    backgroundColor: "#FACC15",
    borderRadius: 5,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  botaoRemover: {
    backgroundColor: "#ff4444",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 10,
  },
  botaoPressionado: {
    opacity: 0.8,
  },
  botaoDesabilitado: {
    opacity: 0.6,
  },
  botaoTexto: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  quantidade: {
    color: "#fff",
    fontSize: 16,
    minWidth: 20,
    textAlign: "center",
  },
  preco: {
    color: "#FACC15",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
  inputContainer: {
    marginTop: 15,
  },
  label: {
    color: "#FACC15",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  rowInput: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  inputFlex: {
    flex: 1,
    backgroundColor: "#222",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: "#fff",
    fontSize: 16,
    borderWidth: 2,
    borderColor: "transparent",
  },
  inputFocus: {
    borderColor: "#FACC15",
  },
  botaoFlex: {
    backgroundColor: "#FACC15",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  botaoFinal: {
    marginTop: 25,
    backgroundColor: "#FACC15",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  botaoTextoAntigo: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
  },
  valorTotal: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
    marginVertical: 10,
  },
});

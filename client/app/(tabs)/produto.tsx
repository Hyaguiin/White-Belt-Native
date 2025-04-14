import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, ScrollView } from "react-native";
import Modal from "react-native-modal"; 
import { criarProduto } from "@/services/Produto"; // Assumindo que o criarProduto está neste caminho
import { DrawerActions } from "@react-navigation/native"; // Para navegação
import { useNavigation } from "@react-navigation/native"; // Navegação

const AdicionarProdutosScreen = () => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [tipoProduto, setTipoProduto] = useState(""); 
  const [nome, setNome] = useState(""); 
  const [preco, setPreco] = useState(""); 
  const [descricao, setDescricao] = useState(""); 
  const [foto, setFoto] = useState(""); 

  const toggleModal = (tipo: string) => {
    setTipoProduto(tipo); 
    setIsModalVisible(true); 
  };

  const handleSubmit = async () => {
    if (!nome || !preco || !descricao || !foto) {
      Alert.alert("Erro", "Todos os campos são obrigatórios!");
      return;
    }

    const produtoData = {
      nome,
      preco: parseFloat(preco), 
      descricao,
      foto,
    };

    try {
      await criarProduto(tipoProduto, produtoData);
      Alert.alert("Sucesso", `${tipoProduto.charAt(0).toUpperCase() + tipoProduto.slice(1)} criado com sucesso!`);
      clearForm(); 
      setIsModalVisible(false); 
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Erro", `Erro ao criar produto: ${error.message}`);
      }
    }
  };

  const clearForm = () => {
    setNome("");
    setPreco("");
    setDescricao("");
    setFoto(""); // Limpar o campo de foto
  };

  return (
    <View style={styles.container}>
      
      

      <Text style={styles.title}>Adicionar Produtos</Text>

      <ScrollView contentContainerStyle={styles.buttonGroup}>
        <Button title="Adicionar Cavalo" onPress={() => toggleModal("cavalo")} color="#FFC107" />
        <Button title="Adicionar Charuto" onPress={() => toggleModal("charuto")} color="#FFC107" />
        <Button title="Adicionar Whisky" onPress={() => toggleModal("whisky")} color="#FFC107" />
      </ScrollView>

      <Modal isVisible={isModalVisible} onBackdropPress={() => setIsModalVisible(false)}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Criar {tipoProduto.charAt(0).toUpperCase() + tipoProduto.slice(1)}</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={styles.input}
            placeholder="Preço"
            value={preco}
            onChangeText={setPreco}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            value={descricao}
            onChangeText={setDescricao}
          />
          <TextInput
            style={styles.input}
            placeholder="URL da Foto"
            value={foto}
            onChangeText={setFoto}
          />

          <View style={styles.modalActions}>
            <Button
              title={`Criar ${tipoProduto.charAt(0).toUpperCase() + tipoProduto.slice(1)}`}
              onPress={handleSubmit}
              color="#4CAF50"
            />
            <Button title="Fechar" onPress={() => setIsModalVisible(false)} color="#f44336" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  buttonGroup: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    minWidth: 300,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  modalActions: {
    marginTop: 20,
    justifyContent: "space-between",
  },
});

export default AdicionarProdutosScreen;

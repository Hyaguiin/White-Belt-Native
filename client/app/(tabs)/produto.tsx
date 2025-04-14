import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from "react-native";
import Modal from "react-native-modal"; 
import { criarProduto } from "@/services/Produto"; // Assumindo que o criarProduto está neste caminho

const AdicionarProdutosScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false); // Controla o estado do modal
  const [tipoProduto, setTipoProduto] = useState(""); // Tipo de produto a ser criado
  const [nome, setNome] = useState(""); // Nome do produto
  const [preco, setPreco] = useState(""); // Preço do produto
  const [descricao, setDescricao] = useState(""); // Descrição do produto
  const [foto, setFoto] = useState(""); // Foto do produto (campo novo)

  // Função para mostrar o modal e definir o tipo de produto
  const toggleModal = (tipo: string) => {
    setTipoProduto(tipo); // Definir o tipo do produto (cavalo, charuto, whisky)
    setIsModalVisible(true); // Exibir o modal
  };

  // Função para enviar os dados ao backend
  const handleSubmit = async () => {
    // Validação simples para garantir que os campos não estão vazios
    if (!nome || !preco || !descricao || !foto) {
      Alert.alert("Erro", "Todos os campos são obrigatórios!");
      return;
    }

    const produtoData = {
      nome,
      preco: parseFloat(preco), // Convertendo o preço para um número
      descricao,
      foto,
    };

    try {
      // Enviar os dados para o serviço
      await criarProduto(tipoProduto, produtoData);
      Alert.alert(
        "Sucesso",
        `${tipoProduto.charAt(0).toUpperCase() + tipoProduto.slice(1)} criado com sucesso!`
      );
      clearForm(); // Limpar os campos após a criação
      setIsModalVisible(false); // Fechar o modal
    } catch (error) {
      if(error instanceof Error){
        Alert.alert("Erro", `Erro ao criar produto: ${error.message}`);
      }
    }
  };

  // Função para limpar os campos do formulário
  const clearForm = () => {
    setNome("");
    setPreco("");
    setDescricao("");
    setFoto(""); // Limpar o campo de foto
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Produtos</Text>

      {/* Botões para abrir o modal e criar diferentes tipos de produtos */}
      <View style={styles.buttonGroup}>
        <Button
          title="Adicionar Cavalo"
          onPress={() => toggleModal("cavalo")}
        />
        <Button
          title="Adicionar Charuto"
          onPress={() => toggleModal("charuto")}
        />
        <Button
          title="Adicionar Whisky"
          onPress={() => toggleModal("whisky")}
        />
      </View>

      {/* Modal para Adicionar Produto */}
      <Modal
        isVisible={isModalVisible} // Controla a visibilidade do modal
        onBackdropPress={() => setIsModalVisible(false)} // Fecha o modal ao clicar fora
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            Criar {tipoProduto.charAt(0).toUpperCase() + tipoProduto.slice(1)}
          </Text>

          {/* Campos de input para nome, preço, descrição e foto */}
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

          {/* Botão para submeter o formulário */}
          <Button
            title={`Criar ${tipoProduto.charAt(0).toUpperCase() + tipoProduto.slice(1)}`}
            onPress={handleSubmit}
          />

          {/* Botão para fechar o modal */}
          <Button title="Fechar" onPress={() => setIsModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonGroup: {
    marginBottom: 20,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 5,
  },
});

export default AdicionarProdutosScreen;

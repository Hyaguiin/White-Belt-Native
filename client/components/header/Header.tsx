import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const Header = () => {
  const [modalVisible, setModalVisible] = useState(false); // Controle de visibilidade do modal

  // Função para abrir o modal
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  // Função para simular a navegação ou ação do botão
  const handleOptionPress = (option: string) => { // Aqui definimos o tipo de `option` como string
    console.log(option); // Aqui você pode fazer a lógica para cada opção (por exemplo, Carrinho ou Logout)
    setModalVisible(false); // Fecha o modal
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image
          source={require('../../assets/images/whiteBeltt.png')}
          style={styles.image}
        />
        <Text style={styles.title}>WhiteBelt</Text>
      </View>

      {/* Botão de Configurações */}
      <TouchableOpacity style={styles.button} onPress={toggleModal}>
        <Ionicons name="settings" size={24} color="#FACC15" /> {/* Ícone de configurações */}
      </TouchableOpacity>

      {/* Modal com as opções Carrinho e Logout */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <FlatList
              data={['Carrinho', 'Logout']}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleOptionPress(item)} // Passando corretamente a opção
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1000,
    justifyContent: 'space-between',
    padding: 20,
    width: '100%',
    backgroundColor: '#000',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxWidth: 300,
  },
  option: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 18,
    color: '#000',
  },
});

export default Header;

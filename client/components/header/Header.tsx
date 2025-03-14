import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal, FlatList, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const Header = () => {
  const [modalVisible, setModalVisible] = useState(false); // Controle de visibilidade do modal
  const scaleAnimCart = useRef(new Animated.Value(1)).current; // Animação separada para o carrinho
  const scaleAnimSettings = useRef(new Animated.Value(1)).current; // Animação separada para as configurações

  // Função para abrir o modal
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  // Função para simular a navegação ou ação do botão
  const handleOptionPress = (option: string) => {
    console.log(option); // Aqui você pode fazer a lógica para cada opção (por exemplo, Carrinho ou Logout)
    setModalVisible(false); // Fecha o modal
  };

  // Função para simular a ação do carrinho
  const handleCartPress = () => {
    console.log('Abrindo carrinho...');
    // Lógica do carrinho aqui, como navegação ou exibição de carrinho
  };

  // Função para animar o ícone de carrinho
  const animateCartIcon = () => {
    Animated.sequence([
      // Aumenta o tamanho
      Animated.timing(scaleAnimCart, {
        toValue: 1.2, // Aumenta o tamanho para 1.2x
        duration: 150, // Duração de 150ms
        useNativeDriver: true, // Usa o driver nativo para desempenho
      }),
      // Volta ao tamanho original
      Animated.timing(scaleAnimCart, {
        toValue: 1, // Retorna ao tamanho original
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Função para animar o ícone de configurações
  const animateSettingsIcon = () => {
    Animated.sequence([
      // Aumenta o tamanho
      Animated.timing(scaleAnimSettings, {
        toValue: 1.2, // Aumenta o tamanho para 1.2x
        duration: 150, // Duração de 150ms
        useNativeDriver: true, // Usa o driver nativo para desempenho
      }),
      // Volta ao tamanho original
      Animated.timing(scaleAnimSettings, {
        toValue: 1, // Retorna ao tamanho original
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
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

      {/* Container para os botões */}
      <View style={styles.buttonsContainer}>
        {/* Botão de Carrinho */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleCartPress();
            animateCartIcon(); // Anima o ícone de carrinho ao pressioná-lo
          }}
        >
          <Animated.View style={{ transform: [{ scale: scaleAnimCart }] }}>
            <Ionicons name="cart" size={24} color="#FACC15" /> {/* Ícone de carrinho */}
          </Animated.View>
        </TouchableOpacity>

        {/* Botão de Configurações */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            toggleModal();
            animateSettingsIcon(); // Anima o ícone de configurações ao pressioná-lo
          }}
        >
          <Animated.View style={{ transform: [{ scale: scaleAnimSettings }] }}>
            <Ionicons name="settings" size={24} color="#FACC15" /> {/* Ícone de configurações */}
          </Animated.View>
        </TouchableOpacity>
      </View>

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
  buttonsContainer: {
    flexDirection: 'row',  // Coloca os botões em linha (horizontal)
    alignItems: 'center',
  },
  button: {
    padding: 8,
    marginLeft: 10,  // Espaçamento entre os botões
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

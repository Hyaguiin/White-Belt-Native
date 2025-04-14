// pages/home/home.tsx
import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/types/Navigation";
import Header from "@/components/header/Header";
import Icon from "react-native-vector-icons/FontAwesome"; // Importando os ícones

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const Home = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <View style={styles.mainContent}>
        <Text style={styles.title}>Bem-vindo ao Paraíso dos Sabores e Estilos!</Text>
        <Text style={styles.description}>
          Aprecie o melhor do mundo dos Whiskys, Charutos e Cavalos. Escolha seu estilo, seja você um apreciador de boas bebidas ou um amante da velocidade e elegância.
        </Text>

        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>Nosso Serviço:</Text>
          <View style={styles.stars}>
            {/* Adicionando 5 estrelas */}
            <Icon name="star" size={30} color="#FFD700" />
            <Icon name="star" size={30} color="#FFD700" />
            <Icon name="star" size={30} color="#FFD700" />
            <Icon name="star" size={30} color="#FFD700" />
            <Icon name="star" size={30} color="#FFD700" />
          </View>
          <Text style={styles.ratingText}>5 Estrelas - Excelente Qualidade!</Text>
        </View>

        {/* Seção de Destaques */}
        <View style={styles.highlightsSection}>
          <Text style={styles.highlightsTitle}>Destaques</Text>
          <View style={styles.highlightsContainer}>
            <View style={styles.highlightItem}>
              <Image
                source={{ uri: "https://carrefourbrfood.vtexassets.com/arquivos/ids/97509041/whisky-johnnie-walker-black-label-1l-5.jpg?v=638100838224130000" }}
                style={styles.highlightImage}
              />
              <Text style={styles.highlightText}>Whisky Exclusivo</Text>
            </View>
            <View style={styles.highlightItem}>
              <Image
                source={{ uri: "https://brasilia.deboa.com/wp-content/uploads/2023/06/Noite-de-Charuto-e-Cognac-na-Fazenda-Churrascada-Bras%C3%ADlia_deboa-Brasilia.jpg" }}
                style={styles.highlightImage}
              />
              <Text style={styles.highlightText}>Charuto Premium</Text>
            </View>
            <View style={styles.highlightItem}>
              <Image
                source={{ uri: "data:image/webp;base64,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" }}
                style={styles.highlightImage}
              />
              <Text style={styles.highlightText}>Cavalo de Raça</Text>
            </View>
          </View>
        </View>

      

        {/* Botão de Exploração */}
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Explorar mais</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    alignItems: "center",
    paddingTop: 20,
  },
  mainContent: {
    marginTop: 80,
    width: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#343a40",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: 'Arial',
  },
  description: {
    fontSize: 18,
    color: "#6c757d",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 24,
    fontFamily: 'Arial',
  },
  ratingContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#343a40",
    marginBottom: 10,
  },
  stars: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginBottom: 20,
    flexWrap: "wrap",
  },
  image: {
    width: "30%",
    height: undefined,
    aspectRatio: 1,
    borderRadius: 15,
    marginVertical: 10,
    resizeMode: "cover",
    borderWidth: 2,
    borderColor: "#ddd",
  },
  buttonContainer: {
    marginTop: 10, // Diminui a distância entre os "Destaques" e o botão
    backgroundColor: "#FACC15",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: "#343a40",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  highlightsSection: {
    marginVertical: 30,
    width: "100%",
  },
  highlightsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#343a40",
    textAlign: "center",
    marginBottom: 20,
  },
  highlightsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  highlightItem: {
    alignItems: "center",
    width: "30%",
    marginBottom: 10,
  },
  highlightImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    resizeMode: "cover",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  highlightText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#343a40",
    textAlign: "center",
  },
});

export default Home;

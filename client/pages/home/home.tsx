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
                source={{ uri: "https://example.https://sottilecasa.cdn.magazord.com.br/img/2024/09/produto/40090/copo-de-cristal-p-whisky-on-the-rocks-incolor-ambientada.jpg/highlight-whisky.jpg" }}
                style={styles.highlightImage}
              />
              <Text style={styles.highlightText}>Whisky Exclusivo</Text>
            </View>
            <View style={styles.highlightItem}>
              <Image
                source={{ uri: "https://example.https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpJeOtlpp71cdmeN5Na8FMSDzXWxWXh5gNfQ&s/highlight-charuto.jpg" }}
                style={styles.highlightImage}
              />
              <Text style={styles.highlightText}>Charuto Premium</Text>
            </View>
            <View style={styles.highlightItem}>
              <Image
                source={{ uri: "https://https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC4GhMx2phI1WfVnxR1bbMvybZnyZ8hBoLUw&s.com/highlight-cavalo.jpg" }}
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
    marginTop: 30,
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

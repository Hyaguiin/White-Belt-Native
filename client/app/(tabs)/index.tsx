import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "@/components/Header";

const Home = () => {
  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Inicio</Text>
        <Text style={styles.description}>Bem-vindo à Home!</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    fontSize: 16,
    color: "#fff",
  },
});

export default Home;

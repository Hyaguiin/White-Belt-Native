import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "@/components/Header";
import { Usuario } from "@/types/Usuario";
import { usuarioService } from "@/services/userService";

export default function Perfil() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const carregarDadosUsuario = async () => {
      try {
        // Usa o método verificarLogin do serviço
        const usuarioLogado = await usuarioService.verificarLogin();

        if (usuarioLogado) {
          setUsuario(usuarioLogado);
        } else {
          // Redirecionar para login se não estiver logado
          // Você pode usar useRouter do expo-router para isso
          Alert.alert("Erro", "Usuário não está logado");
        }
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar os dados do usuário");
        console.log(error)
      }
    };

    carregarDadosUsuario();
  }, []);

  // Renderização condicional enquanto carrega
  if (!usuario) {
    return (
      <>
        <Header />
        <View style={styles.container}>
          <Text>Carregando...</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Image
          source={{ uri: usuario.imagem || "https://randomuser.me/api/portraits/men/32.jpg" }}
          style={styles.imagem}
        />
        <Text style={styles.nome}>{usuario.nome}</Text>
        <Text style={styles.descricao}>{usuario.email || "Nenhuma descrição disponível"}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  imagem: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  nome: {
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  descricao: {
    color: "#FACC15",
    fontSize: 20,
    textAlign: "center",
  },
});

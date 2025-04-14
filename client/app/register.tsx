import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable, Alert } from "react-native";
import { useRouter } from "expo-router";
import { registrar } from "@/services/userService"; // Alinha com função registrar

export default function RegisterPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    cpf: "",
    senha: "",
    imagem: "https://randomuser.me/api/portraits/men/32.jpg",
    cep: "",
    telefone: "",
  });

  const handleInputChange = (campo: keyof typeof usuario, valor: string) => {
    setUsuario((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const validarCampos = () => {
    const { nome, email, senha, cep, telefone } = usuario;

    if (!nome) return Alert.alert("Erro", "Nome é obrigatório");
    if (!email || !email.includes("@")) return Alert.alert("Erro", "Email inválido");
    if (senha.length < 6) return Alert.alert("Erro", "Senha deve ter no mínimo 6 caracteres");
    if (!cep) return Alert.alert("Erro", "CEP é obrigatório");
    if (!telefone) return Alert.alert("Erro", "Telefone é obrigatório");

    return true;
  };

  const handleRegistro = async () => {
    if (!validarCampos()) return;

    try {
      const response = await registrar(usuario);

      if (response?.status === 201 || response?.status === 200) {
        Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
        router.push("/login");
      } else {
        Alert.alert("Erro", response?.data?.message || "Erro ao cadastrar");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível cadastrar o usuário");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.view}>
        <Text style={styles.titulo}>Registro de Usuário</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          placeholderTextColor={"#ccc"}
          value={usuario.nome}
          onChangeText={(text) => handleInputChange("nome", text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={"#ccc"}
          keyboardType="email-address"
          value={usuario.email}
          onChangeText={(text) => handleInputChange("email", text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor={"#ccc"}
          secureTextEntry
          value={usuario.senha}
          onChangeText={(text) => handleInputChange("senha", text)}
        />

        <TextInput
          style={styles.input}
          placeholder="CPF"
          placeholderTextColor={"#ccc"}
          keyboardType="numeric"
          value={usuario.cpf}
          onChangeText={(text) => handleInputChange("cpf", text)}
        />

        <TextInput
          style={styles.input}
          placeholder="CEP"
          placeholderTextColor={"#ccc"}
          keyboardType="numeric"
          value={usuario.cep}
          onChangeText={(text) => handleInputChange("cep", text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Telefone"
          placeholderTextColor={"#ccc"}
          keyboardType="phone-pad"
          value={usuario.telefone}
          onChangeText={(text) => handleInputChange("telefone", text)}
        />

        <Pressable style={styles.botaoRegistro} onPress={handleRegistro}>
          <Text style={styles.textoBotao}>Registrar</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  view: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  titulo: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  botaoRegistro: {
    backgroundColor: "#FACC15",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  textoBotao: {
    color: "#000",
    fontWeight: "bold",
  },
});

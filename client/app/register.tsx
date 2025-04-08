// app/register.tsx
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable, Alert } from "react-native";
import { usuarioService } from "@/services/userService";
import { Usuario } from "@/types/Usuario";
import { useRouter } from "expo-router";

export default function RegisterPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario>({
    nome: "",
    email: "",
    senha: "",
    imagem: "https://randomuser.me/api/portraits/men/32.jpg",
    cep: "",
    numeroCasa: null,
    complemento: null,
    telefone: "",
  });

  const handleInputChange = (campo: keyof Usuario, valor: string) => {
    setUsuario((prev) => ({
      ...prev,
      [campo]: campo === "numeroCasa" ? (valor ? parseInt(valor) : null) : valor,
    }));
  };

  const validarCampos = () => {
    const { nome, email, senha, cep, telefone } = usuario;

    if (!nome) {
      Alert.alert("Erro", "Nome é obrigatório");
      return false;
    }

    if (!email || !email.includes("@")) {
      Alert.alert("Erro", "Email inválido");
      return false;
    }

    if (senha.length < 6) {
      Alert.alert("Erro", "Senha deve ter no mínimo 6 caracteres");
      return false;
    }

    if (!cep) {
      Alert.alert("Erro", "CEP é obrigatório");
      return false;
    }

    if (!telefone) {
      Alert.alert("Erro", "Telefone é obrigatório");
      return false;
    }

    return true;
  };

  const handleRegistro = async () => {
    if (!validarCampos()) return;

    try {
      // Verificar se usuário já existe
      const usuarioExistente = await usuarioService.buscarUsuarioPorEmail(usuario.email);

      if (usuarioExistente) {
        Alert.alert("Erro", "Já existe um usuário com este email");
        return;
      }

      // Salvar usuário
      await usuarioService.salvarUsuario(usuario);

      Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");

      // Redirecionar para login ou home
      router.push("/login");
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
          placeholder="CEP"
          placeholderTextColor={"#ccc"}
          keyboardType="numeric"
          value={usuario.cep}
          onChangeText={(text) => handleInputChange("cep", text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Número da Casa"
          placeholderTextColor={"#ccc"}
          keyboardType="numeric"
          value={usuario.numeroCasa?.toString() || ""}
          onChangeText={(text) => handleInputChange("numeroCasa", text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Complemento (opcional)"
          placeholderTextColor={"#ccc"}
          value={usuario.complemento || ""}
          onChangeText={(text) => handleInputChange("complemento", text)}
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

import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Alert, Image } from "react-native";
import { usuarioService } from "@/services/userService";
import { useRouter } from "expo-router";
import { Usuario } from "@/types/Usuario";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha email e senha");
      return;
    }

    try {
      const usuario = await usuarioService.login(email, senha);
      Alert.alert("Sucesso", `Bem-vindo, ${usuario.nome}!`);
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Não foi possível realizar o login");
    }
  };

  const handleCadastro = () => {
    router.push("/register");
  };

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/whiteBelt.png")} style={styles.logo} resizeMode="contain" />

      <Text style={styles.titulo}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={"#ccc"}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor={"#ccc"}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <Pressable style={styles.botaoLogin} onPress={handleLogin}>
        <Text style={styles.textoBotao}>Entrar</Text>
      </Pressable>

      <View style={styles.cadastroContainer}>
        <Text style={styles.textoCadastro}>Não tem uma conta?</Text>
        <Pressable onPress={handleCadastro}>
          <Text style={styles.linkCadastro}>Cadastre-se</Text>
        </Pressable>
      </View>

      <Pressable onPress={() => {}}>
        <Text style={styles.esqueciSenha}>Esqueci minha senha</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 30,
  },
  titulo: {
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
    marginBottom: 15,
  },
  botaoLogin: {
    backgroundColor: "#FACC15",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  textoBotao: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  cadastroContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  textoCadastro: {
    marginRight: 5,
  },
  linkCadastro: {
    color: "#FACC15",
    fontWeight: "bold",
  },
  esqueciSenha: {
    textAlign: "center",
    marginTop: 15,
    color: "#666",
  },
});

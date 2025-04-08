import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { usuarioService } from "@/services/userService"; // Ajuste o caminho conforme sua estrutura

export const Header = () => {
  const router = useRouter();
  const [isLoggedin, setIsLoggedIn] = useState(false);

  const handleLogout = async () => {
    try {
      await usuarioService.logout();
      setIsLoggedIn(false);
      router.replace("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const handleLogin = () => {
    router.push("/login");
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const user = await usuarioService.verificarLogin();
        setIsLoggedIn(!!user);
      } catch (error) {
        console.error("Erro ao verificar status de login:", error);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image source={require("../assets/images/whiteBelt.png")} style={styles.image} />
        <Text style={styles.title}>WhiteBelt</Text>
      </View>

      {isLoggedin ? (
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Ionicons name="exit" size={24} color="#FACC15" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Ionicons name="log-in" size={24} color="#FACC15" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    top: 0,
    left: 0,
    zIndex: 1000,
    justifyContent: "space-between",
    padding: 20,
    width: "100%",
    backgroundColor: "#000",
  },
  titleContainer: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  button: {
    marginTop: 30,
    padding: 8,
  },
});

export default Header;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { getMe } from "../../services/AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Image } from "react-native";

export default function Perfil() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("@auth_token");
        console.log("Token encontrado:", token);

        if (!token) {
          Alert.alert("Erro", "Você não está autenticado. Faça login.");
          router.replace("/login");
          return;
        }

        const response = await getMe(token);

        console.log("Tipo da resposta:", typeof response);
        console.log("Resposta da API:", response);

        if (response && response._id) {
          console.log("Dados do usuário encontrados:", response);
          setUserData(response);
          setEditedUserData(response);
        } else {
          throw new Error("Dados do usuário não encontrados");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário", error);
        Alert.alert("Erro", "Não foi possível carregar os dados do perfil");
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = async () => {
    if (!editedUserData.name || !editedUserData.email) {
      Alert.alert("Atenção", "Nome e email são obrigatórios!");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("@auth_token");
      if (token) {
        Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
        setUserData(editedUserData);
        setIsEditing(false);
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar as alterações");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Não foi possível carregar os dados do perfil.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Image
        source={{
          uri: "https://t3.ftcdn.net/jpg/03/94/89/90/360_F_394899054_4TMgw6eiMYUfozaZU3Kgr5e0LdH4ZrsU.jpg",
        }}
        style={styles.image}
      />
      <TextInput
        style={styles.input}
        value={isEditing ? editedUserData.name : userData.name}
        onChangeText={(text) =>
          setEditedUserData({ ...editedUserData, name: text })
        }
        editable={isEditing}
      />

      <TextInput
        style={styles.input}
        value={isEditing ? editedUserData.email : userData.email}
        onChangeText={(text) =>
          setEditedUserData({ ...editedUserData, email: text })
        }
        editable={isEditing}
      />

      <TextInput
        style={styles.input}
        value={
          isEditing
            ? editedUserData.address
            : userData.address || "Não informado"
        }
        onChangeText={(text) =>
          setEditedUserData({ ...editedUserData, address: text })
        }
        editable={isEditing}
      />

      {isEditing ? (
        <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
          <Text style={styles.buttonText}>Salvar alterações</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
          <Text style={styles.buttonText}>Editar Perfil</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={async () => {
          await AsyncStorage.removeItem("@auth_token");
          router.replace("/login");
        }}
      >
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA", // Cor de fundo mais suave
    padding: 24,
  },
  image: {
    borderRadius: 100, 
    width: 150, 
    height: 150, 
    alignSelf: "center", 
    marginBottom: 20, 
    borderWidth: 2, 
    borderColor: "#ddd", 
  },
  title: {
    fontSize: 36,
    fontWeight: "600",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: "#333",
    shadowColor: "#000", // Sombra leve para dar profundidade
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFC107", // Cor verde mais suave
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  logoutButton: {
    backgroundColor: "#000", // Cor vermelha para "Sair"
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "#FFC107",
    textAlign: "center",
  },
});

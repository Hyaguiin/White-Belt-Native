import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import Header from "@/components/header/Header";

interface Message {
  text: string;
  sender: "Você" | "Tombi Xelbo";
}

const IP = "192.168.0.18";
const WS_PORT = 6500; 

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Procurando Algum Cavalo ou Charuto de Respeito? Beba Whisky até cair que nem Ramon.",
      sender: "Tombi Xelbo",
    },
  ]);
  const [input, setInput] = useState<string>("");

  const wsRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  // Conexão WebSocket
  useEffect(() => {
    const socket = new WebSocket(`ws://${IP}:${WS_PORT}`);

    socket.onopen = () => {
      console.log("Conectado ao servidor WebSocket");
      wsRef.current = socket;
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      const response = event.data;
      if (response) {
        setMessages((prev) => [
          ...prev,
          { text: response, sender: "Tombi Xelbo" },
        ]);
      }
    };

    socket.onerror = (error) => {
      console.error("Erro na conexão:", error);
      Alert.alert("Erro", "Falha na conexão com o servidor");
      setIsConnected(false);
    };

    socket.onclose = () => {
      console.log("Conexão fechada");
      setIsConnected(false);
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim()) {
      Alert.alert("Aviso", "Por favor, digite uma mensagem");
      return;
    }

    if (!isConnected || !wsRef.current) {
      Alert.alert("Erro", "Não conectado ao servidor");
      return;
    }

    try {
      setMessages((prev) => [...prev, { text: input, sender: "Você" }]);

      wsRef.current.send(input);
      setInput("");
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      Alert.alert("Erro", "Falha ao enviar mensagem");
    }
  };

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text style={styles.status}>
          Status: {isConnected ? "Conectado" : "Desconectado"}
        </Text>

        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageContainer,
                item.sender === "Você" ? styles.userMessage : styles.iaMessage,
              ]}
            >
              {item.sender === "Tombi Xelbo" && (
                <Image
                  source={{
                    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI0OS8Ld6-cVenXqxa9mJZaFNMV56iABFNhQ&s",
                  }} // Ou use uma imagem local, ex: require('./assets/ia-image.png')
                  style={styles.iaImage}
                />
              )}
              <View style={styles.textContainer}>
                <Text style={styles.sender}>{item.sender}:</Text>
                <Text style={styles.messageText}>{item.text}</Text>
              </View>
            </View>
          )}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.messagesContainer}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Digite sua mensagem..."
            placeholderTextColor="#6c757d"
            onSubmitEditing={sendMessage}
          />
          <Button
            title="Enviar"
            onPress={sendMessage}
            color="#FACC15"
            disabled={!isConnected}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000",
    top: 40,
  },
  status: {
    textAlign: "center",
    color: "#666",
    marginBottom: 8,
    fontSize: 16,
  },
  messagesContainer: {
    flexGrow: 1, // Garante que o container da lista de mensagens ocupe o restante do espaço disponível
    marginBottom: 16, // Reduzi o espaçamento entre as mensagens e o campo de entrada
  },
  messageContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    maxWidth: "80%",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#FACC15",
  },
  iaMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  iaImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  sender: {
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  messageText: {
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10, // Ajustei para reduzir o espaço acima do campo de entrada
    paddingBottom: 20, // Reduzi o padding no final
  },
  input: {
    flex: 1,
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 8,
    backgroundColor: "#fff",
    fontSize: 16,
  },
});

export default Chat;

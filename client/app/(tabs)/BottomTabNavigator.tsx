import React from "react";
import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { ParamListBase } from "@react-navigation/native";
import Perfil from "@/pages/profile/Profile";
import Home from "@/pages/home/home";
import ProdutoPage from "@/pages/productsPage/ProductsPage";
import Carrinho from "@/pages/carrinho/Carrinho";
import Chat from "@/pages/chat/Chat";
import { CarrinhoProvider } from "@/components/cartContext/CartContext";

type BottomTabBarNavigatorProps = {
  navigation: BottomTabNavigationProp<ParamListBase>;
};

const Tab = createBottomTabNavigator();

export default function BottomTabBarNavigator({
  navigation,
}: BottomTabBarNavigatorProps) {
  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const itemsInCart = 3; // Aqui você deve pegar o valor dinâmico do carrinho

  return (
    <CarrinhoProvider>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: "#FACC15", // Cor do item ativo
          tabBarInactiveTintColor: "#fff", // Cor do item inativo
          tabBarStyle: {
            backgroundColor: "#000", // Cor do fundo da barra
            paddingBottom: 10,
            borderTopWidth: 0,
            elevation: 5, // Sombra da barra
            height: 70, // Altura da barra
          },
        }}
      >
        {/* Home */}
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />

        {/* Produtos */}
        <Tab.Screen
          name="Products"
          component={ProdutoPage}
          options={{
            tabBarLabel: "Produtos",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="list" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />

        {/* Carrinho */}
        <Tab.Screen
          name="Carrinho"
          component={Carrinho}
          options={{
            tabBarLabel: "Carrinho",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cart" size={size} color={color} />
            ),
            headerShown: false,
            tabBarBadge: itemsInCart > 0 ? itemsInCart : undefined, // Badge dinâmico
            tabBarBadgeStyle: {
              backgroundColor: "#FF6347", // Cor do badge
              color: "#fff", // Cor do texto dentro do badge
            },
          }}
        />

        {/* Perfil */}
        <Tab.Screen
          name="Profile"
          component={Perfil}
          options={{
            tabBarLabel: "Perfil",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />

        {/* Chat */}
        <Tab.Screen
          name="Chat"
          component={Chat}
          options={{
            tabBarLabel: "Chat",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="chatbubbles" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />

        {/* Logout */}
        <Tab.Screen
          name="Logout"
          component={EmptyScreen}
          options={{
            tabBarLabel: "Sair",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="log-out" size={size} color={color} />
            ),
            tabBarButton: () => (
              <TouchableOpacity onPress={handleLogout}>
                <Ionicons name="log-out" size={30} color="#FACC15" />
              </TouchableOpacity>
            ),
          }}
        />
      </Tab.Navigator>
    </CarrinhoProvider>
  );
}

// Função para a tela vazia, utilizada no Logout
function EmptyScreen() {
  return null;
}

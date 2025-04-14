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
import Login from "./login";
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

  return (
    <CarrinhoProvider>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: "#FACC15",
          tabBarInactiveTintColor: "#fff",
          tabBarStyle: {
            backgroundColor: "#000",
            paddingBottom: 5,
            borderTopWidth: 0,
            elevation: 0,
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
            tabBarBadge: 3, // Opcional: mostrar contagem de itens
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

        {/* Logout */}
        <Tab.Screen
          name="Logout"
          component={EmptyScreen}
          options={{
            tabBarLabel: "Sair",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="log-out" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </CarrinhoProvider>
  );
}
//file
function EmptyScreen() {
  return null;
}

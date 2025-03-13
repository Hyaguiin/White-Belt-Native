// BottomTabBarNavigator.tsx (Ajuste para TypeScript)
import React from 'react';
import { TouchableOpacity } from 'react-native'; // Import TouchableOpacity
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'; // Importa o tipo de navegação
import { ParamListBase } from '@react-navigation/native'; // Importa o tipo de parâmetros para a navegação

import Home from '@/pages/home/home'; 
import Cigar from '@/components/products/cigar/Cigar';
import Horse from '@/components/products/horse/Horse'; 
import Carrinho from '@/pages/carrinho/Carrinho';

// Tipagem para a navegação
type BottomTabBarNavigatorProps = {
  navigation: BottomTabNavigationProp<ParamListBase>; // Tipando 'navigation' para usar o tipo adequado
};

const Tab = createBottomTabNavigator();

export default function BottomTabBarNavigator({ navigation }: BottomTabBarNavigatorProps) {
  const handleLogout = () => {
    // Implemente a lógica de logout aqui
    navigation.navigate('Login'); // Navega para a tela de login
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#FACC15', 
        tabBarInactiveTintColor: '#fff', 
        tabBarStyle: { backgroundColor: '#000', paddingBottom: 5 }, 
      }}
    >
      {/* Aba Home */}
      <Tab.Screen
        name="Home"
        component={Home} 
        options={{
          tabBarLabel: 'Home', 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} /> 
          ),
          headerShown: false, // Esconde o cabeçalho aqui
        }}
      />

      {/* Aba Produtos */}
      <Tab.Screen
        name="Products"
        component={Cigar} 
        options={{
          tabBarLabel: 'Produtos', 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} /> 
          ),
          headerShown: false, // Esconde o cabeçalho aqui
        }}
      />

      {/* Aba Perfil */}
      <Tab.Screen
        name="Profile"
        component={Horse} 
        options={{
          tabBarLabel: 'Perfil', 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} /> 
          ),
          headerShown: false, // Esconde o cabeçalho aqui
        }}
      />

      {/* Aba Carrinho */}
      <Tab.Screen
        name="Carrinho"
        component={Carrinho} 
        options={{
          tabBarLabel: 'Carrinho', 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={size} color={color} /> 
          ),
          headerShown: false, // Esconde o cabeçalho aqui
        }}
      />

      {/* Aba Logout (sem tela, apenas ação) */}
      <Tab.Screen
        name="Logout"
        component={EmptyScreen} // Componente vazio
        options={{
          tabBarLabel: 'Logout', 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="log-out-outline" size={size} color={color} /> 
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Componente vazio para a aba de Logout
function EmptyScreen() {
  return null;
}

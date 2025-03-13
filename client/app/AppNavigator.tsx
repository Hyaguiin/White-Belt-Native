// AppNavigator.js ou onde você configura as navegações
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '@/pages/login/login'; // Ajuste o caminho conforme necessário
import BottomTabBarNavigator from '@/app/(tabs)/BottomTabNavigator';
import Header from '@/components/header/Header';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      {/* Tela de login sem cabeçalho */}
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }} // Esconde o cabeçalho na tela de login
      />
      
      {/* Tela principal com o cabeçalho personalizado */}
      <Stack.Screen
        name="Main"
        component={BottomTabBarNavigator}
        options={{
          headerShown: true,
          header: () => <Header /> // Seu cabeçalho personalizado
        }}
      />
    </Stack.Navigator>
  );
}

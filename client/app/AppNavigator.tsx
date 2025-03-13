// AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '@/pages/login/login' // Ajuste o caminho conforme necessário
import BottomTabBarNavigator from '@/components/bottomTab/BottomTabNavigator';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }} 
      />
      <Stack.Screen
        name="Main"
        component={BottomTabBarNavigator}
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}
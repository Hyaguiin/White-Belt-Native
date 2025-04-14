// AppNavigator.js ou AppNavigator.tsx (Dependendo do seu setup)
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { CarrinhoProvider } from "@/components/cartContext/CartContext"; // Importando o CarrinhoProvider
import Login from "@/app/(tabs)/login";
import BottomTabBarNavigator from "@/app/(tabs)/BottomTabNavigator";
import Header from "@/components/header/Header";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <CarrinhoProvider>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Main"
          component={BottomTabBarNavigator}
          options={{
            headerShown: true,
            header: () => <Header />,
          }}
        />
      </Stack.Navigator>
    </CarrinhoProvider>
  );
}

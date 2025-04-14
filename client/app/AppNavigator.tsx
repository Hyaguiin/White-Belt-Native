// AppNavigator.js ou AppNavigator.tsx
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { CarrinhoProvider } from "@/components/cartContext/CartContext";
import Login from "@/app/(tabs)/login";
import BottomTabBarNavigator from "@/app/(tabs)/BottomTabNavigator";
import Header from "@/components/header/Header";
import Chat from "../pages/chat/Chat";

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
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{ headerShown: true, title: "Chat" }}
        />
      </Stack.Navigator>
    </CarrinhoProvider>
  );
}
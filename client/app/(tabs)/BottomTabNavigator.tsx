// BottomTabBarNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '@/pages/home/home'; 
import Cigar from '@/components/products/cigar/Cigar';
import Horse from '@/components/products/horse/Horse'; 
import Ionicons from 'react-native-vector-icons/Ionicons'; 

const Tab = createBottomTabNavigator();

export default function BottomTabBarNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#FACC15', 
        tabBarInactiveTintColor: '#fff', 
        tabBarStyle: { backgroundColor: '#000', paddingBottom: 5 }, 
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home} 
        options={{
          tabBarLabel: 'Home', 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} /> 
          ),
        }}
      />
      <Tab.Screen
        name="Products"
        component={Cigar} 
        options={{
          tabBarLabel: 'Produtos', 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} /> 
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Horse} 
        options={{
          tabBarLabel: 'Perfil', 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} /> 
          ),
        }}
      />
    </Tab.Navigator>
  );
}
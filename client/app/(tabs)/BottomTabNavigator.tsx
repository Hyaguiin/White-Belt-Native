import React from 'react';
import { TouchableOpacity } from 'react-native'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ParamListBase } from '@react-navigation/native';
import Perfil from '@/pages/profile/Profile';
import Home from '@/pages/home/home'; 
import ProdutoPage from '@/pages/productsPage/ProductsPage';
import Carrinho from '@/pages/carrinho/Carrinho';
import Login from './login';


type BottomTabBarNavigatorProps = {
  navigation: BottomTabNavigationProp<ParamListBase>;
};

const Tab = createBottomTabNavigator();

export default function BottomTabBarNavigator({ navigation }: BottomTabBarNavigatorProps) {
  
const handleLogout = () => {
  navigation.reset({
    index: 0,
    routes: [{ name: 'Login' }],
  });
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
          headerShown: false,
        }}
      />

      {/* Aba Produtos */}
      <Tab.Screen
        name="Products"
        component={ProdutoPage}
        options={{
          tabBarLabel: 'Produtos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />

      {/* Aba Perfil */}
      <Tab.Screen
        name="Profile"
        component={Perfil}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          headerShown: false,
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
          headerShown: false,
        }}
      />

      {/* Aba Logout */}
      <Tab.Screen
        name="Logout"
        component={EmptyScreen} 
        options={{
          tabBarLabel: 'Logout',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="log-out-outline" size={size} color={color} />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={handleLogout} 
              disabled={false} 
              delayLongPress={undefined} 
              onBlur={undefined} 
              onFocus={undefined} 
              onLongPress={undefined} 
              onPressIn={undefined} 
              onPressOut={undefined} 
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}


function EmptyScreen() {
  return null;
}

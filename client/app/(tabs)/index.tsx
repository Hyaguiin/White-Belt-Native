import React from 'react';
import { CartProvider } from '@/components/cartContext/CartContext'; // Ajuste o caminho conforme necessário
import AppNavigator from '@/app/AppNavigator'; // Ajuste o caminho conforme necessário

export default function App() {
  return (
    <CartProvider>
      <AppNavigator />
    </CartProvider>
  );
}
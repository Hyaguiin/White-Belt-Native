// index.tsx
import React from 'react';
import { CarrinhoProvider } from '@/components/cartContext/CartContext'; // Ajuste o caminho
import AppNavigator from '@/app/AppNavigator';
import CarrinhoProdutos from '@/pages/carrinho/Carrinho';

export default function App() {
  return (
    <CarrinhoProvider> 
      <AppNavigator />
    </CarrinhoProvider>
  );
}
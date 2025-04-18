// index.tsx
import React from "react";
import { CarrinhoProvider } from "@/components/cartContext/CartContext"; // Ajuste o caminho
import AppNavigator from "@/app/AppNavigator"; // Navegação do seu app
import CarrinhoProdutos from "@/pages/carrinho/Carrinho";  // Se ligar

export default function App() {
  return (
    <CarrinhoProvider>
      <AppNavigator />
    </CarrinhoProvider>
  );
}

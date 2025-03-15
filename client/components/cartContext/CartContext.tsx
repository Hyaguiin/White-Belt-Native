import React, { createContext, useState, useContext } from 'react';
import { Produto } from '@/app/interfaces/Produtos';



type CartContextType = {
  produtos: Produto[];
  adicionarAoCarrinho: (produto: Omit<Produto, 'quantidade'>) => void;
  alterarQuantidade: (id: string, operacao: 'incrementar' | 'decrementar') => void;
};

const CartContext = createContext<CartContextType>({
  produtos: [],
  adicionarAoCarrinho: () => {},
  alterarQuantidade: () => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const adicionarAoCarrinho = (produto: Omit<Produto, 'quantidade'>) => {
    setProdutos((prev) => {
      const produtoExistente = prev.find((p) => p.id === produto.id);
      if (produtoExistente) {
        return prev.map((p) =>
          p.id === produto.id ? { ...p, quantidade: p.quantidade + 1 } : p
        );
      }
      return [...prev, { ...produto, quantidade: 1 }]; // Adiciona a propriedade `quantidade`
    });
  };

  const alterarQuantidade = (id: string, operacao: 'incrementar' | 'decrementar') => {
    setProdutos((prev) =>
      prev.map((produto) => {
        if (produto.id === id) {
          const novaQtd =
            operacao === 'incrementar'
              ? produto.quantidade + 1
              : Math.max(0, produto.quantidade - 1);
          return { ...produto, quantidade: novaQtd };
        }
        return produto;
      })
    );
  };

  return (
    <CartContext.Provider value={{ produtos, adicionarAoCarrinho, alterarQuantidade }}>
      {children}
    </CartContext.Provider>
  );
};
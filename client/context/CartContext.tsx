import React, { createContext, useState, useContext } from "react";
import { Produto } from "@/types/Produtos";

type CartContextType = {
  produtos: Produto[];
  adicionarAoCarrinho: (produto: Omit<Produto, "quantidade">) => void;
  alterarQuantidade: (id: string, operacao: "incrementar" | "decrementar") => void;
  limparCarrinho: () => void;
};

const CartContext = createContext<CartContextType>({
  produtos: [],
  adicionarAoCarrinho: () => {},
  alterarQuantidade: () => {},
  limparCarrinho: () => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const adicionarAoCarrinho = (produto: Omit<Produto, "quantidade">) => {
    setProdutos((prev) => {
      const produtoExistente = prev.find((p) => p.id === produto.id);
      if (produtoExistente) {
        return prev.map((p) => (p.id === produto.id ? { ...p, quantidade: p.quantidade + 1 } : p));
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  };

  const alterarQuantidade = (id: string, operacao: "incrementar" | "decrementar") => {
    setProdutos((prev) =>
      prev.map((produto) => {
        if (produto.id === id) {
          const novaQtd = operacao === "incrementar" ? produto.quantidade + 1 : Math.max(0, produto.quantidade - 1);
          return { ...produto, quantidade: novaQtd };
        }
        return produto;
      })
    );
  };

  const limparCarrinho = () => {
    setProdutos([]);
  };

  return (
    <CartContext.Provider value={{ produtos, adicionarAoCarrinho, alterarQuantidade, limparCarrinho }}>{children}</CartContext.Provider>
  );
};

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { ProdutoNoCarrinho } from "@/interfaces/ProdutoNoCarrinho";
import { CarrinhoProviderProps } from "@/interfaces/CarrinhoProviderProps";
import { CarrinhoContextData } from "@/interfaces/FinalizarCompra";




const CarrinhoContext = createContext<CarrinhoContextData>(
  {} as CarrinhoContextData
);

export const CarrinhoProvider: React.FC<CarrinhoProviderProps> = ({
  children,
}) => {
  const [produtos, setProdutos] = useState<ProdutoNoCarrinho[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [carrinhoId, setCarrinhoId] = useState<string | null>(null);

  const carregarCarrinho = async () => {
    try {
      const produtosResponse = await axios.get("http://localhost:5000/carrinho/produto");
      console.log("Resposta da API:", produtosResponse.data); // Verifique os dados da resposta da API
  
      // Mapear os produtos para adicionar a quantidade
      const produtosData = produtosResponse.data.map((p: any) => ({
        ...p,
        quantidade: 1, // Adiciona a quantidade inicial
      }));
  
      // Atualiza o estado com os produtos carregados
      setProdutos(produtosData);
  
      // Se houver produtos, calcula o total
      if (produtosData.length > 0) {
        await calcularTotal();
      }
    } catch (error) {
      console.error("Erro ao carregar carrinho:", error);
    }
  };
  
  

  const calcularTotal = async () => {
    try {
      if (!carrinhoId) return;

      const response = await axios.get(
        `http://localhost:5000/carrinho/${carrinhoId}/total`
      );
      setTotal(response.data.total);
    } catch (error) {
      console.error("Erro ao calcular total:", error);
    }
  };

  const adicionarAoCarrinho = async (produto: ProdutoNoCarrinho) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/carrinho/adicionar",
        {
          produtoId: produto._id,
          tipo: produto.tipo,
        }
      );

      if (response.data._id && !carrinhoId) {
        setCarrinhoId(response.data._id);
      }

      await carregarCarrinho();
      await calcularTotal();
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
      throw error;
    }
  };

  const removerDoCarrinho = async (produtoId: string) => {
    try {
      await axios.post("http://localhost:5000/carrinho/remover", {
        produtoId,
      });

      await carregarCarrinho();
      await calcularTotal();
    } catch (error) {
      console.error("Erro ao remover do carrinho:", error);
      throw error;
    }
  };

  const alterarQuantidade = async (
    produtoId: string,
    operacao: "incrementar" | "decrementar"
  ) => {
    try {
      setProdutos((prevProdutos) =>
        prevProdutos.map((produto) => {
          if (produto._id === produtoId) {
            const novaQuantidade =
              operacao === "incrementar"
                ? produto.quantidade + 1
                : Math.max(1, produto.quantidade - 1);

            if (novaQuantidade === 0) {
              removerDoCarrinho(produtoId);
              return produto;
            }

            return { ...produto, quantidade: novaQuantidade };
          }
          return produto;
        })
      );

      await calcularTotal();
    } catch (error) {
      console.error("Erro ao alterar quantidade:", error);
      await carregarCarrinho();
    }
  };

  const finalizarCompra = async (dadosCompra: {
    cep: string;
    cupom: string;
    produtos: Array<{
      produtoId: string;
      tipo: "Charuto" | "Whisky" | "Cavalo";
      quantidade: number;
    }>;
  }) => {
    try {
      await axios.post("http://localhost:5000/compras/finalizar", dadosCompra);
      setProdutos([]);
      setTotal(0);
    } catch (error) {
      console.error("Erro ao finalizar compra:", error);
      throw error;
    }
  };

  useEffect(() => {
    carregarCarrinho();
  }, []);

  return (
    <CarrinhoContext.Provider
      value={{
        produtos,
        total,
        adicionarAoCarrinho,
        removerDoCarrinho,
        alterarQuantidade,
        carregarCarrinho,
        calcularTotal,
        finalizarCompra,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCart = () => useContext(CarrinhoContext);

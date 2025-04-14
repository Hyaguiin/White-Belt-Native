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
import { AxiosError } from "axios";

const API_BASE_URL = __DEV__
  ? "http://localhost:5000"
  : "https://seuservidor.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

const CarrinhoContext = createContext<CarrinhoContextData>(
  {} as CarrinhoContextData
);

export const CarrinhoProvider: React.FC<CarrinhoProviderProps> = ({
  children,
}) => {
  const [produtos, setProdutos] = useState<ProdutoNoCarrinho[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [carrinhoId, setCarrinhoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const carregarCarrinho = async () => {
    setLoading(true);
    try {
      const carrinhoResponse = await api.get(`${API_BASE_URL}/carrinho/produto`);
      if (Array.isArray(carrinhoResponse.data)) {
        const produtosComQuantidade = carrinhoResponse.data.map((produto: any) => ({
          ...produto,
          quantidade: 1, // Exemplo, você pode ajustar a lógica aqui
          tipo: "Misto", // Ajuste conforme a lógica dos tipos
        }));
        setProdutos(produtosComQuantidade);
      }
    } catch (error) {
      console.error("Erro ao carregar o carrinho:", error);
    } finally {
      setLoading(false);
    }
  };

 

  const calcularTotal = async () => {
    try {
      if (!carrinhoId) return;

      const response = await axios.get(
        `${API_BASE_URL}/carrinho/${carrinhoId}/total`
      );
      setTotal(response.data.total);
    } catch (error) {
      console.error("Erro ao calcular total:", error);
    }
  };

  const adicionarAoCarrinho = async (produto: ProdutoNoCarrinho) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/carrinho/adicionar`, {
        produtoId: produto._id,
        tipo: produto.tipo,
      });

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
      await axios.post(`${API_BASE_URL}/carrinho/remover`, {
        produtoId,
      });

      await carregarCarrinho();
      await calcularTotal();
    } catch (error) {
      console.error("Erro ao remover do carrinho:", error);
      throw error;
    } finally {
      setLoading(false);
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
      await axios.post(`${API_BASE_URL}/compras/finalizar`, dadosCompra);
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
        carregarCarrinho, // Garanta que está incluída aqui
        adicionarAoCarrinho,
        removerDoCarrinho,
        alterarQuantidade,
        calcularTotal,
        finalizarCompra,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};
  export const useCart = () => useContext(CarrinhoContext);

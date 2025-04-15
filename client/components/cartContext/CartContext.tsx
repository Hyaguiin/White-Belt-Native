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

const API_BASE_URL = __DEV__
  ? "http://localhost:5000"
  : "https://seuservidor.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  //timeout: 10000
});

const CarrinhoContext = createContext<CarrinhoContextData>(
  {} as CarrinhoContextData
);

export const CarrinhoProvider: React.FC<CarrinhoProviderProps> = ({
  children,
}) => {
  const [produtos, setProdutos] = useState<ProdutoNoCarrinho[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const carregarCarrinho = async () => {
    setLoading(true);
    setError(null);
    try {
      const [produtosResponse] = await Promise.all([
        api.get("/carrinho/produto"),
      ]);

      setProdutos(
        produtosResponse.data.map((produto: any) => ({
          ...produto,
          quantidade: produto.quantidade || 1,
        }))
      );
    } catch (err) {
      console.error("Erro ao carregar carrinho:", err);
      setError("Não foi possível carregar o carrinho");
    } finally {
      setLoading(false);
    }
  };

  const adicionarAoCarrinho = async (produto: ProdutoNoCarrinho) => {
    setLoading(true);
    setError(null);
    try {
      await api.post("/carrinho/adicionar", {
        produtoId: produto._id,
        tipo: produto.tipo,
      });
      await carregarCarrinho();
    } catch (err) {
      console.error("Erro ao adicionar ao carrinho:", err);
      setError("Não foi possível adicionar o produto ao carrinho");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removerDoCarrinho = async (produtoId: string) => {
    setLoading(true);
    setError(null);
    try {
      await api.post("/carrinho/remover", { produtoId });
      await carregarCarrinho();
    } catch (err) {
      console.error("Erro ao remover do carrinho:", err);
      setError("Não foi possível remover o produto do carrinho");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const alterarQuantidade = async (
    produtoId: string,
    operacao: "incrementar" | "decrementar"
  ) => {
    setLoading(true);
    setError(null);
    try {
      // Atualiza localmente primeiro para resposta rápida
      setProdutos((prevProdutos) =>
        prevProdutos.map((produto) => {
          if (produto._id === produtoId) {
            const novaQuantidade =
              operacao === "incrementar"
                ? produto.quantidade + 1
                : Math.max(1, produto.quantidade - 1);
            return { ...produto, quantidade: novaQuantidade };
          }
          return produto;
        })
      );

      // Sincroniza com o backend
      // (Você pode implementar uma rota específica para atualizar quantidade se necessário)
      await carregarCarrinho();
    } catch (err) {
      console.error("Erro ao alterar quantidade:", err);
      setError("Não foi possível alterar a quantidade");
      await carregarCarrinho(); // Recarrega o estado real do carrinho
    } finally {
      setLoading(false);
    }
  };

  const calcularTotal = async () => {
    try {
      const response = await api.get("/carrinho/total");
      setTotal(response.data.total || 0);
    } catch (err) {
      console.error("Erro ao calcular total:", err);
      setError("Não foi possível calcular o total");
      throw err;
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
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/carrinho/finalizar", dadosCompra);
      // Limpa o carrinho após finalização
      setProdutos([]);
      setTotal(0);
      return response.data;
    } catch (err) {
      console.error("Erro ao finalizar compra:", err);
      setError("Não foi possível finalizar a compra");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Carrega o carrinho quando o provider é montado
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

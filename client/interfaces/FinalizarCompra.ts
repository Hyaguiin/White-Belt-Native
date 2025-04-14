import { ProdutoNoCarrinho } from "./ProdutoNoCarrinho";

export interface CarrinhoContextData {
    produtos: ProdutoNoCarrinho[];
    total: number;
    adicionarAoCarrinho: (produto: ProdutoNoCarrinho) => Promise<void>;
    removerDoCarrinho: (produtoId: string) => Promise<void>;
    alterarQuantidade: (
      produtoId: string,
      operacao: "incrementar" | "decrementar"
    ) => Promise<void>;
    carregarCarrinho: () => Promise<void>;
    calcularTotal: () => Promise<void>;
    finalizarCompra: (dadosCompra: {
      cep: string;
      cupom: string;
      produtos: Array<{
        produtoId: string;
        tipo: "Charuto" | "Whisky" | "Cavalo";
        quantidade: number;
      }>;
    }) => Promise<void>;
  }
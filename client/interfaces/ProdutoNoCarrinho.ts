import { TipoProduto } from "@/types/TipoProduto";

export interface ProdutoNoCarrinho {
  _id: string;
  nome: string;
  tipo: TipoProduto;
  preco: number;
  foto: string;
  quantidade: number;
}

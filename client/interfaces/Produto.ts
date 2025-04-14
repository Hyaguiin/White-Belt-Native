import { TipoProduto } from "@/types/TipoProduto";

export interface Produto {
  _id: string;
  nome: string;
  tipo: TipoProduto;
  preco: number;
  foto: string;
  descricao?: string;
}

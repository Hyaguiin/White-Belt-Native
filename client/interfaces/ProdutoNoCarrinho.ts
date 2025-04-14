export interface ProdutoNoCarrinho {
    _id: string;
    nome: string;
    tipo: "Charuto" | "Whisky" | "Cavalo";
    preco: number;
    foto: string;
    quantidade: number;
  }
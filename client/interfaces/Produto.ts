export interface Produto {
    _id: string;
    nome: string;
    tipo: "Charuto" | "Whisky" | "Cavalo";
    preco: number;
    foto: string;
    descricao?: string;
  }
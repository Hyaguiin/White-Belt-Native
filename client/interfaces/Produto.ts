export interface Produto {
    _id: string;
    nome: string;
    tipo: "Charuto" | "Whisky" | "Cavalo" | "Misto";
    preco: number;
    foto: string;
    descricao?: string;
  }
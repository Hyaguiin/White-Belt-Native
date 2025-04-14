import mongoose, { Schema, Document, Types } from "mongoose";

export interface Produto extends Document {
  tipo: "Charuto" | "Whisky" | "Cavalo";
  nome: string;
  quantidade: number;
  foto: string;
  preco: number;
  descricao: string;
}

const ProdutoSchema = new Schema<Produto>(
  {
    tipo: {
      type: String,
      required: true,
      enum: ["Charuto", "Whisky", "Cavalo"],
    },
    nome: { type: String, required: true },
    quantidade: { type: Number, required: true },
    foto: { type: String, required: true },
    preco: { type: Number, required: true },
    descricao: { type: String, required: true },
  },
  { collection: "produtos" }
);

export const ProdutoModel = mongoose.model<Produto>("Produto", ProdutoSchema);

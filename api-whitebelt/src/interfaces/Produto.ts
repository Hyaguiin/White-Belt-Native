// In your Produto model file
import mongoose, { Schema, Document, Types } from "mongoose";

export interface Produto extends Document {
  tipo: "Charuto" | "Whisky" | "Cavalo";
  nome: string;
  foto: string;
  preco: number;
  descricao: string;
}

const ProdutoSchema = new Schema<Produto>({
  tipo: { 
    type: String, 
    required: true, 
    enum: ["Charuto", "Whisky", "Cavalo"] 
  },
  nome: { type: String, required: true },
  foto: { type: String, required: true },
  preco: { type: Number, required: true },
  descricao: { type: String, required: true }
}, { collection: "produtos" });

export const ProdutoModel = mongoose.model<Produto>("Produto", ProdutoSchema);

// Remove or deprecate the separate CharutoModel, WhiskyModel, etc.
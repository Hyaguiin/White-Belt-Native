import mongoose, { Schema, Document } from "mongoose";

export interface Charuto extends Document {
  nome: string;
  foto: string;
  preco: number;
  descricao: string;
}

const CharutoSchema = new Schema<Charuto>({
  nome: { type: String, required: true },
  foto: { type: String, required: true },
  preco: { type: Number, required: true },
  descricao: { type: String, required: true },
});

export const CharutoModel = mongoose.model<Charuto>("Charuto", CharutoSchema);

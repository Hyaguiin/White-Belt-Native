import mongoose, { Schema, Document } from "mongoose";

export interface Cavalo extends Document {
  nome: string;
  foto: string;
  preco: number;
  descricao: string;
}

const CavaloSchema = new Schema<Cavalo>({
  nome: { type: String, required: true },
  foto: { type: String, required: true },
  preco: { type: Number, required: true },
  descricao: { type: String, required: true },
});

export const CavaloModel = mongoose.model<Cavalo>("Cavalo", CavaloSchema);

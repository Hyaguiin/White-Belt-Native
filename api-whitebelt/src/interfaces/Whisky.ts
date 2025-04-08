import mongoose, { Schema, Document } from "mongoose";

export interface Whisky extends Document {
  nome: string;
  foto: string;
  preco: number;
  descricao: string;
}

const WhiskySchema = new Schema<Whisky>({
  nome: { type: String, required: true },
  foto: { type: String, required: true },
  preco: { type: Number, required: true },
  descricao: { type: String, required: true },
});

export const WhiskyModel = mongoose.model<Whisky>("Whisky", WhiskySchema);

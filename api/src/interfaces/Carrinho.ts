import mongoose, { Schema, Document, Types } from "mongoose";

interface Carrinho extends Document {
  produtos: Types.ObjectId[];
  total: number;
}

const CarrinhoSchema = new Schema<Carrinho>({
  produtos: [{ type: Schema.Types.ObjectId, ref: "Produto" }],
  total: { type: Number, default: 0 },
});

export const CarrinhoModel = mongoose.model<Carrinho>(
  "Carrinho",
  CarrinhoSchema
);

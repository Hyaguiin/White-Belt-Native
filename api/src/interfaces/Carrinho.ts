// models/Carrinho.ts
import { Schema, model, Types, Document } from "mongoose";

interface ICarrinho extends Document {
  produtos: Types.ObjectId[];
  produtosModelo: string; // Adicione esta linha
  total: number;
}

const CarrinhoSchema = new Schema<ICarrinho>({
  produtos: [{
    type: Schema.Types.ObjectId,
    refPath: 'produtosModelo' // Referência dinâmica
  }],
  produtosModelo: {
    type: String,
    enum: ['Charuto', 'Cavalo', 'Whisky'],
    required: true
  },
  total: { type: Number, default: 0 }
});

export const CarrinhoModel = model<ICarrinho>('Carrinho', CarrinhoSchema);
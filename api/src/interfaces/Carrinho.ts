import { Schema, model, Types, Document } from "mongoose";

interface ICarrinho extends Document {
  userId: Types.ObjectId;
  produtos: Types.ObjectId[];
  produtosModelo: string;
  total: number;
}

const CarrinhoSchema = new Schema<ICarrinho>({
  userId: { type: Schema.Types.ObjectId, required: true },
  produtos: [
    {
      type: Schema.Types.ObjectId,
      refPath: "produtosModelo",
    },
  ],
  produtosModelo: {
    type: String,
    enum: ["Charuto", "Cavalo", "Whisky"],
    required: true,
  },
  total: { type: Number, default: 0 },
});

export const CarrinhoModel = model<ICarrinho>("Carrinho", CarrinhoSchema);

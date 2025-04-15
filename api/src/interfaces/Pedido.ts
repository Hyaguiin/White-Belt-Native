// interfaces/Pedido.ts
import { Document, Schema, model } from "mongoose";
import { Produto } from "./Produto";
import { Types } from "mongoose";

export interface Pedido extends Document {
  produtos: Types.ObjectId[];
  total: number;
  data: Date;
  status: "pendente" | "completo" | "cancelado";
}

const PedidoSchema = new Schema<Pedido>({
  produtos: [{ type: Schema.Types.ObjectId, ref: "Produto" }],
  total: { type: Number, required: true },
  data: { type: Date, default: Date.now },
  status: { type: String, enum: ["pendente", "completo", "cancelado"], default: "pendente" }
});

export const PedidoModel = model<Pedido>("Pedido", PedidoSchema);
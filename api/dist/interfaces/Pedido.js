"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoModel = void 0;
// interfaces/Pedido.ts
const mongoose_1 = require("mongoose");
const PedidoSchema = new mongoose_1.Schema({
    produtos: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Produto" }],
    total: { type: Number, required: true },
    data: { type: Date, default: Date.now },
    status: { type: String, enum: ["pendente", "completo", "cancelado"], default: "pendente" }
});
exports.PedidoModel = (0, mongoose_1.model)("Pedido", PedidoSchema);

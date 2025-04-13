"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarrinhoModel = void 0;
// models/Carrinho.ts
const mongoose_1 = require("mongoose");
const CarrinhoSchema = new mongoose_1.Schema({
    produtos: [{
            type: mongoose_1.Schema.Types.ObjectId,
            refPath: 'produtosModelo' // Referência dinâmica
        }],
    produtosModelo: {
        type: String,
        enum: ['Charuto', 'Cavalo', 'Whisky'],
        required: true
    },
    total: { type: Number, default: 0 }
});
exports.CarrinhoModel = (0, mongoose_1.model)('Carrinho', CarrinhoSchema);

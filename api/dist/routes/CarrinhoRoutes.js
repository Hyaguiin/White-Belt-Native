"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CarrinhoController_1 = require("../controller/CarrinhoController");
const router = express_1.default.Router();
router.post("/adicionar", CarrinhoController_1.adicionarProdutoAoCarrinhoController);
router.post("/remover", CarrinhoController_1.removerProdutoDoCarrinhoController);
router.get("/:carrinhoId/total", CarrinhoController_1.calcularTotalCarrinhoController);
router.get("/produto", CarrinhoController_1.listarProdutosDoCarrinhoController);
router.post("/finalizar", CarrinhoController_1.finalizarPedidoController);
router.get("/pedidos", CarrinhoController_1.listarPedidosAnterioresController);
exports.default = router;

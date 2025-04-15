import express from "express";
import {
  adicionarProdutoAoCarrinhoController,
  removerProdutoDoCarrinhoController,
  calcularTotalCarrinhoController,
  listarProdutosDoCarrinhoController,
  finalizarPedidoController,
  listarPedidosAnterioresController
} from "../controller/CarrinhoController";

const router = express.Router();

router.post("/adicionar", adicionarProdutoAoCarrinhoController);

router.post("/remover", removerProdutoDoCarrinhoController);

router.get("/:carrinhoId/total", calcularTotalCarrinhoController);

router.get("/produto", listarProdutosDoCarrinhoController);


router.post("/finalizar", finalizarPedidoController);
router.get("/pedidos", listarPedidosAnterioresController);

export default router;

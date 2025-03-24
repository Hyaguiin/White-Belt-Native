import express from "express";
import {
  adicionarProdutoAoCarrinhoController,
  removerProdutoDoCarrinhoController,
  calcularTotalCarrinhoController,
  listarProdutosDoCarrinhoController,
} from "../controller/CarrinhoController";

const router = express.Router();

router.post("/adicionar", adicionarProdutoAoCarrinhoController);

router.post("/remover", removerProdutoDoCarrinhoController);

router.get("/:carrinhoId/total", calcularTotalCarrinhoController);

router.get("/produto", listarProdutosDoCarrinhoController);

export default router;

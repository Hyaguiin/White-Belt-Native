import express from "express";
import {
  adicionarProdutoAoCarrinhoController,
  removerProdutoDoCarrinhoController,
  calcularTotalCarrinhoController,
  listarProdutosDoCarrinhoController,
} from "../controller/CarrinhoController";
import { autenticarUsuario } from "../middleware/AuthMiddleware";

const carrinhoRouter = express.Router();

carrinhoRouter.post("/adicionar", autenticarUsuario, adicionarProdutoAoCarrinhoController);
carrinhoRouter.post("/remover", autenticarUsuario, removerProdutoDoCarrinhoController);
carrinhoRouter.get("/:carrinhoId/total", autenticarUsuario, calcularTotalCarrinhoController);
carrinhoRouter.get("/produto/:userId", autenticarUsuario, listarProdutosDoCarrinhoController);

export default carrinhoRouter;

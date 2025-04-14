import express from "express";
import {
  createProdutoController,
  getAllProdutosController,
  getProdutoByIdController,
  deleteProdutoByIdController,
  updateProdutoByIdController,
} from "../controller/ProdutoController";
import { verificarAdmin } from "../middleware/AdminAuth";

const produtoRouter = express.Router();

produtoRouter.post("/", verificarAdmin, createProdutoController);
produtoRouter.get("/", verificarAdmin, getAllProdutosController);
produtoRouter.get("/:id", verificarAdmin, getProdutoByIdController);
produtoRouter.delete("/:id", verificarAdmin, deleteProdutoByIdController);
produtoRouter.put("/:id", verificarAdmin, updateProdutoByIdController);

export default produtoRouter;

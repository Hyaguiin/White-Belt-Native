import express from "express";
import {
  createUsuarioController,
  getAllUsuariosController,
  getUsuarioByIdController,
  updateUsuarioByIdController,
  deleteUsuarioByIdController,
  loginController,
  updatePasswordController,
  getUsuarioByEmailController,
} from "../controller/UsuarioController";
import { autenticarUsuario } from "../middleware/AuthMiddleware";
import { verificarAdmin } from "../middleware/AdminAuth";

const usuarioRouter = express.Router();

usuarioRouter.post("/criar", createUsuarioController);
usuarioRouter.post("/login", loginController);

usuarioRouter.get("/", verificarAdmin, getAllUsuariosController);
usuarioRouter.get("/:id", verificarAdmin, getUsuarioByIdController);
usuarioRouter.get("/email/:email", verificarAdmin, getUsuarioByEmailController);
usuarioRouter.put("/:id", verificarAdmin, updateUsuarioByIdController);
usuarioRouter.delete("/:id", verificarAdmin, deleteUsuarioByIdController);
usuarioRouter.put("/:id/senha", verificarAdmin, updatePasswordController);

export default usuarioRouter;

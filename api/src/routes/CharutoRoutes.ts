import express from "express";

import {
  createCharutoController,
  getAllCharutosController,
  getCharutoByIdController,
  deleteCharutoByIdController,
  updateCharutoByIdController,
} from "../controller/CharutoController";

const router = express.Router();

router.post("/", createCharutoController);
router.get("/", getAllCharutosController);
router.get("/:id", getCharutoByIdController);
router.delete("/:id", deleteCharutoByIdController);
router.put("/:id", updateCharutoByIdController);

export default router;
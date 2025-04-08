import express from "express";
import {
  createCavaloController,
  getAllCavalosController,
  getCavaloByIdController,
  deleteCavaloByIdController,
  updateCavaloByIdController,
} from '../controller/CavaloController';

const router = express.Router();

router.post("/", createCavaloController);
router.get("/", getAllCavalosController);
router.get("/:id", getCavaloByIdController);
router.delete("/:id", deleteCavaloByIdController);
router.put("/:id", updateCavaloByIdController);

export default router;
import express from "express";
import {
  createWhiskyController,
  getAllWhiskiesController,
  getWhiskyByIdController,
  deleteWhiskyByIdController,
  updateWhiskyByIdController,
} from "../controller/WhiskyController";

const router = express.Router();

router.post("/", createWhiskyController);
router.get("/", getAllWhiskiesController);
router.get("/:id", getWhiskyByIdController);
router.delete("/:id", deleteWhiskyByIdController);
router.put("/:id", updateWhiskyByIdController);

export default router;

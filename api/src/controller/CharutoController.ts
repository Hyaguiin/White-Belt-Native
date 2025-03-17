import { Request, Response } from "express";
import {
  createCharuto,
  getAllCharutos,
  getCharutoById,
  deleteCharutoById,
  updateCharutoById,
} from "../services/CharutoService";

export const createCharutoController = async (req: Request, res: Response): Promise<void> => {
  try {
    const charuto = await createCharuto(req.body);
    res.status(201).json(charuto);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllCharutosController = async (req: Request, res: Response): Promise<void> => {
  try {
    const charutos = await getAllCharutos();
    res.status(200).json(charutos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCharutoByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const charuto = await getCharutoById(req.params.id);
    if (charuto) {
      res.status(200).json(charuto);
    } else {
      res.status(404).json({ message: "Charuto não encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteCharutoByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const charuto = await deleteCharutoById(req.params.id);
    if (charuto) {
      res.status(200).json(charuto);
    } else {
      res.status(404).json({ message: "Charuto não encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCharutoByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const charuto = await updateCharutoById(req.params.id, req.body);
    if (charuto) {
      res.status(200).json(charuto);
    } else {
      res.status(404).json({ message: "Charuto não encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
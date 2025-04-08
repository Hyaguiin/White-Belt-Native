import { Request, Response } from "express";
import {
  createCavalo,
  getAllCavalos,
  getCavalosById,
  deleteCavaloById,
  updateCavaloById,
} from "../services/CavaloService";

export const createCavaloController = async (req: Request, res: Response): Promise<void> => {
  try {
    const cavalo = await createCavalo(req.body);
    res.status(201).json(cavalo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllCavalosController = async (req: Request, res: Response): Promise<void> => {
  try {
    const cavalos = await getAllCavalos();
    res.status(200).json(cavalos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCavaloByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const cavalo = await getCavalosById(req.params.id);
    if (cavalo) {
      res.status(200).json(cavalo);
    } else {
      res.status(404).json({ message: "Cavalo não encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteCavaloByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const cavalo = await deleteCavaloById(req.params.id);
    if (cavalo) {
      res.status(200).json(cavalo);
    } else {
      res.status(404).json({ message: "Cavalo não encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCavaloByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const cavalo = await updateCavaloById(req.params.id, req.body);
    if (cavalo) {
      res.status(200).json(cavalo);
    } else {
      res.status(404).json({ message: "Cavalo não encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
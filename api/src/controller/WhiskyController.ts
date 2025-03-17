import { Request, Response } from "express";
import {
  createWhisky,
  getAllWhiskies,
  getWhiskyById,
  deleteWhiskyById,
  updateWhiskyById,
} from "../services/WhiskyService";

export const createWhiskyController = async (req: Request, res: Response): Promise<void> => {
  try {
    const whisky = await createWhisky(req.body);
    res.status(201).json(whisky);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllWhiskiesController = async (req: Request, res: Response): Promise<void> => {
  try {
    const whiskies = await getAllWhiskies();
    res.status(200).json(whiskies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getWhiskyByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const whisky = await getWhiskyById(req.params.id);
    if (whisky) {
      res.status(200).json(whisky);
    } else {
      res.status(404).json({ message: "Whisky não encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteWhiskyByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const whisky = await deleteWhiskyById(req.params.id);
    if (whisky) {
      res.status(200).json(whisky);
    } else {
      res.status(404).json({ message: "Whisky não encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateWhiskyByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const whisky = await updateWhiskyById(req.params.id, req.body);
    if (whisky) {
      res.status(200).json(whisky);
    } else {
      res.status(404).json({ message: "Whisky não encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
import { Request, Response } from "express";
import {
  createProduto,
  getAllProdutos,
  getProdutoById,
  deleteProdutoById,
  updateProdutoById,
} from "../services/ProdutoService";

export const createProdutoController = async (req: Request, res: Response): Promise<void> => {
  try {
    const produto = await createProduto(req.body);
    res.status(201).json(produto);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllProdutosController = async (req: Request, res: Response): Promise<void> => {
  try {
    const produtos = await getAllProdutos();
    res.status(200).json(produtos);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getProdutoByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const produto = await getProdutoById(req.params.id);
    if (produto) {
      res.status(200).json(produto);
    } else {
      res.status(404).json({ message: "Produto não encontrado" });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteProdutoByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const produto = await deleteProdutoById(req.params.id);
    if (produto) {
      res.status(200).json(produto);
    } else {
      res.status(404).json({ message: "Produto não encontrado" });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProdutoByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const produto = await updateProdutoById(req.params.id, req.body);
    if (produto) {
      res.status(200).json(produto);
    } else {
      res.status(404).json({ message: "Produto não encontrado" });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

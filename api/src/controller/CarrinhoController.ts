import { Request, Response } from "express";
import {
  adicionarProdutoAoCarrinho,
  removerProdutoDoCarrinho,
  calcularTotalCarrinho,
  listarProdutosDoCarrinho,
} from "../services/CarrinhoService";

export const adicionarProdutoAoCarrinhoController = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Corpo da requisição (req.body):", req.body);
    console.log("Query da requisição (req.query):", req.query);

    const { produtoId, tipo } = req.body;
    const userId = req.query.userId as string;

    if (!produtoId || !tipo || !userId) {
      console.log("Erro de validação: produtoId, tipo ou userId faltando");
      res.status(400).json({ message: "produtoId, tipo e userId são obrigatórios" });
      return;
    }

    console.log("Chamando serviço adicionarProdutoAoCarrinho...");
    const carrinho = await adicionarProdutoAoCarrinho(produtoId, tipo, userId);
    res.status(200).json(carrinho);
  } catch (err) {
    console.error("Erro no controller:", err);
    res.status(500).json({ message: err instanceof Error ? err.message : "Erro desconhecido" });
  }
};

export const removerProdutoDoCarrinhoController = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Corpo da requisição (req.body):", req.body);
    console.log("Query da requisição (req.query):", req.query);

    const { produtoId } = req.body;
    const userId = req.query.userId as string;

    if (!produtoId || !userId) {
      console.log("Erro de validação: produtoId ou userId faltando");
      res.status(400).json({ message: "produtoId e userId são obrigatórios" });
      return;
    }

    console.log("Chamando serviço removerProdutoDoCarrinho...");
    const carrinho = await removerProdutoDoCarrinho(userId, produtoId);
    res.status(200).json(carrinho);
  } catch (err) {
    console.error("Erro no controller:", err);
    res.status(500).json({ message: err instanceof Error ? err.message : "Erro desconhecido" });
  }
};

export const calcularTotalCarrinhoController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.query.userId as string;

    if (!userId) {
      res.status(400).json({ message: "userId é obrigatório" });
      return;
    }

    console.log("Chamando serviço calcularTotalCarrinho...");
    const total = await calcularTotalCarrinho(userId);
    res.status(200).json({ total });
  } catch (err) {
    console.error("Erro no controller:", err);
    res.status(500).json({ message: err instanceof Error ? err.message : "Erro desconhecido" });
  }
};

export const listarProdutosDoCarrinhoController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.query.userId as string;

    if (!userId) {
      res.status(400).json({ message: "userId é obrigatório" });
      return;
    }

    console.log("Chamando serviço listarProdutosDoCarrinho...");
    const produtos = await listarProdutosDoCarrinho(userId);
    res.status(200).json(produtos);
  } catch (err) {
    console.error("Erro no controller:", err);
    res.status(500).json({ message: err instanceof Error ? err.message : "Erro desconhecido" });
  }
};

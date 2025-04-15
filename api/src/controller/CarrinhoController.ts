import { Request, Response } from "express";
import {
  adicionarProdutoAoCarrinho,
  removerProdutoDoCarrinho,
  calcularTotalCarrinho,
  listarProdutosDoCarrinho,
  listarPedidosAnteriores,
  finalizarPedido
} from "../services/CarrinhoService";

export const adicionarProdutoAoCarrinhoController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("Corpo da requisição (req.body):", req.body); // Log para depuração

    const { produtoId, tipo } = req.body;

    // Validação dos campos
    if (!produtoId || !tipo) {
      console.log("Erro de validação: produtoId ou tipo faltando"); // Log para depuração
      res.status(400).json({ message: "produtoId e tipo são obrigatórios" });
      return;
    }

    console.log("Chamando serviço adicionarProdutoAoCarrinho...");
    const carrinho = await adicionarProdutoAoCarrinho(produtoId, tipo);
    res.status(200).json(carrinho);
  } catch (err) {
    console.error("Erro no controller:", err); 
    res.status(500).json({ message: err instanceof Error ? err.message : "Erro desconhecido" });
  }
};

export const removerProdutoDoCarrinhoController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("Corpo da requisição (req.body):", req.body); 

    const { produtoId } = req.body;

   
    if (!produtoId) {
      console.log("Erro de validação: produtoId faltando"); 
      res.status(400).json({ message: "produtoId é obrigatório" });
      return;
    }

    console.log("Chamando serviço removerProdutoDoCarrinho...");
    const carrinho = await removerProdutoDoCarrinho(produtoId);
    res.status(200).json(carrinho);
  } catch (err) {
    console.error("Erro no controller:", err); 
    res.status(500).json({ message: err instanceof Error ? err.message : "Erro desconhecido" });
  }
};

export const calcularTotalCarrinhoController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("Chamando serviço calcularTotalCarrinho..."); 
    const total = await calcularTotalCarrinho();
    res.status(200).json({ total });
  } catch (err) {
    console.error("Erro no controller:", err); 
    res.status(500).json({ message: err instanceof Error ? err.message : "Erro desconhecido" });
  }
};

export const listarProdutosDoCarrinhoController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("Chamando serviço listarProdutosDoCarrinho..."); 
    const produtos = await listarProdutosDoCarrinho();
    res.status(200).json(produtos);
  } catch (err) {
    console.error("Erro no controller:", err); 
    res.status(500).json({ message: err instanceof Error ? err.message : "Erro desconhecido" });
  }
};


export const finalizarPedidoController = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Finalizando pedido...");
    
    const resultado = await finalizarPedido();
    
    res.status(200).json({
      success: true,
      pedido: resultado.pedido,
      message: "Pedido finalizado com sucesso!"
    });
  } catch (err) {
    console.error("Erro no controller finalizarPedido:", err);
    res.status(500).json({
      success: false,
      message: err instanceof Error ? err.message : "Erro ao finalizar pedido"
    });
  }
};

export const listarPedidosAnterioresController = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Listando pedidos anteriores...");
    
    const pedidos = await listarPedidosAnteriores();
    
    res.status(200).json(pedidos);
  } catch (err) {
    console.error("Erro no controller listarPedidosAnteriores:", err);
    res.status(500).json({
      success: false,
      message: "Erro ao listar pedidos anteriores"
    });
  }
};
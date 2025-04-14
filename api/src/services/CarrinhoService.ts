import { Types } from "mongoose";
import { CarrinhoModel } from "../interfaces/Carrinho";
import { Produto } from "../interfaces/Produto";
import { ProdutoModel } from "../interfaces/Produto";

import "dotenv/config";

export const adicionarProdutoAoCarrinho = async (
  produtoId: string,
  tipo: "Charuto" | "Whisky" | "Cavalo",
  userId: string
) => {
  try {
    const produto = await ProdutoModel.findById(produtoId);
    if (!produto) {
      throw new Error(`${tipo} com ID ${produtoId} não encontrado`);
    }

    let carrinho = await CarrinhoModel.findOne({ userId });

    if (!carrinho) {
      carrinho = new CarrinhoModel({
        _id: new Types.ObjectId(),
        userId,
        produtos: [],
        produtosModelo: tipo,
        total: 0,
      });
    }

    if (!carrinho.produtosModelo) {
      carrinho.produtosModelo = tipo;
    }

    carrinho.produtos.push(produto._id as Types.ObjectId);
    carrinho.total += produto.preco;

    await carrinho.save();
    return carrinho;
  } catch (err) {
    console.error(`Erro ao adicionar ${tipo}:`, err);
    throw err;
  }
};

export const removerProdutoDoCarrinho = async (produtoId: string, userId: string) => {
  try {
    const produtoObjectId = new Types.ObjectId(produtoId);
    const carrinho = await CarrinhoModel.findOne({ userId });
    if (!carrinho) {
      throw new Error("Carrinho não encontrado");
    }

    carrinho.produtos = carrinho.produtos.filter((produto) => !produto.equals(produtoObjectId));
    await carrinho.save();

    return carrinho;
  } catch (err) {
    console.error("Erro ao remover produto do carrinho:", err);
    throw err;
  }
};

export const calcularTotalCarrinho = async (userId: string) => {
  try {
    const carrinho = await CarrinhoModel.findOne({ userId }).populate<{
      produtos: Produto[];
    }>("produtos");

    if (!carrinho) {
      throw new Error("Carrinho não encontrado");
    }

    const total = carrinho.produtos.reduce((acc, produto) => acc + produto.preco, 0);

    return total;
  } catch (err) {
    console.error("Erro ao calcular total do carrinho:", err);
    throw err;
  }
};

export const listarProdutosDoCarrinho = async (userId: string) => {
  try {
    const carrinho = await CarrinhoModel.findOne({ userId })
      .populate({
        path: "produtos",
        options: { strictPopulate: false },
      })
      .exec();

    if (!carrinho) {
      throw new Error("Carrinho não encontrado");
    }

    const produtosPopulados = await Promise.all(
      carrinho.produtos.map(async (produtoId) => {
        const produto = await ProdutoModel.findById(produtoId);
        return produto ? produto.toObject() : null;
      })
    );

    return produtosPopulados.filter(Boolean);
  } catch (err) {
    console.error("Erro ao listar produtos do carrinho:", err);
    throw err;
  }
};

export async function verificarCarrinhoExistente(userId: string) {
  try {
    const carrinho = await CarrinhoModel.findOne({ userId });
    if (!carrinho) {
      const novoCarrinho = new CarrinhoModel({
        _id: new Types.ObjectId(),
        userId,
        produtos: [],
        total: 0,
      });
      await novoCarrinho.save();
    }
  } catch (err) {
    console.error("Erro ao verificar carrinho:", err);
  }
}

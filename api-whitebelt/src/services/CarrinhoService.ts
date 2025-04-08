import { Types } from "mongoose";
import { CarrinhoModel } from "../interfaces/Carrinho";
import { Produto } from "../interfaces/Produto";
import { CharutoModel } from "../interfaces/Charuto";
import { CavaloModel } from "../interfaces/Cavalo";
import { WhiskyModel } from "../interfaces/Whisky";

import "dotenv/config";

const CARRINHO_ID_FIXO = process.env.CARRINHO_ID_FIXO;

/**
 * Adiciona um produto ao carrinho.
 * @param produtoId - ID do produto a ser adicionado.
 * @param tipo - Tipo do produto.
 * @returns O carrinho atualizado.
 */

export const adicionarProdutoAoCarrinho = async (
  produtoId: string,
  tipo: "Charuto" | "Whisky" | "Cavalo"
) => {
  try {
    let produto;
    switch (tipo) {
      case "Charuto":
        produto = await CharutoModel.findById(produtoId);
        break;
      case "Whisky":
        produto = await WhiskyModel.findById(produtoId);
        break;
      case "Cavalo":
        produto = await CavaloModel.findById(produtoId);
        break;
    }

    if (!produto) {
      throw new Error(`${tipo} com ID ${produtoId} não encontrado`);
    }

    let carrinho = await CarrinhoModel.findOne();
    if (!carrinho) {
      carrinho = new CarrinhoModel({
        produtos: [],
        produtosModelo: tipo, // Adiciona o tipo do primeiro produto
        total: 0,
      });
    }

    // Atualiza o array de modelos se necessário
    if (!carrinho.produtosModelo) {
      carrinho.produtosModelo = tipo;
    }

    carrinho.produtos.push(produto._id);
    carrinho.total += produto.preco;
    await carrinho.save();

    return carrinho;
  } catch (err) {
    console.error(`Erro ao adicionar ${tipo}:`, err);
    throw err;
  }
};
/**
 * Remove um produto do carrinho.
 * @param produtoId - ID do produto a ser removido.
 * @returns O carrinho atualizado.
 */
export const removerProdutoDoCarrinho = async (produtoId: string) => {
  try {
    console.log("Removendo produto do carrinho..."); // Log para depuração
    console.log("produtoId recebido:", produtoId); // Log para depuração

    // Converter produtoId para ObjectId
    const produtoObjectId = new Types.ObjectId(produtoId);
    console.log("produtoObjectId convertido:", produtoObjectId); // Log para depuração

    // Buscar o carrinho
    const carrinho = await CarrinhoModel.findById(CARRINHO_ID_FIXO);
    if (!carrinho) {
      throw new Error("Carrinho não encontrado");
    }

    // Remover o produto do carrinho
    carrinho.produtos = carrinho.produtos.filter(
      (produto) => !produto.equals(produtoObjectId) // Comparação de ObjectId
    );
    await carrinho.save();

    console.log("Produto removido do carrinho com sucesso!"); // Log para depuração
    return carrinho;
  } catch (err) {
    console.error("Erro no serviço removerProdutoDoCarrinho:", err); // Log para depuração
    throw err;
  }
};

/**
 * Calcula o total do carrinho.
 * @returns O total do carrinho.
 */
export const calcularTotalCarrinho = async () => {
  try {
    console.log("Calculando total do carrinho..."); // Log para depuração

    // Buscar o carrinho e popular os produtos
    const carrinho = await CarrinhoModel.findById(CARRINHO_ID_FIXO).populate<{
      produtos: Produto[];
    }>("produtos");
    if (!carrinho) {
      throw new Error("Carrinho não encontrado");
    }

    // Calcular o total
    const total = carrinho.produtos.reduce(
      (acc, produto) => acc + produto.preco,
      0
    );

    console.log("Total calculado:", total); // Log para depuração
    return total;
  } catch (err) {
    console.error("Erro no serviço calcularTotalCarrinho:", err); // Log para depuração
    throw err;
  }
};

/**
 * Lista os produtos do carrinho.
 * @returns A lista de produtos no carrinho.
 */
export const listarProdutosDoCarrinho = async () => {
  try {
    const carrinho = await CarrinhoModel.findOne()
      .populate({
        path: "produtos",
        options: { strictPopulate: false }, // Permite população sem modelo definido
      })
      .exec();

    if (!carrinho) {
      throw new Error("Carrinho não encontrado");
    }

    // População manual para garantir todos os tipos
    const produtosPopulados = await Promise.all(
      carrinho.produtos.map(async (produtoId) => {
        const charuto = await CharutoModel.findById(produtoId);
        const cavalo = await CavaloModel.findById(produtoId);
        const whisky = await WhiskyModel.findById(produtoId);
        return charuto || cavalo || whisky;
      })
    );

    return produtosPopulados.filter(Boolean);
  } catch (err) {
    console.error("Erro ao listar produtos:", err);
    throw err;
  }
};

export async function criarCarrinhoInicial() {
  try {
    const carrinhoId = process.env.CARRINHO_ID_FIXO || "carrinho-fixo-id";
    console.log("ID do carrinho:", process.env.CARRINHO_ID_FIXO);

    // Verifica se o ID é um ObjectId válido
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(carrinhoId);

    const carrinhoExistente = isObjectId
      ? await CarrinhoModel.findById(carrinhoId)
      : await CarrinhoModel.findOne({ _id: carrinhoId });

    if (!carrinhoExistente) {
      const novoCarrinho = new CarrinhoModel({
        _id: isObjectId ? new Types.ObjectId(carrinhoId) : carrinhoId,
        produtos: [],
        total: 0,
      });
      await novoCarrinho.save();
      console.log("Carrinho inicial criado com sucesso!");
    }
  } catch (err) {
    console.error("Erro ao criar carrinho inicial:", err);
  }
}

export async function verificarCarrinhoExistente() {
  try {
    const carrinho = await CarrinhoModel.findById(CARRINHO_ID_FIXO);
    if (!carrinho) {
      const novoCarrinho = new CarrinhoModel({
        _id: new Types.ObjectId(CARRINHO_ID_FIXO),
        produtos: [],
        total: 0,
      });
      await novoCarrinho.save();
      console.log("Carrinho inicial criado com sucesso!");
    }
  } catch (err) {
    console.error("Erro ao verificar carrinho:", err);
  }
}

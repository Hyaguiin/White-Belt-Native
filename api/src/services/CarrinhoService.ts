import { Types } from "mongoose";
import { CarrinhoModel } from "../interfaces/Carrinho";
import { Produto, ProdutoModel } from "../interfaces/Produto";
import { CharutoModel } from "../interfaces/Charuto";
import { CavaloModel } from "../interfaces/Cavalo";
import { WhiskyModel } from "../interfaces/Whisky";
import { PedidoModel } from "../interfaces/Pedido";

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
        produtosModelo: 'Misto', // Agora usamos 'Misto' para carrinhos com múltiplos tipos
        total: 0,
      });
    }

    // Remove a verificação de produtosModelo - não precisamos mais
    carrinho.produtos.push(produto._id);
    carrinho.total += produto.preco;
    
    // Verifica se precisa mudar para 'Misto'
    if (carrinho.produtosModelo !== 'Misto' && carrinho.produtosModelo !== tipo) {
      carrinho.produtosModelo = 'Misto';
    }
    
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
 * @returns A lista de produtos no carrinho.
 */
export const listarProdutosDoCarrinho = async (): Promise<any[]> => {
  try {
    const carrinho = await CarrinhoModel.findById(CARRINHO_ID_FIXO).exec();
    
    if (!carrinho?.produtos?.length) return [];

    if (carrinho.produtosModelo === 'Misto') {
      const charutos = await CharutoModel.find({ _id: { $in: carrinho.produtos } });
      const whiskys = await WhiskyModel.find({ _id: { $in: carrinho.produtos } });
      const cavalos = await CavaloModel.find({ _id: { $in: carrinho.produtos } });
      return [...charutos, ...whiskys, ...cavalos];
    }
    
    switch(carrinho.produtosModelo) {
      case 'Charuto':
        return await CharutoModel.find({ _id: { $in: carrinho.produtos } });
      case 'Whisky':
        return await WhiskyModel.find({ _id: { $in: carrinho.produtos } });
      case 'Cavalo':
        return await CavaloModel.find({ _id: { $in: carrinho.produtos } });
      default:
        return [];
    }
  } catch (err) {
    console.error("Erro ao listar produtos:", err);
    return [];
  }
};
export async function criarCarrinhoInicial() {
  try {
    const carrinhoId = process.env.CARRINHO_ID_FIXO || "carrinho-fixo-id";
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(carrinhoId);

    const carrinhoExistente = isObjectId
      ? await CarrinhoModel.findById(carrinhoId)
      : await CarrinhoModel.findOne({ _id: carrinhoId });

    if (!carrinhoExistente) {
      const novoCarrinho = new CarrinhoModel({
        _id: isObjectId ? new Types.ObjectId(carrinhoId) : carrinhoId,
        produtos: [],
        produtosModelo: "Charuto", // ⬅️ Valor padrão
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
        produtosModelo: "Charuto", // ⬅️ Valor padrão
        total: 0,
      });
      await novoCarrinho.save();
      console.log("Carrinho inicial criado com sucesso!");
    }
  } catch (err) {
    console.error("Erro ao verificar carrinho:", err);
  }
}

export const finalizarPedido = async () => {
  try {
    // Buscar o carrinho atual
    const carrinho = await CarrinhoModel.findById(CARRINHO_ID_FIXO);
    if (!carrinho) {
      throw new Error("Carrinho não encontrado");
    }

    // Verificar se há produtos no carrinho
    if (carrinho.produtos.length === 0) {
      throw new Error("Não é possível finalizar pedido - carrinho vazio");
    }

    const novoPedido = new PedidoModel({
      produtos: carrinho.produtos,
      total: carrinho.total,
      status: "completo" 
    });

    await novoPedido.save();

    carrinho.produtos = [];
    carrinho.total = 0;
    carrinho.produtosModelo = "Charuto";
    await carrinho.save();

    return {
      success: true,
      pedido: novoPedido,
      message: "Pedido finalizado com sucesso!"
    };
  } catch (err) {
    console.error("Erro ao finalizar pedido:", err);
    throw err;
  }
};

export const listarPedidosAnteriores = async () => {
  try {
    const pedidos = await PedidoModel.find().sort({ data: -1 });
    return pedidos;
  } catch (err) {
    console.error("Erro ao listar pedidos:", err);
    return [];
  }
};
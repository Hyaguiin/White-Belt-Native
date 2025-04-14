"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarProdutosDoCarrinho = exports.calcularTotalCarrinho = exports.removerProdutoDoCarrinho = exports.adicionarProdutoAoCarrinho = void 0;
exports.criarCarrinhoInicial = criarCarrinhoInicial;
exports.verificarCarrinhoExistente = verificarCarrinhoExistente;
const mongoose_1 = require("mongoose");
const Carrinho_1 = require("../interfaces/Carrinho");
const Charuto_1 = require("../interfaces/Charuto");
const Cavalo_1 = require("../interfaces/Cavalo");
const Whisky_1 = require("../interfaces/Whisky");
require("dotenv/config");
const CARRINHO_ID_FIXO = process.env.CARRINHO_ID_FIXO;
/**
 * Adiciona um produto ao carrinho.
 * @param produtoId - ID do produto a ser adicionado.
 * @param tipo - Tipo do produto.
 * @returns O carrinho atualizado.
 */
const adicionarProdutoAoCarrinho = async (produtoId, tipo) => {
    try {
        let produto;
        switch (tipo) {
            case "Charuto":
                produto = await Charuto_1.CharutoModel.findById(produtoId);
                break;
            case "Whisky":
                produto = await Whisky_1.WhiskyModel.findById(produtoId);
                break;
            case "Cavalo":
                produto = await Cavalo_1.CavaloModel.findById(produtoId);
                break;
        }
        if (!produto) {
            throw new Error(`${tipo} com ID ${produtoId} não encontrado`);
        }
        let carrinho = await Carrinho_1.CarrinhoModel.findOne();
        if (!carrinho) {
            carrinho = new Carrinho_1.CarrinhoModel({
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
    }
    catch (err) {
        console.error(`Erro ao adicionar ${tipo}:`, err);
        throw err;
    }
};
exports.adicionarProdutoAoCarrinho = adicionarProdutoAoCarrinho;
/**
 * Remove um produto do carrinho.
 * @param produtoId - ID do produto a ser removido.
 * @returns O carrinho atualizado.
 */
const removerProdutoDoCarrinho = async (produtoId) => {
    try {
        console.log("Removendo produto do carrinho..."); // Log para depuração
        console.log("produtoId recebido:", produtoId); // Log para depuração
        // Converter produtoId para ObjectId
        const produtoObjectId = new mongoose_1.Types.ObjectId(produtoId);
        console.log("produtoObjectId convertido:", produtoObjectId); // Log para depuração
        // Buscar o carrinho
        const carrinho = await Carrinho_1.CarrinhoModel.findById(CARRINHO_ID_FIXO);
        if (!carrinho) {
            throw new Error("Carrinho não encontrado");
        }
        // Remover o produto do carrinho
        carrinho.produtos = carrinho.produtos.filter((produto) => !produto.equals(produtoObjectId) // Comparação de ObjectId
        );
        await carrinho.save();
        console.log("Produto removido do carrinho com sucesso!"); // Log para depuração
        return carrinho;
    }
    catch (err) {
        console.error("Erro no serviço removerProdutoDoCarrinho:", err); // Log para depuração
        throw err;
    }
};
exports.removerProdutoDoCarrinho = removerProdutoDoCarrinho;
/**
 * Calcula o total do carrinho.
 * @returns O total do carrinho.
 */
const calcularTotalCarrinho = async () => {
    try {
        console.log("Calculando total do carrinho..."); // Log para depuração
        // Buscar o carrinho e popular os produtos
        const carrinho = await Carrinho_1.CarrinhoModel.findById(CARRINHO_ID_FIXO).populate("produtos");
        if (!carrinho) {
            throw new Error("Carrinho não encontrado");
        }
        // Calcular o total
        const total = carrinho.produtos.reduce((acc, produto) => acc + produto.preco, 0);
        console.log("Total calculado:", total); // Log para depuração
        return total;
    }
    catch (err) {
        console.error("Erro no serviço calcularTotalCarrinho:", err); // Log para depuração
        throw err;
    }
};
exports.calcularTotalCarrinho = calcularTotalCarrinho;
/**
 * Lista os produtos do carrinho.
 * @returns A lista de produtos no carrinho.
 */
const listarProdutosDoCarrinho = async () => {
    try {
        const carrinho = await Carrinho_1.CarrinhoModel.findById(CARRINHO_ID_FIXO).exec();
        if (!carrinho?.produtos?.length)
            return [];
        // Se for misto, busca em todos os modelos
        if (carrinho.produtosModelo === 'Misto') {
            const charutos = await Charuto_1.CharutoModel.find({ _id: { $in: carrinho.produtos } });
            const whiskys = await Whisky_1.WhiskyModel.find({ _id: { $in: carrinho.produtos } });
            const cavalos = await Cavalo_1.CavaloModel.find({ _id: { $in: carrinho.produtos } });
            return [...charutos, ...whiskys, ...cavalos];
        }
        // Se não for misto, busca no modelo específico
        switch (carrinho.produtosModelo) {
            case 'Charuto':
                return await Charuto_1.CharutoModel.find({ _id: { $in: carrinho.produtos } });
            case 'Whisky':
                return await Whisky_1.WhiskyModel.find({ _id: { $in: carrinho.produtos } });
            case 'Cavalo':
                return await Cavalo_1.CavaloModel.find({ _id: { $in: carrinho.produtos } });
            default:
                return [];
        }
    }
    catch (err) {
        console.error("Erro ao listar produtos:", err);
        return [];
    }
};
exports.listarProdutosDoCarrinho = listarProdutosDoCarrinho;
async function criarCarrinhoInicial() {
    try {
        const carrinhoId = process.env.CARRINHO_ID_FIXO || "carrinho-fixo-id";
        const isObjectId = /^[0-9a-fA-F]{24}$/.test(carrinhoId);
        const carrinhoExistente = isObjectId
            ? await Carrinho_1.CarrinhoModel.findById(carrinhoId)
            : await Carrinho_1.CarrinhoModel.findOne({ _id: carrinhoId });
        if (!carrinhoExistente) {
            const novoCarrinho = new Carrinho_1.CarrinhoModel({
                _id: isObjectId ? new mongoose_1.Types.ObjectId(carrinhoId) : carrinhoId,
                produtos: [],
                produtosModelo: "Charuto", // ⬅️ Valor padrão
                total: 0,
            });
            await novoCarrinho.save();
            console.log("Carrinho inicial criado com sucesso!");
        }
    }
    catch (err) {
        console.error("Erro ao criar carrinho inicial:", err);
    }
}
async function verificarCarrinhoExistente() {
    try {
        const carrinho = await Carrinho_1.CarrinhoModel.findById(CARRINHO_ID_FIXO);
        if (!carrinho) {
            const novoCarrinho = new Carrinho_1.CarrinhoModel({
                _id: new mongoose_1.Types.ObjectId(CARRINHO_ID_FIXO),
                produtos: [],
                produtosModelo: "Charuto", // ⬅️ Valor padrão
                total: 0,
            });
            await novoCarrinho.save();
            console.log("Carrinho inicial criado com sucesso!");
        }
    }
    catch (err) {
        console.error("Erro ao verificar carrinho:", err);
    }
}

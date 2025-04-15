"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarPedidosAnterioresController = exports.finalizarPedidoController = exports.listarProdutosDoCarrinhoController = exports.calcularTotalCarrinhoController = exports.removerProdutoDoCarrinhoController = exports.adicionarProdutoAoCarrinhoController = void 0;
const CarrinhoService_1 = require("../services/CarrinhoService");
const adicionarProdutoAoCarrinhoController = async (req, res) => {
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
        const carrinho = await (0, CarrinhoService_1.adicionarProdutoAoCarrinho)(produtoId, tipo);
        res.status(200).json(carrinho);
    }
    catch (err) {
        console.error("Erro no controller:", err);
        res.status(500).json({ message: err instanceof Error ? err.message : "Erro desconhecido" });
    }
};
exports.adicionarProdutoAoCarrinhoController = adicionarProdutoAoCarrinhoController;
const removerProdutoDoCarrinhoController = async (req, res) => {
    try {
        console.log("Corpo da requisição (req.body):", req.body);
        const { produtoId } = req.body;
        if (!produtoId) {
            console.log("Erro de validação: produtoId faltando");
            res.status(400).json({ message: "produtoId é obrigatório" });
            return;
        }
        console.log("Chamando serviço removerProdutoDoCarrinho...");
        const carrinho = await (0, CarrinhoService_1.removerProdutoDoCarrinho)(produtoId);
        res.status(200).json(carrinho);
    }
    catch (err) {
        console.error("Erro no controller:", err);
        res.status(500).json({ message: err instanceof Error ? err.message : "Erro desconhecido" });
    }
};
exports.removerProdutoDoCarrinhoController = removerProdutoDoCarrinhoController;
const calcularTotalCarrinhoController = async (req, res) => {
    try {
        console.log("Chamando serviço calcularTotalCarrinho...");
        const total = await (0, CarrinhoService_1.calcularTotalCarrinho)();
        res.status(200).json({ total });
    }
    catch (err) {
        console.error("Erro no controller:", err);
        res.status(500).json({ message: err instanceof Error ? err.message : "Erro desconhecido" });
    }
};
exports.calcularTotalCarrinhoController = calcularTotalCarrinhoController;
const listarProdutosDoCarrinhoController = async (req, res) => {
    try {
        console.log("Chamando serviço listarProdutosDoCarrinho...");
        const produtos = await (0, CarrinhoService_1.listarProdutosDoCarrinho)();
        res.status(200).json(produtos);
    }
    catch (err) {
        console.error("Erro no controller:", err);
        res.status(500).json({ message: err instanceof Error ? err.message : "Erro desconhecido" });
    }
};
exports.listarProdutosDoCarrinhoController = listarProdutosDoCarrinhoController;
const finalizarPedidoController = async (req, res) => {
    try {
        console.log("Finalizando pedido...");
        const resultado = await (0, CarrinhoService_1.finalizarPedido)();
        res.status(200).json({
            success: true,
            pedido: resultado.pedido,
            message: "Pedido finalizado com sucesso!"
        });
    }
    catch (err) {
        console.error("Erro no controller finalizarPedido:", err);
        res.status(500).json({
            success: false,
            message: err instanceof Error ? err.message : "Erro ao finalizar pedido"
        });
    }
};
exports.finalizarPedidoController = finalizarPedidoController;
const listarPedidosAnterioresController = async (req, res) => {
    try {
        console.log("Listando pedidos anteriores...");
        const pedidos = await (0, CarrinhoService_1.listarPedidosAnteriores)();
        res.status(200).json(pedidos);
    }
    catch (err) {
        console.error("Erro no controller listarPedidosAnteriores:", err);
        res.status(500).json({
            success: false,
            message: "Erro ao listar pedidos anteriores"
        });
    }
};
exports.listarPedidosAnterioresController = listarPedidosAnterioresController;

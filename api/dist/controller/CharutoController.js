"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCharutoByIdController = exports.deleteCharutoByIdController = exports.getCharutoByIdController = exports.getAllCharutosController = exports.createCharutoController = void 0;
const CharutoService_1 = require("../services/CharutoService");
const createCharutoController = async (req, res) => {
    try {
        const charuto = await (0, CharutoService_1.createCharuto)(req.body);
        res.status(201).json(charuto);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.createCharutoController = createCharutoController;
const getAllCharutosController = async (req, res) => {
    try {
        const charutos = await (0, CharutoService_1.getAllCharutos)();
        res.status(200).json(charutos);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getAllCharutosController = getAllCharutosController;
const getCharutoByIdController = async (req, res) => {
    try {
        const charuto = await (0, CharutoService_1.getCharutoById)(req.params.id);
        if (charuto) {
            res.status(200).json(charuto);
        }
        else {
            res.status(404).json({ message: "Charuto não encontrado" });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getCharutoByIdController = getCharutoByIdController;
const deleteCharutoByIdController = async (req, res) => {
    try {
        const charuto = await (0, CharutoService_1.deleteCharutoById)(req.params.id);
        if (charuto) {
            res.status(200).json(charuto);
        }
        else {
            res.status(404).json({ message: "Charuto não encontrado" });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.deleteCharutoByIdController = deleteCharutoByIdController;
const updateCharutoByIdController = async (req, res) => {
    try {
        const charuto = await (0, CharutoService_1.updateCharutoById)(req.params.id, req.body);
        if (charuto) {
            res.status(200).json(charuto);
        }
        else {
            res.status(404).json({ message: "Charuto não encontrado" });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.updateCharutoByIdController = updateCharutoByIdController;

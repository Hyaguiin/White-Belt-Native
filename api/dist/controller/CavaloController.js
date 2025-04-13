"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCavaloByIdController = exports.deleteCavaloByIdController = exports.getCavaloByIdController = exports.getAllCavalosController = exports.createCavaloController = void 0;
const CavaloService_1 = require("../services/CavaloService");
const createCavaloController = async (req, res) => {
    try {
        const cavalo = await (0, CavaloService_1.createCavalo)(req.body);
        res.status(201).json(cavalo);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.createCavaloController = createCavaloController;
const getAllCavalosController = async (req, res) => {
    try {
        const cavalos = await (0, CavaloService_1.getAllCavalos)();
        res.status(200).json(cavalos);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getAllCavalosController = getAllCavalosController;
const getCavaloByIdController = async (req, res) => {
    try {
        const cavalo = await (0, CavaloService_1.getCavalosById)(req.params.id);
        if (cavalo) {
            res.status(200).json(cavalo);
        }
        else {
            res.status(404).json({ message: "Cavalo não encontrado" });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getCavaloByIdController = getCavaloByIdController;
const deleteCavaloByIdController = async (req, res) => {
    try {
        const cavalo = await (0, CavaloService_1.deleteCavaloById)(req.params.id);
        if (cavalo) {
            res.status(200).json(cavalo);
        }
        else {
            res.status(404).json({ message: "Cavalo não encontrado" });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.deleteCavaloByIdController = deleteCavaloByIdController;
const updateCavaloByIdController = async (req, res) => {
    try {
        const cavalo = await (0, CavaloService_1.updateCavaloById)(req.params.id, req.body);
        if (cavalo) {
            res.status(200).json(cavalo);
        }
        else {
            res.status(404).json({ message: "Cavalo não encontrado" });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.updateCavaloByIdController = updateCavaloByIdController;
